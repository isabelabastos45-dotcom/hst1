# EPI Fácil

Projeto educativo em React + Vite sobre Equipamentos de Proteção Individual.

## Requisitos
- Node.js em versão LTS
- npm (instalado junto com Node.js)
- Editor de código, como Visual Studio Code

## Como executar

1. Extraia o arquivo ZIP.
2. Abra a pasta `epi-facil` no Visual Studio Code.
3. Abra o terminal integrado (`Terminal > New Terminal`).
4. Execute:

```bash
npm install
npm run dev
```

5. Abra no navegador o endereço local que o Vite mostrar (normalmente `http://localhost:5173`).

## Como gerar a versão de produção

```bash
npm run build
```

Os arquivos finais serão criados na pasta `dist`.

## Estrutura

- `src/App.jsx`: páginas e componentes principais.
- `src/styles.css`: identidade visual e responsividade.
- `src/data/epis.js`: informações dos EPIs e profissões.
- `src/data/quiz.js`: perguntas e respostas do quiz.

## Personalização
Edite os arquivos em `src/data` para adicionar EPIs, profissões ou perguntas. O site atual funciona no frontend e não precisa de banco de dados.

## Aviso de uso
O conteúdo é educativo e demonstrativo. Não substitui avaliação de riscos, treinamento, instruções do fabricante, procedimentos internos nem consulta às Normas Regulamentadoras vigentes. A escolha de EPI deve considerar o risco real e orientação técnica competente.
