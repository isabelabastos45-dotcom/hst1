import EpiAssist from "./components/EpiAssist.jsx";
import { Bot } from "lucide-react";
import React from "react";

import { useMemo, useState } from "react";
import {
  ShieldCheck, Menu, X, Search, BookOpen, HardHat, BriefcaseBusiness,
  Brain, Scale, Home, ChevronRight, ArrowLeft, CheckCircle2, AlertTriangle,
  GraduationCap, Sparkles, ExternalLink, Info, RotateCcw
} from "lucide-react";
import { epis, categorias, profissoes } from "./data/epis";
import { perguntas } from "./data/quiz";

const navItems = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "catalogo", label: "Catálogo de EPIs", icon: HardHat },
  { id: "tutoriais", label: "Tutoriais", icon: BookOpen },
  { id: "profissoes", label: "Por profissão", icon: BriefcaseBusiness },
  { id: "quiz", label: "Quiz", icon: Brain },
  { id: "normas", label: "Normas e segurança", icon: Scale }
,
  { id: "assistente-ia", label: "Assistente IA", icon: Bot },
];

function Header({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => setPage("inicio")} aria-label="Ir para o início">
        <span className="brand-mark"><ShieldCheck size={25} /></span>
        <span><strong>EPI FÁCIL</strong><small>Conhecimento que protege.</small></span>
      </button>
      <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">
        {mobileOpen ? <X /> : <Menu />}
      </button>
      <nav className={mobileOpen ? "nav open" : "nav"}>
        {navItems.map((item) => (
          <button key={item.id} className={page === item.id ? "nav-link active" : "nav-link"}
            onClick={() => { setPage(item.id); setMobileOpen(false); }}>
            {item.label}
          </button>
        ))}
      </nav>
      <button className="header-cta" onClick={() => setPage("quiz")}>Testar conhecimentos <ChevronRight size={16} /></button>
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-brand"><span className="brand-mark"><ShieldCheck size={22} /></span><strong>EPI FÁCIL</strong></div>
      <p>Informação para aprender, prevenir e trabalhar com mais segurança.</p>
      <div className="footer-links">
        <button onClick={() => setPage("catalogo")}>Catálogo</button>
        <button onClick={() => setPage("tutoriais")}>Tutoriais</button>
        <button onClick={() => setPage("normas")}>Normas</button>
      </div>
      <small>Projeto educativo demonstrativo • Consulte sempre as orientações oficiais e profissionais responsáveis.</small>
    </footer>
  );
}

function EpiCard({ epi, onClick }) {
  return (
    <button className="epi-card" onClick={onClick}>
      <span className="epi-emoji">{epi.icone}</span>
      <span className="tag">{epi.categoria}</span>
      <strong>{epi.nome}</strong>
      <span className="card-description">{epi.resumo}</span>
      <span className="card-more">Ver detalhes <ChevronRight size={16} /></span>
    </button>
  );
}

function HomePage({ setPage, setSelectedEpi }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15} /> APRENDA. PREVINA. PROTEJA.</span>
          <h1>Segurança começa com <em>conhecimento.</em></h1>
          <p>Descubra como os Equipamentos de Proteção Individual ajudam a prevenir riscos e aprenda a escolher, utilizar e conservar cada equipamento.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setPage("catalogo")}>Explorar os EPIs <ChevronRight size={18} /></button>
            <button className="btn-secondary" onClick={() => setPage("tutoriais")}>Ver tutoriais</button>
          </div>
          <div className="hero-note"><ShieldCheck size={17} /> Conteúdo educativo sobre prevenção no trabalho</div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div>
          <div className="hero-icon">🦺</div>
          <div className="floating-card float-top"><span>✓</span><div><strong>Prevenção</strong><small>Conhecer os riscos</small></div></div>
          <div className="floating-card float-bottom"><span>✦</span><div><strong>Proteção</strong><small>Escolher corretamente</small></div></div>
          <div className="hero-sticker">TRABALHO<br/>SEGURO</div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><span className="eyebrow">EXPLORE A PLATAFORMA</span><h2>Aprenda de um jeito simples</h2></div>
          <p>Conteúdo direto e organizado para você entender a função de cada equipamento.</p>
        </div>
        <div className="feature-grid">
          <button className="feature-card" onClick={() => setPage("catalogo")}><span className="feature-icon blue"><HardHat /></span><h3>Catálogo de EPIs</h3><p>Conheça os equipamentos, suas funções e os riscos que ajudam a prevenir.</p><span>Explorar catálogo <ChevronRight size={16}/></span></button>
          <button className="feature-card" onClick={() => setPage("tutoriais")}><span className="feature-icon yellow"><BookOpen /></span><h3>Tutoriais práticos</h3><p>Veja etapas de inspeção, colocação, uso e conservação dos equipamentos.</p><span>Aprender passo a passo <ChevronRight size={16}/></span></button>
          <button className="feature-card" onClick={() => setPage("profissoes")}><span className="feature-icon green"><BriefcaseBusiness /></span><h3>Por profissão</h3><p>Entenda como os riscos mudam de acordo com cada atividade profissional.</p><span>Ver profissões <ChevronRight size={16}/></span></button>
          <button className="feature-card" onClick={() => setPage("quiz")}><span className="feature-icon purple"><Brain /></span><h3>Teste seus conhecimentos</h3><p>Responda perguntas e confira o que aprendeu sobre segurança.</p><span>Fazer o quiz <ChevronRight size={16}/></span></button>
        </div>
      </section>

      <section className="section soft-section">
        <div className="section-heading">
          <div><span className="eyebrow">COMECE POR AQUI</span><h2>EPIs em destaque</h2></div>
          <button className="text-button" onClick={() => setPage("catalogo")}>Ver todos <ChevronRight size={16}/></button>
        </div>
        <div className="epi-grid">
          {epis.slice(0, 4).map(epi => <EpiCard key={epi.id} epi={epi} onClick={() => { setSelectedEpi(epi); setPage("detalhe"); }} />)}
        </div>
      </section>

      <section className="callout">
        <div className="callout-icon"><GraduationCap size={30}/></div>
        <div><span className="eyebrow">APRENDER TAMBÉM É PREVENIR</span><h2>Você sabe identificar um risco?</h2><p>Faça um quiz rápido e descubra quanto você já conhece sobre proteção individual.</p></div>
        <button className="btn-light" onClick={() => setPage("quiz")}>Começar quiz <ChevronRight size={17}/></button>
      </section>
    </>
  );
}

function CatalogPage({ setSelectedEpi, setPage }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const filtered = useMemo(() => epis.filter(epi =>
    (category === "Todas" || epi.categoria === category) &&
    `${epi.nome} ${epi.categoria} ${epi.resumo}`.toLowerCase().includes(search.toLowerCase())
  ), [search, category]);

  return (
    <section className="page-section">
      <div className="page-intro"><span className="eyebrow">BIBLIOTECA DE PROTEÇÃO</span><h1>Catálogo de EPIs</h1><p>Explore os equipamentos, entenda suas finalidades e conheça os cuidados básicos.</p></div>
      <div className="catalog-tools">
        <label className="search-box"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar equipamento..." /></label>
        <div className="filter-row">{categorias.map(cat => <button key={cat} className={category === cat ? "filter-chip selected" : "filter-chip"} onClick={() => setCategory(cat)}>{cat}</button>)}</div>
      </div>
      <p className="result-count">{filtered.length} equipamento(s) encontrado(s)</p>
      {filtered.length ? <div className="epi-grid">{filtered.map(epi => <EpiCard key={epi.id} epi={epi} onClick={() => { setSelectedEpi(epi); setPage("detalhe"); }} />)}</div> : <div className="empty-state"><Search size={30}/><h3>Nenhum EPI encontrado</h3><p>Tente outro termo ou categoria.</p></div>}
    </section>
  );
}

function DetailPage({ epi, setPage }) {
  if (!epi) return <section className="page-section"><button className="back-button" onClick={() => setPage("catalogo")}><ArrowLeft size={16}/> Voltar ao catálogo</button><h1>Selecione um EPI no catálogo.</h1></section>;
  return (
    <section className="page-section">
      <button className="back-button" onClick={() => setPage("catalogo")}><ArrowLeft size={16}/> Voltar ao catálogo</button>
      <div className="detail-hero">
        <div className="detail-emoji">{epi.icone}</div>
        <div><span className="tag">{epi.categoria}</span><h1>{epi.nome}</h1><p>{epi.resumo}</p></div>
      </div>
      <div className="detail-grid">
        <article className="content-card"><h2>Quais riscos ajuda a prevenir?</h2><ul className="check-list">{epi.riscos.map(r => <li key={r}><CheckCircle2 size={18}/>{r}</li>)}</ul></article>
        <article className="content-card"><h2>Onde pode ser utilizado?</h2><p>{epi.uso}</p></article>
        <article className="content-card"><h2>Cuidados importantes</h2><ul>{epi.cuidados.map(c => <li key={c}>{c}</li>)}</ul></article>
        <article className="content-card warning-card"><h2><AlertTriangle size={19}/> Atenção</h2><p>{epi.alerta}</p></article>
      </div>
      <button className="btn-primary detail-cta" onClick={() => setPage("tutoriais")}>Ver tutoriais de utilização <ChevronRight size={17}/></button>
    </section>
  );
}

function TutorialsPage({ setSelectedEpi, setPage }) {
  const [selected, setSelected] = useState(epis[0].id);
  const epi = epis.find(item => item.id === selected);
  return (
    <section className="page-section">
      <div className="page-intro"><span className="eyebrow">APRENDA PASSO A PASSO</span><h1>Tutoriais de EPIs</h1><p>Consulte orientações educativas de inspeção, ajuste, utilização e conservação.</p></div>
      <div className="tutorial-layout">
        <aside className="tutorial-menu"><h3>Escolha um equipamento</h3>{epis.map(item => <button key={item.id} className={selected === item.id ? "tutorial-choice active" : "tutorial-choice"} onClick={() => setSelected(item.id)}><span>{item.icone}</span>{item.nome}<ChevronRight size={15}/></button>)}</aside>
        <article className="tutorial-content">
          <div className="tutorial-title"><span className="detail-emoji small">{epi.icone}</span><div><span className="tag">{epi.categoria}</span><h2>{epi.nome}</h2></div></div>
          <p className="tutorial-lead">{epi.resumo}</p>
          <div className="steps">{epi.passos.map((step, index) => <div className="step" key={step}><span className="step-number">{index + 1}</span><div><h3>{["Identifique o risco", "Inspecione o equipamento", "Ajuste corretamente", "Utilize conforme a orientação", "Cuide e armazene"][index] || "Siga as orientações"}</h3><p>{step}</p></div></div>)}</div>
          <div className="notice"><Info size={20}/><p><strong>Importante:</strong> {epi.alerta} Este tutorial não substitui treinamento, procedimentos internos ou instruções do fabricante.</p></div>
          <button className="text-button" onClick={() => { setSelectedEpi(epi); setPage("detalhe"); }}>Ver ficha completa deste EPI <ChevronRight size={16}/></button>
        </article>
      </div>
    </section>
  );
}

function ProfessionsPage() {
  const [active, setActive] = useState(0);
  const profession = profissoes[active];
  return (
    <section className="page-section">
      <div className="page-intro"><span className="eyebrow">PROTEÇÃO POR ATIVIDADE</span><h1>EPIs por profissão</h1><p>Os equipamentos dependem dos perigos e riscos presentes em cada atividade. Veja exemplos educativos.</p></div>
      <div className="profession-layout">
        <div className="profession-list">{profissoes.map((p, i) => <button key={p.nome} className={active === i ? "profession-option active" : "profession-option"} onClick={() => setActive(i)}><span>{p.emoji}</span><strong>{p.nome}</strong><ChevronRight size={17}/></button>)}</div>
        <article className="profession-detail"><div className="profession-emoji">{profession.emoji}</div><span className="eyebrow">AMBIENTE PROFISSIONAL</span><h2>{profession.nome}</h2><p>{profession.descricao}</p><h3>Equipamentos que podem ser necessários</h3><ul className="check-list">{profession.equipamentos.map(item => <li key={item}><CheckCircle2 size={18}/>{item}</li>)}</ul><div className="notice"><Info size={20}/><p>{profession.observacao}</p></div></article>
      </div>
    </section>
  );
}

function QuizPage() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const current = perguntas[index];

  function submit() {
    if (answer === null || feedback) return;
    if (answer === current.correta) setScore(s => s + 1);
    setFeedback(true);
  }
  function nextQuestion() {
    if (index + 1 === perguntas.length) setFinished(true);
    else { setIndex(i => i + 1); setAnswer(null); setFeedback(false); }
  }
  function restart() { setIndex(0); setAnswer(null); setScore(0); setFeedback(false); setFinished(false); }

  if (finished) {
    const finalScore = score;
    return <section className="page-section quiz-wrap"><div className="quiz-card result-card"><span className="result-emoji">{finalScore >= 4 ? "🏆" : "📘"}</span><span className="eyebrow">QUIZ CONCLUÍDO</span><h1>{finalScore >= 4 ? "Muito bem!" : "Continue aprendendo!"}</h1><p>Você acertou <strong>{finalScore} de {perguntas.length}</strong> perguntas.</p><div className="score-ring">{Math.round(finalScore / perguntas.length * 100)}<small>%</small></div><button className="btn-primary" onClick={restart}><RotateCcw size={17}/> Refazer quiz</button></div></section>;
  }

  return (
    <section className="page-section quiz-wrap">
      <div className="page-intro center"><span className="eyebrow">APRENDA TESTANDO</span><h1>Quiz de segurança</h1><p>Responda às perguntas e confira seus conhecimentos sobre EPIs.</p></div>
      <div className="quiz-card">
        <div className="quiz-progress-row"><span>PERGUNTA {index + 1} DE {perguntas.length}</span><span>{score} acerto(s)</span></div>
        <div className="progress-track"><span style={{ width: `${((index + 1) / perguntas.length) * 100}%` }} /></div>
        <h2>{current.pergunta}</h2>
        <div className="answer-list">{current.opcoes.map((option, i) => {
          let answerClass = answer === i ? "answer-option selected" : "answer-option";
          if (feedback && i === current.correta) answerClass += " correct";
          else if (feedback && answer === i) answerClass += " incorrect";
          return <button key={option} className={answerClass} disabled={feedback} onClick={() => setAnswer(i)}><span className="answer-letter">{String.fromCharCode(65 + i)}</span>{option}</button>;
        })}</div>
        {feedback && <div className={answer === current.correta ? "quiz-feedback correct-feedback" : "quiz-feedback incorrect-feedback"}><strong>{answer === current.correta ? "Resposta correta!" : "Resposta incorreta."}</strong><p>{current.explicacao}</p></div>}
        {!feedback
          ? <button className="btn-primary quiz-submit" disabled={answer === null} onClick={submit}>Conferir resposta <ChevronRight size={17}/></button>
          : <button className="btn-primary quiz-submit" onClick={nextQuestion}>{index + 1 === perguntas.length ? "Ver resultado" : "Próxima pergunta"} <ChevronRight size={17}/></button>}
        <p className="quiz-footnote">Você verá uma explicação depois de responder cada pergunta.</p>
      </div>
    </section>
  );
}

function NormsPage() {
  const norms = [
    { name: "NR-6", title: "Equipamento de Proteção Individual (EPI)", text: "Estabelece requisitos para aprovação, comercialização, fornecimento e utilização de EPI. Trata também das responsabilidades da organização, dos trabalhadores e dos fabricantes ou importadores." },
    { name: "NR-1", title: "Disposições Gerais e Gerenciamento de Riscos Ocupacionais", text: "Apresenta disposições gerais de segurança e saúde no trabalho e diretrizes para o gerenciamento de riscos ocupacionais." },
    { name: "NR-9", title: "Avaliação e controle das exposições ocupacionais", text: "Trata da avaliação e do controle das exposições ocupacionais a agentes físicos, químicos e biológicos, conforme seu campo de aplicação." },
    { name: "NR-17", title: "Ergonomia", text: "Estabelece diretrizes para adaptar as condições de trabalho às características psicofisiológicas dos trabalhadores, buscando conforto, segurança, saúde e desempenho." }
  ];
  return (
    <section className="page-section">
      <div className="page-intro"><span className="eyebrow">CONHEÇA AS REFERÊNCIAS</span><h1>Normas e segurança</h1><p>Entenda, de forma resumida, algumas normas regulamentadoras relacionadas à saúde e segurança no trabalho.</p></div>
      <div className="norms-grid">{norms.map(norm => <article className="norm-card" key={norm.name}><span className="norm-number">{norm.name}</span><h2>{norm.title}</h2><p>{norm.text}</p></article>)}</div>
      <div className="official-source"><div><h2>Consulte sempre a fonte oficial</h2><p>As Normas Regulamentadoras podem ser atualizadas. Consulte a versão vigente no portal do Ministério do Trabalho e Emprego.</p></div><a className="btn-primary" href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/normas-regulamentadoras-nrs" target="_blank" rel="noreferrer">Acessar NRs oficiais <ExternalLink size={16}/></a></div>
      <div className="notice large-notice"><AlertTriangle size={22}/><p><strong>Atenção:</strong> este site é um material educativo e não substitui análise de riscos, orientação de profissional habilitado, treinamento obrigatório, procedimentos da organização ou consulta às normas oficiais vigentes.</p></div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("inicio");
  const [selectedEpi, setSelectedEpi] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  function navigate(next) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let content;
  switch (page) {
    case "assistente-ia": content = <EpiAssist onNavigate={navigate} />; break;
    case "catalogo": content = <CatalogPage setSelectedEpi={setSelectedEpi} setPage={navigate} />; break;
    case "detalhe": content = <DetailPage epi={selectedEpi} setPage={navigate} />; break;
    case "tutoriais": content = <TutorialsPage setSelectedEpi={setSelectedEpi} setPage={navigate} />; break;
    case "profissoes": content = <ProfessionsPage />; break;
    case "quiz": content = <QuizPage />; break;
    case "normas": content = <NormsPage />; break;
    default: content = <HomePage setPage={navigate} setSelectedEpi={setSelectedEpi} />;
  }

  return (
    <div className="app-shell">
      <Header page={page} setPage={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>{content}</main>
      <Footer setPage={navigate} />
    </div>
  );
}
