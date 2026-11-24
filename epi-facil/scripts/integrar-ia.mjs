/**
 * Integração não destrutiva com o App.jsx gerado na primeira versão do EPI Fácil.
 * Não substitui o App.jsx inteiro nem altera package.json.
 * Pode ser executado mais de uma vez sem duplicar o menu.
 * Se a estrutura não for reconhecida, para sem gravar nada no App.jsx.
 */
import fs from "node:fs";
import path from "node:path";

const pasta = process.cwd();
const arquivo = path.join(pasta, "src", "App.jsx");
const componente = path.join(pasta, "src", "components", "EpiAssist.jsx");
const simulacao = process.argv.includes("--check");

function falhar(mensagem) { console.error(`\nERRO: ${mensagem}\nO App.jsx não foi alterado. Peça ajuda antes de editar manualmente.`); process.exit(1); }
if (!fs.existsSync(arquivo)) falhar("Não encontrei src/App.jsx. Execute na raiz do projeto EPI Fácil.");
if (!fs.existsSync(componente)) falhar("Não encontrei src/components/EpiAssist.jsx. Extraia o pacote na pasta raiz do projeto.");

const original = fs.readFileSync(arquivo, "utf8");
let codigo = original;
const jaTemImport = codigo.includes('from "./components/EpiAssist.jsx"') || codigo.includes("from './components/EpiAssist.jsx'");
const jaTemMenu = /id:\s*["']assistente-ia["']/.test(codigo);
const jaTemRota = /case\s+["']assistente-ia["']/.test(codigo);
if ((jaTemImport || jaTemMenu || jaTemRota) && !(jaTemImport && jaTemMenu && jaTemRota)) {
  falhar("Parece haver uma integração parcial. Para evitar duplicidade, não alterei o arquivo. Confira o App.jsx e o git diff.");
}
if (!(jaTemImport && jaTemMenu && jaTemRota)) {
  const inicioMenu = codigo.indexOf("const navItems = [");
  const fimMenu = inicioMenu >= 0 ? codigo.indexOf("];", inicioMenu) : -1;
  const chaveSwitch = /switch\s*\(\s*page\s*\)\s*\{/;
  if (inicioMenu < 0 || fimMenu < 0 || !chaveSwitch.test(codigo) || !codigo.includes("onClick") || !codigo.includes("navigate")) {
    falhar("O App.jsx tem uma estrutura diferente da primeira versão. Não é seguro fazer a integração automática.");
  }
  if (!/\bReact\s+from\s+["']react["']/.test(codigo) && !/import\s+React\s*,/.test(codigo)) {
    codigo = 'import React from "react";\n' + codigo;
  }
  codigo = 'import EpiAssist from "./components/EpiAssist.jsx";\nimport { Bot } from "lucide-react";\n' + codigo;
  const inicioAtual = codigo.indexOf("const navItems = [");
  const fimAtual = codigo.indexOf("];", inicioAtual);
  const anterior = codigo.slice(inicioAtual, fimAtual).trimEnd();
  const precisaVirgula = anterior.endsWith("}");
  codigo = codigo.slice(0, fimAtual) + (precisaVirgula ? "," : "") + '\n  { id: "assistente-ia", label: "Assistente IA", icon: Bot },\n' + codigo.slice(fimAtual);
  codigo = codigo.replace(chaveSwitch, (trecho) => `${trecho}\n    case "assistente-ia": content = <EpiAssist onNavigate={navigate} />; break;`);
}

const gitignorePath = path.join(pasta, ".gitignore");
const ignoreAtual = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, "utf8") : "";
const novosIgnorados = [".env", ".env.local", ".env.*.local", "node_modules/", "dist/"];
const faltantes = novosIgnorados.filter((item) => !ignoreAtual.split(/\r?\n/).includes(item));

if (simulacao) {
  console.log("Verificação concluída: estrutura reconhecida. Nenhum arquivo foi modificado.");
  console.log(original === codigo ? "App.jsx: IA já integrada." : "App.jsx: serão incluídos 2 imports, 1 item de menu e 1 case no switch.");
  console.log(faltantes.length ? `.gitignore: serão adicionados ${faltantes.join(", ")}.` : ".gitignore: já protege os arquivos esperados.");
} else {
  if (codigo !== original) fs.writeFileSync(arquivo, codigo, "utf8");
  if (faltantes.length) fs.writeFileSync(gitignorePath, ignoreAtual + (ignoreAtual.endsWith("\n") || !ignoreAtual ? "" : "\n") + "\n# EPI Assist — arquivos privados e gerados\n" + faltantes.join("\n") + "\n", "utf8");
  console.log(original === codigo ? "EPI Assist já estava integrado ao App.jsx." : "Integração aplicada ao App.jsx com sucesso!");
  console.log("Confira as diferenças: git diff -- src/App.jsx .gitignore");
}
