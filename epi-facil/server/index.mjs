import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { instrucoesChat, instrucoesRiscos } from "./prompts.mjs";

const app = express();
const port = Number(process.env.PORT || 3001);
const modelo = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const chave = process.env.GEMINI_API_KEY?.trim();
const api = chave && !chave.includes("cole_sua_chave")
  ? new GoogleGenAI({ apiKey: chave })
  : null;

const origensPadrao = ["localhost", "127.0.0.1"].flatMap((host) =>
  [5173, 5174, 5175, 5176, 5177, 5178].map((vitePort) => `http://${host}:${vitePort}`)
);
const origensPermitidas = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
  : origensPadrao;

app.use(cors({
  origin(origin, callback) {
    if (!origin || origensPermitidas.includes(origin)) return callback(null, true);
    return callback(new Error("Origem não permitida pelo servidor"));
  },
}));
app.use(express.json({ limit: "20kb" }));

// Limite simples por IP para a demonstração. Não é proteção suficiente para produção.
const acessos = new Map();
const JANELA_MS = 15 * 60 * 1000;
const LIMITE = 20;
function limiteDeSolicitacoes(req, res, next) {
  const agora = Date.now();
  const ip = req.ip || req.socket.remoteAddress || "desconhecido";
  const registro = acessos.get(ip);
  const atual = !registro || agora >= registro.ate
    ? { quantidade: 0, ate: agora + JANELA_MS }
    : registro;
  atual.quantidade++;
  acessos.set(ip, atual);
  if (acessos.size > 5000) {
    for (const [chaveIp, valor] of acessos) {
      if (agora >= valor.ate) acessos.delete(chaveIp);
    }
  }
  if (atual.quantidade > LIMITE) {
    return res.status(429).json({ error: "Muitas consultas. Aguarde alguns minutos e tente novamente." });
  }
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, configured: Boolean(api), model: modelo });
});

app.post("/api/assist", limiteDeSolicitacoes, async (req, res) => {
  const { mode, message, history } = req.body || {};

  if (mode !== "chat" && mode !== "riscos") {
    return res.status(400).json({ error: "Modo inválido." });
  }
  if (typeof message !== "string" || !message.trim() || message.length > 4200) {
    return res.status(400).json({ error: "Escreva uma mensagem de até 4.200 caracteres." });
  }
  if (!api) {
    return res.status(503).json({ error: "O servidor está ativo, mas falta configurar GEMINI_API_KEY no arquivo .env." });
  }

  // O componente React já envia o histórico como user/assistant.
  // O Gemini usa user/model, por isso convertemos os papéis aqui.
  const historicoSeguro = mode === "chat" && Array.isArray(history)
    ? history.slice(-8)
      .filter((item) =>
        item && ["user", "assistant"].includes(item.role) &&
        typeof item.content === "string" && item.content.length <= 2000
      )
      .map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content }],
      }))
    : [];

  const conteudos = [
    ...historicoSeguro,
    { role: "user", parts: [{ text: message.trim() }] },
  ];

  try {
    const resposta = await api.models.generateContent({
      model: modelo,
      contents: conteudos,
      config: {
        systemInstruction: mode === "chat" ? instrucoesChat : instrucoesRiscos,
        maxOutputTokens: mode === "chat" ? 700 : 1500,
        temperature: 0.3,
      },
    });

    const texto = resposta.text?.trim();
    if (!texto) {
      return res.status(502).json({ error: "A IA não retornou texto. Tente novamente." });
    }
    return res.json({ answer: texto });
  } catch (err) {
    // Não envie detalhes técnicos ou a chave para o navegador.
    const status = Number(err.status || err.response?.status || 0);
    console.error("Erro na API Gemini:", {
      status,
      message: err.message,
    });

    if (status === 400 || status === 404) {
      return res.status(502).json({ error: "O modelo configurado não está disponível. Confira GEMINI_MODEL no arquivo .env." });
    }
    if (status === 401 || status === 403) {
      return res.status(502).json({ error: "A chave Gemini não foi aceita. Confira GEMINI_API_KEY e o projeto associado no Google AI Studio." });
    }
    if (status === 429) {
      return res.status(429).json({ error: "O limite gratuito de consultas foi atingido. Aguarde a renovação do limite e tente novamente." });
    }
    return res.status(502).json({ error: "Não foi possível consultar o Gemini agora. Confira o terminal do servidor e tente novamente." });
  }
});

app.use((err, _req, res, _next) => {
  if (err.type === "entity.too.large") return res.status(413).json({ error: "Mensagem muito grande." });
  if (err instanceof SyntaxError && "body" in err) return res.status(400).json({ error: "JSON inválido." });
  return res.status(400).json({ error: "Requisição não permitida." });
});

app.listen(port, () => {
  console.log(`\nEPI Assist API iniciada em http://localhost:${port}`);
  console.log(api
    ? `Chave Gemini configurada; modelo: ${modelo}`
    : "ATENÇÃO: configure GEMINI_API_KEY no arquivo .env");
});
