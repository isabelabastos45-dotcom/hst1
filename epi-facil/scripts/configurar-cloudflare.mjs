import { existsSync, readFileSync, writeFileSync } from "node:fs";

const arquivo = "src/components/EpiAssist.jsx";
const linhaAntiga = 'const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\\/$/, "");';
const linhaNova = 'const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\\/$/, "");';

if (!existsSync(arquivo)) {
  console.error(`Não encontrei ${arquivo}. Confira se o EPI Assist do primeiro pacote já foi integrado.`);
  process.exit(1);
}

const conteudo = readFileSync(arquivo, "utf8");

if (conteudo.includes(linhaNova)) {
  console.log("O EPI Assist já está configurado para usar a API no mesmo domínio. Nenhuma alteração necessária.");
  process.exit(0);
}

if (!conteudo.includes(linhaAntiga)) {
  console.error("Não encontrei a linha original de API_BASE. Não alterei nenhum arquivo.");
  console.error("Abra src/components/EpiAssist.jsx e procure pela linha que define API_BASE; envie-a para eu ajustar o script.");
  process.exit(1);
}

writeFileSync(arquivo, conteudo.replace(linhaAntiga, linhaNova), "utf8");
console.log("Pronto: o EPI Assist agora chama /api no mesmo domínio do site.");
