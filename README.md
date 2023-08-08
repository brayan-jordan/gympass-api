# Gympass API
Aplicação back-end completa, para realizar o controle de passes de academias. Seguindo requisitos funcionais e regras de negócio definidas antes de todo desenvolvimento.

## Principais tópicos do projeto
+ 👨‍🔬 **Testes:** A aplicação contém testes unitários e testes end-to-end para mantér todas as integrações e regras de negócio validas com o passar do tempo de manutenção.
+ 🏡 **Pattern SOLID:** A aplicação foi desenvolvida seguindo o Design Pattern SOLID. Estruturando a aplicação em camadas para facilitar novas integrações com os requisitos funcionais e também a manutenção de código.
+ ▶️ **Integração com Github Actions:** O projeto contém 2 workflows para executar os testes e facilitar contribuições e validações de novos commits e pull requests.
+ 🛳️ **Docker:** Aprendi e apliquei o conceito de docker, para facilitar o setup do ambiente de desenvolvimento e deploy.
+ 🧼 **Clean code:** Aprendi e apliquei vários conceitos de Clean code para manter criar um código legível para novos desenvolvedores.
+ 🗼 **Prisma ORM:** Utilizei a biblioteca [prisma.io](https://www.prisma.io/) para integrar com o banco de dados. A biblioteca contém várias ferramentas para facilitar o desenvolvimento e manutenção do banco de dados em grandes equipes.
+ 🔒 **JWT e Refresh tokens:** Aprimorei os conhecimentos que já tinha em autenticação JWT, desenvolvendo um sistema de refresh tokens, que permite implementar rotas de logout (invalidação de tokens) e também mantér renovar o token do usuário para poupa-lo de digitar suas credenciais novamente.
+ 🤹 **Role Based Access Control:** Aprendi e apliquei esse conceito para conseguir restringir algumas funcionalidades apenas para usuários com cargos de ADMIN dentro da aplicação
+ 📚 **Bibliotecas:** Foram utilizadas algumas outras bibliotecas conhecidas na comunidade NodeJS como: [Fastify](https://fastify.dev/), [Vitest](https://vitest.dev/), [ESLint](https://eslint.org/), [Supertest](https://www.npmjs.com/package/supertest), [DayJS](https://day.js.org/).

## Principais scripts do projeto
```bash
# instalar as dependências (recomendo o uso de uma versão do NodeJS mais recente)
$ npm install
# compilar aplicação para execução em ambiente de produção (converte arquivos .ts em .js)
$ npm run build
# executar aplicação em ambiente de produção
$ npm start
# executar aplicação em ambiente de desenvolvimento
$ npm run dev
# executar testes unitários
$ npm run test
# executar testes E2E
$ npm run test:e2e
# executar testes e visualizar cobertura
$ npm run test:coverage
```
## Considerações
+ 💻 **Váriaveis de ambiente:** É necessário configurar as váriaveis de ambiente (pode ser realizado uma cópia do arquivo [.env.example](https://github.com/brayan-jordan/nodejs-solid-api/blob/master/.env.example))
+ 🛳️ **Docker:** Se o desenvolvedor tiver a ferramenta docker instalada no computador, basta executar o comando ***"docker compose up -d"*** que subirá um container com um banco de dados para conexão.