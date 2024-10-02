# Descrição

O script vai pegar todos as informações dos contatos que está na [planilha](https://docs.google.com/spreadsheets/d/1ncqz0WY8BjZwSFHUcSsL4bq1VrA-wOaWLZEqIyTqUUg/edit?usp=sharing) e vai adicionar como contato no seu CRM [HubSpot](https://br.hubspot.com/).

# Como usar? 

Clone o repositório

```bash
git clone git@github.com:juninhopo/godevapi.git
```

Entre na pasta correta

```bash
cd godevapi
```

Instale todas as dependências do projeto

```bash
npm i
```

Renomeie o arquivo .env.example para .env

Coloque sua api-key no arquivo .env

Execute o comando no terminal para executar o script

```bash
npm start
```

# Testes Unitários

Execute o comando abaixo para verificar todos os testes unitários do projeto

```bash
npm run test:coverage
```

Execute o comando abaixo para ter uma visualização melhor de como está os testes unitários do projeto

```bash
open coverage/lcov-report/index.html
```