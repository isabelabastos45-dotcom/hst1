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


## Executar o EPI Assist com Cloudflare Workers AI

O EPI Assist usa uma Pages Function em `functions/api/assist.js` e o binding `AI` da Cloudflare. A chave da IA não fica no React nem precisa ser colocada em um arquivo `.env`.

### Testar localmente

1. Abra a pasta `epi-facil` no terminal.
2. Instale as dependências, caso ainda não tenha feito:

   ```bash
   npm install
   ```

3. Faça login na Cloudflare (uma única vez por computador):

   ```bash
   npx wrangler login
   ```

4. Inicie a versão de teste com o binding da IA:

   ```bash
   npm run dev:cloudflare
   ```

5. Abra o endereço local mostrado pelo Wrangler. Para testar alterações posteriores, execute novamente o comando para gerar o novo `dist`.

**Importante:** não use apenas `npm run dev` para testar as rotas `/api` do Pages Functions. Esse comando inicia somente o Vite e não reproduz a integração completa com o Workers AI.

### Configurar no site publicado

No painel da Cloudflare:

1. Acesse **Workers & Pages** e abra o projeto do EPI Fácil.
2. Entre em **Settings** e localize **Functions / Bindings**.
3. Adicione um binding do tipo **Workers AI**.
4. No campo **Variable name**, informe exatamente `AI`.
5. Salve e faça um novo deploy do projeto.

A função verifica `env.AI`; se o binding tiver outro nome ou não estiver habilitado, a API não conseguirá chamar o modelo.

### Uso e limites

O modelo configurado é `@cf/zai-org/glm-4.7-flash`. A Cloudflare informa uma franquia de 10.000 Neurons por dia sem cobrança no Workers Free; o consumo depende do modelo e do tamanho das entradas e respostas. A inferência acessa os serviços da Cloudflare mesmo durante o teste local. Acompanhe o consumo no painel da Cloudflare e confira os limites vigentes antes de disponibilizar o recurso publicamente.

Documentação oficial:
- https://developers.cloudflare.com/pages/functions/bindings/
- https://developers.cloudflare.com/workers-ai/models/glm-4.7-flash/
- https://developers.cloudflare.com/workers-ai/platform/pricing/
