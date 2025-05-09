# Auth-Navegação

Este projeto é uma aplicação web com autenticação de usuários e rastreamento de preferências de navegação utilizando **Node.js**, **Express**, **SQLite**, **cookies** e **Bootstrap 5**.

## Funcionalidades
- Cadastro e login de usuários com senhas criptografadas (SHA-256).
- Controle de sessão com cookies.
- Bloqueio de acesso a páginas sem autenticação.
- Rastreamento de visitas às páginas com temas (Política, Esportes, Lazer).
- Sugestões personalizadas baseadas nos temas mais acessados, exibidas após login.
- Interface responsiva com **Bootstrap 5**.

## Estrutura de Diretórios

    /auth-navegacao
    ├── public/
    │ ├── index.html
    │ ├── dashboard.html
    │ ├── politica.html
    │ ├── esportes.html
    │ ├── lazer.html
    │ ├── style.css
    │ └── track.js
    ├── server.js
    ├── database.sqlite
    ├── package.json
    └── README.md


## Como Executar
1. Instale as dependências:
    npm install

2. Inicie o Servidor:
    node server.js

3. Acesse no navegador:
    http://localhost:3000
