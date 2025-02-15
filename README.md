Sistema de Gerenciamento de Tarefas

📌 Sobre o Projeto

O Sistema de Gerenciamento de Tarefas é uma aplicação web que permite aos usuários criar, organizar e gerenciar tarefas de forma eficiente. Com funcionalidades como cadastro de usuários, filtragem de tarefas e notificações, o sistema visa aumentar a produtividade e facilitar a organização diária.

🚀 Tecnologias Utilizadas

Backend: Java com Spring Boot

Frontend: React + Bootstrap

Banco de Dados: MySQL

Containerização e Implantação: Docker + Kubernetes

Monitoramento: Prometheus e Grafana

Criação de Wireframes: Figma

🛠 Funcionalidades Principais

📌 Cadastro e autenticação de usuários

📝 Criação, edição e exclusão de tarefas

📅 Filtragem e organização por status e data

📩 Notificações por e-mail para lembretes

🔒 Segurança aprimorada com hashing de senhas e restrições de login

🏗 Como Rodar o Projeto Localmente

Pré-requisitos

Antes de começar, certifique-se de ter instalado:

Docker

Java 17+

Node.js 18+

MySQL

Instalação

Clone o repositório:

git clone https://github.com/seu-usuario/sistema-gerenciamento-tarefas.git
cd sistema-gerenciamento-tarefas

Configure o banco de dados MySQL:

CREATE DATABASE tarefas_db;

Configure as variáveis de ambiente (.env ou application.properties).

Execute o backend:

cd backend
./mvnw spring-boot:run

Execute o frontend:

cd frontend
npm install
npm start

O sistema estará disponível em http://localhost:3000.

📖 Documentação

Para mais detalhes sobre os requisitos funcionais, regras de negócio e fluxos do sistema, consulte a pasta docs/ (a ser criada).

🤝 Contribuição

Se deseja contribuir com o projeto:

Faça um fork do repositório

Crie uma branch para sua feature (git checkout -b minha-feature)

Commit suas alterações (git commit -m 'Minha nova feature')

Faça um push para a branch (git push origin minha-feature)

Abra um Pull Request
