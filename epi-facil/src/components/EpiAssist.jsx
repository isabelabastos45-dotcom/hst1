import React, { useEffect, useState } from "react";
import { Bot, ShieldCheck, MessageCircle, SearchCheck, Send, RotateCcw, AlertTriangle, BookOpen, HardHat, Loader2, WifiOff, CheckCircle2, Info } from "lucide-react";
import "./EpiAssist.css";

// Endereço do backend. A chave de API nunca fica aqui no React.
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const perguntasRapidas = [
  "Quando devo substituir um capacete de segurança?",
  "O que é o Certificado de Aprovação (CA) de um EPI?",
  "Qual é a diferença entre EPC e EPI?",
];

export default function EpiAssist({ onNavigate }) {
  const [modo, setModo] = useState("chat");
  const [pergunta, setPergunta] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [atividade, setAtividade] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [controles, setControles] = useState("");
  const [analise, setAnalise] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState("verificando");

  useEffect(() => {
    let ativo = true;
    fetch(`${API_BASE}/api/health`)
      .then((res) => { if (!res.ok) throw new Error("Servidor indisponível"); return res.json(); })
      .then((dados) => { if (ativo) setStatus(dados.configured ? "pronto" : "sem-chave"); })
      .catch(() => { if (ativo) setStatus("offline"); });
    return () => { ativo = false; };
  }, []);

  async function consultar(modoSolicitado, texto, historico = []) {
    const respostaHttp = await fetch(`${API_BASE}/api/assist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: modoSolicitado, message: texto, history: historico }),
    });
    let dados;
    try { dados = await respostaHttp.json(); }
    catch { throw new Error("Não foi possível interpretar a resposta do servidor."); }
    if (!respostaHttp.ok) throw new Error(dados.error || "Não foi possível consultar a IA.");
    if (typeof dados.answer !== "string") throw new Error("Resposta inesperada da IA.");
    return dados.answer;
  }

  async function enviarPergunta(event) {
    event?.preventDefault();
    const texto = pergunta.trim();
    if (carregando || !texto) return;
    const historico = mensagens.slice(-8);
    setPergunta("");
    setErro("");
    setMensagens((atual) => [...atual, { role: "user", content: texto }]);
    setCarregando(true);
    try {
      const resposta = await consultar("chat", texto, historico);
      setMensagens((atual) => [...atual, { role: "assistant", content: resposta }]);
    } catch (e) {
      setErro(e.message || "Falha ao conectar ao servidor.");
    } finally { setCarregando(false); }
  }

  async function analisarRiscos(event) {
    event.preventDefault();
    if (carregando || !atividade.trim()) return;
    const descricao = [
      `Atividade: ${atividade.trim()}`,
      `Ambiente e condições: ${ambiente.trim() || "não informado"}`,
      `Proteções e controles já existentes: ${controles.trim() || "não informado"}`,
    ].join("\n");
    setErro(""); setAnalise(""); setCarregando(true);
    try { setAnalise(await consultar("riscos", descricao)); }
    catch (e) { setErro(e.message || "Falha ao analisar os riscos."); }
    finally { setCarregando(false); }
  }

  function trocarModo(proximo) { setModo(proximo); setErro(""); }

  return (
    <section className="epi-ai-page">
      <div className="epi-ai-heading">
        <span className="epi-ai-kicker"><ShieldCheck size={16} /> RECURSO EDUCATIVO COM IA</span>
        <h1>EPI <span>Assist</span></h1>
        <p>Tire dúvidas sobre proteção individual ou descreva uma atividade para identificar possíveis perigos e medidas preventivas a avaliar.</p>
      </div>

      <div className="epi-ai-panel">
        <div className="epi-ai-panel-header">
          <div className="epi-ai-bot"><Bot size={25} /></div>
          <div className="epi-ai-panel-title"><strong>Assistente de segurança do trabalho</strong><small>Informação educativa — não substitui avaliação técnica</small></div>
          <div className={`epi-ai-status epi-ai-${status}`}>
            {status === "pronto" ? <><CheckCircle2 size={13} /> Servidor pronto</> :
             status === "sem-chave" ? <><AlertTriangle size={13} /> Configurar chave</> :
             status === "offline" ? <><WifiOff size={13} /> Servidor desligado</> : "Verificando..."}
          </div>
        </div>
        <div className="epi-ai-tabs" role="tablist" aria-label="Funcionalidades da IA">
          <button role="tab" aria-selected={modo === "chat"} className={modo === "chat" ? "active" : ""} onClick={() => trocarModo("chat")}><MessageCircle size={18} /> Chat com IA</button>
          <button role="tab" aria-selected={modo === "riscos"} className={modo === "riscos" ? "active" : ""} onClick={() => trocarModo("riscos")}><SearchCheck size={18} /> Analisador de riscos</button>
        </div>

        {modo === "chat" ? <div className="epi-ai-content">
          <div className="epi-ai-actions">
            <h2>Converse com o EPI Assist</h2>
            <button className="epi-ai-clear" type="button" onClick={() => { setMensagens([]); setErro(""); }}><RotateCcw size={15} /> Limpar conversa</button>
          </div>
          {mensagens.length === 0 ? <div className="epi-ai-intro">
            <div className="epi-ai-bigicon">💬</div>
            <strong>O que você gostaria de aprender?</strong>
            <p>Escolha uma pergunta ou escreva a sua dúvida abaixo.</p>
            <div className="epi-ai-suggestions">{perguntasRapidas.map((texto) => <button key={texto} type="button" onClick={() => setPergunta(texto)}>{texto}</button>)}</div>
          </div> : <div className="epi-ai-history" role="log" aria-live="polite">
            {mensagens.map((m, i) => <div key={i} className={`epi-ai-message ${m.role === "user" ? "from-user" : "from-bot"}`}><div className="epi-ai-bubble">{m.content}</div></div>)}
          </div>}
          {carregando && <div className="epi-ai-thinking"><Loader2 className="epi-ai-spin" size={16} /> Elaborando uma resposta...</div>}
          {erro && <p className="epi-ai-error" role="alert">{erro}</p>}
          <form className="epi-ai-chat-form" onSubmit={enviarPergunta}>
            <label htmlFor="epi-ai-question">Sua pergunta</label>
            <textarea id="epi-ai-question" rows="3" maxLength="2000" required value={pergunta} onChange={(e) => setPergunta(e.target.value)} placeholder="Ex.: Qual EPI ajuda a proteger os olhos contra partículas?" />
            <button type="submit" className="epi-ai-submit" disabled={carregando || !pergunta.trim()}>{carregando ? <Loader2 className="epi-ai-spin" size={17} /> : <Send size={17} />} Enviar pergunta</button>
          </form>
        </div> : <div className="epi-ai-content">
          <h2>Análise educativa de riscos</h2>
          <p className="epi-ai-lead">Informe a atividade e o ambiente. A IA levantará riscos possíveis, dúvidas importantes e formas de prevenção a serem avaliadas por responsáveis técnicos.</p>
          <form className="epi-ai-risk-form" onSubmit={analisarRiscos}>
            <label htmlFor="epi-ai-activity">Qual atividade será realizada? <b>*</b></label>
            <textarea id="epi-ai-activity" rows="3" maxLength="2000" value={atividade} onChange={(e) => setAtividade(e.target.value)} required placeholder="Ex.: Cortar peças metálicas com uma esmerilhadeira." />
            <label htmlFor="epi-ai-environment">Como é o ambiente? (opcional)</label>
            <textarea id="epi-ai-environment" rows="2" maxLength="1000" value={ambiente} onChange={(e) => setAmbiente(e.target.value)} placeholder="Ex.: Oficina fechada, outras pessoas próximas, presença de poeira." />
            <label htmlFor="epi-ai-controls">Quais medidas de proteção já existem? (opcional)</label>
            <textarea id="epi-ai-controls" rows="2" maxLength="1000" value={controles} onChange={(e) => setControles(e.target.value)} placeholder="Ex.: Coifa de exaustão, proteção de máquina, sinalização, EPIs." />
            <button className="epi-ai-submit" disabled={carregando || !atividade.trim()} type="submit">{carregando ? <Loader2 className="epi-ai-spin" size={17} /> : <SearchCheck size={18}/>} {carregando ? "Analisando..." : "Analisar possíveis riscos"}</button>
          </form>
          {erro && <p className="epi-ai-error" role="alert">{erro}</p>}
          {analise && <article className="epi-ai-report"><h3><ShieldCheck size={20}/> Resultado preliminar</h3><div>{analise}</div><p>Este relatório é uma orientação educativa, não um laudo, PGR ou autorização para executar a atividade.</p></article>}
        </div>}

        <div className="epi-ai-disclaimer"><Info size={18} /><p>A IA pode errar ou deixar riscos de fora. A escolha dos EPIs requer avaliação real de riscos, medidas coletivas prioritárias, orientações do fabricante e profissionais de SST.</p></div>
        <div className="epi-ai-shortcuts">
          <button onClick={() => onNavigate?.("catalogo")}><HardHat size={17}/> Abrir catálogo de EPIs</button>
          <button onClick={() => onNavigate?.("tutoriais")}><BookOpen size={17}/> Consultar tutoriais</button>
        </div>
      </div>
    </section>
  );
}
