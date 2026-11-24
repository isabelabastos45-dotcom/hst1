import { instrucoesChat, instrucoesRiscos } from "../../server/prompts.mjs";

const MODEL = "@cf/zai-org/glm-4.7-flash";
const MAX_BODY_CHARS = 20_000;
const MAX_MESSAGE_CHARS = 4_200;
const WINDOW_MS = 15 * 60 * 1_000;
const REQUESTS_PER_WINDOW = 12;

// Limite simples de melhor esforço para uma demonstração pública.
// Para uso profissional/produção, substitua por proteção persistente.
const acessos = new Map();

function jsonError(message, status) {
  return Response.json({ error: message }, { status });
}

function dentroDoLimite(request) {
  const agora = Date.now();
  const ip = request.headers.get("CF-Connecting-IP") || "desconhecido";
  const anterior = acessos.get(ip);
  const atual = !anterior || agora >= anterior.ate
    ? { quantidade: 0, ate: agora + WINDOW_MS }
    : anterior;

  atual.quantidade += 1;
  acessos.set(ip, atual);

  if (acessos.size > 5_000) {
    for (const [chave, valor] of acessos) {
      if (agora >= valor.ate) acessos.delete(chave);
    }
  }

  return atual.quantidade <= REQUESTS_PER_WINDOW;
}

function extrairResposta(resultado) {
  if (typeof resultado?.response === "string") return resultado.response.trim();
  const conteudo = resultado?.choices?.[0]?.message?.content;
  if (typeof conteudo === "string") return conteudo.trim();
  return "";
}

export async function onRequestPost({ request, env }) {
  if (!env || !env.AI) {
    return jsonError(
      "A IA ainda não foi conectada. Configure o vínculo Workers AI com o nome AI no painel da Cloudflare.",
      503,
    );
  }

  if (!dentroDoLimite(request)) {
    return jsonError("Muitas consultas em pouco tempo. Aguarde alguns minutos e tente novamente.", 429);
  }

  let body;
  try {
    const texto = await request.text();
    if (texto.length > MAX_BODY_CHARS) {
      return jsonError("A solicitação ficou muito grande. Reduza o texto e tente novamente.", 413);
    }
    body = JSON.parse(texto);
  } catch {
    return jsonError("Não foi possível ler a mensagem enviada.", 400);
  }

  const { mode, message, history } = body || {};
  if (mode !== "chat" && mode !== "riscos") {
    return jsonError("Modo inválido.", 400);
  }
  if (typeof message !== "string" || !message.trim() || message.length > MAX_MESSAGE_CHARS) {
    return jsonError("Escreva uma mensagem de até 4.200 caracteres.", 400);
  }

  const historicoSeguro = mode === "chat" && Array.isArray(history)
    ? history.slice(-8)
        .filter((item) =>
          item && ["user", "assistant"].includes(item.role) &&
          typeof item.content === "string" && item.content.length <= 2_000
        )
        .map((item) => ({ role: item.role, content: item.content }))
    : [];

  const mensagens = [
    { role: "system", content: mode === "chat" ? instrucoesChat : instrucoesRiscos },
    ...historicoSeguro,
    { role: "user", content: message.trim() },
  ];

  try {
    const resultado = await env.AI.run(MODEL, {
      messages: mensagens,
      max_tokens: mode === "chat" ? 700 : 1_500,
      temperature: 0.25,
    });

    const answer = extrairResposta(resultado);
    if (!answer) {
      return jsonError("A IA não retornou texto. Tente novamente.", 502);
    }

    return Response.json({ answer });
  } catch (erro) {
    const detalhe = String(erro?.message || erro || "");
    console.error("Erro no Workers AI:", detalhe.slice(0, 500));

    if (/429|quota|neuron|daily limit|rate limit/i.test(detalhe)) {
      return jsonError(
        "O limite gratuito diário da IA pode ter sido atingido. Tente novamente amanhã.",
        429,
      );
    }
    if (/403|5035|paid plan|billing/i.test(detalhe)) {
      return jsonError(
        "O modelo não está disponível no plano gratuito desta conta. Confira se o modelo configurado é @cf/zai-org/glm-4.7-flash e se o Workers AI está habilitado.",
        503,
      );
    }
    return jsonError("Não foi possível consultar a IA agora. Tente novamente em instantes.", 502);
  }
}
