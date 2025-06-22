# Projeto Back-End - API de Livros

## Descrição

Este projeto é uma API RESTful desenvolvida em Node.js com TypeScript para gerenciar um catálogo de livros. Utiliza o framework Express para criação do servidor HTTP, TypeORM para integração com banco de dados PostgreSQL, e diversas outras bibliotecas para validação, tratamento de erros e testes automatizados.

---

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Joi (validação de dados)
- Celebrate (middleware de validação)
- Jest (testes automatizados)
- Supertest (testes de integração)
- ESLint e Prettier (qualidade e formatação de código)
- Dotenv (variáveis de ambiente)
- CORS

---

## Estrutura do Projeto

- `src/` - Código fonte da aplicação
  - `config/` - Configurações do banco de dados
  - `modules/books/` - Módulo responsável pelas funcionalidades relacionadas a livros
    - `infra/http/` - Controllers, rotas e schemas HTTP
    - `models/` - Interfaces e serviços de domínio
    - `services/` - Implementações dos serviços de negócio
  - `shared/` - Código compartilhado entre módulos
    - `infra/http/` - Configuração do servidor, middlewares e rotas globais
    - `middlewares/` - Middlewares personalizados, como tratamento de erros
    - `infra/typeorm/` - Configurações e migrações do TypeORM
- `scripts/` - Scripts auxiliares, como criação de migrações
- `tests/` - Testes automatizados da aplicação

---

## Como Usar

### Pré-requisitos

- Node.js instalado (versão recomendada: 18 ou superior)
- PostgreSQL instalado e configurado
- Banco de dados criado para a aplicação
- Variáveis de ambiente configuradas (crie um arquivo `.env` na raiz do projeto com as configurações necessárias, como `PORT` e dados do banco)

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd BACK-END
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto. Exemplo:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=nome_do_banco
   ```

5. Execute as migrações para criar as tabelas no banco:
   ```bash
   npm run migration:run
   ```

### Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento com recarga automática:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000` (ou na porta configurada).

### Rotas Principais

- `GET /` - Rota raiz que retorna uma mensagem simples confirmando que a API está funcionando.
- `GET /livros` - Listar todos os livros.
- `POST /livros` - Criar um novo livro.
- `PUT /livros/:id` - Atualizar um livro existente.
- `DELETE /livros/:id` - Remover um livro.

> Para detalhes completos das rotas, consulte os arquivos em `src/modules/books/infra/http/routes/`.

---

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot reload.
- `npm run lint` - Executa o ESLint para verificar problemas no código.
- `npm run lint-fix` - Executa o ESLint e corrige problemas automaticamente.
- `npm run migration:create` - Cria uma nova migração (é necessário editar o script para definir a migração).
- `npm run migration:run` - Executa as migrações pendentes no banco de dados.
- `npm run test` - Executa os testes automatizados com Jest.

---

## Testes

Os testes estão localizados na pasta `src/tests/` e cobrem controllers, middlewares, schemas e serviços. Para rodar os testes, utilize:

```bash
npm run test
```

---

## Considerações Finais

Este projeto segue boas práticas de desenvolvimento, como separação de responsabilidades, uso de interfaces para tipagem, tratamento centralizado de erros e validação de dados. É uma base sólida para construir APIs RESTful escaláveis e manuteníveis.

---

Se precisar de ajuda ou quiser contribuir, fique à vontade para abrir issues ou pull requests.

---

## Repositorio Front-end
https://github.com/HugoZAuad/Desafio_5_RID66155-FRONT-END-
