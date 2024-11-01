# [US] APP-BARBERSHOP 💈

**Project Description:** This is a project for an application aimed at barbershop clients, allowing them to find nearby barbershops, track reviews, view services and prices, as well as make and track appointments.

> This project is originally based on a training by [felipemotarocha](https://github.com/felipemotarocha), with modifications and customizations made by me for learning purposes and to meet specific needs.

![Badge of Status](https://img.shields.io/badge/Status-Completed-green)

## 📋Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Usage](#installation-and-usage)

---

## About the Project

This project was developed to **facilitate customer service in barbershops**. It offers features that benefit both clients and owners, providing:

- ✅ **Real-time tracking** of appointments for both clients and owners.
- ✅ **Ease of finding suitable barbershops** with visible ratings, services, and prices.
- ✅ **Direct scheduling in the app**, without the need for contact or travel to the location.

The application was built with a focus on modern design, intuitive navigation, and robust architecture, using a Docker container database to store information about barbershops, services, clients, and appointments.

## Features

- **🔍 Barbershop View:** Access a complete list of registered barbershops.
- **⭐ Barbershop Ratings:** Check the ratings of each barbershop.
- **💼 Service Details:** View services, information, and prices for each barbershop.
- **📅 Online Scheduling:** Make appointments showing only available days and times.
- **🔒 Google Authentication:** Log in using your Google account.
- **📲 Appointment Tracking:** See appointments made in real-time.

## Technologies Used

The main technologies used in this project are:

| Technology             | Description                                   |
|------------------------|-----------------------------------------------|
| **Next.js**            | React framework for web development           |
| **Tailwind CSS**       | Styling library                               |
| **TypeScript**         | Superset of JavaScript for typing             |
| **Prisma ORM**         | ORM for database manipulation                  |
| **Next-Auth**          | User authentication                            |
| **PostgreSQL**         | Relational database                            |
| **Docker**             | Container with PostgreSQL for local tests                     |
| **Supabase, Vercel Storage**             | Platform for nanage database in cloud                     |
| **Git**                | Version control                               |
| **Figma, Lucid Dev, ShadeCN** | Auxiliary tools for development               |
| **Date-fns**           | Date manipulation                             |

## Installation and Usage

Follow the steps below to run the project in your local environment:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/keuvyndev/portfolio.git

2. **Install Docker:**
   Access the [official Docker website](https://www.docker.com/products/docker-desktop) for download and installation.<br><br>

3. **Navigate to the project directory:**
   ```bash
   cd app-barbershop

4. **Install dependencies:**
   ```bash
   npm install

5. **Configure the .env file:**
   To test the Google login feature, enter your own values for the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` variables in .env file.

6. **Start the project in development environment:**
   ```bash
   npm run dev

7. **Access your localhost to view the project:**
   ```bash
   http://localhost:3000/

---

# [PT] APP-BARBERSHOP 💈

**Breve descrição do projeto:** Este é o projeto de um aplicativo voltado para clientes de barbearias, permitindo consultar barbearias próximas, acompanhar avaliações, visualizar serviços e valores, além de realizar e acompanhar agendamentos.

> Este projeto é originalmente baseado em um treinamento de [felipemotarocha](https://github.com/felipemotarocha) com modificações e personalizações feitas por mim para fins de aprendizado e adequação a necessidades específicas.

![Badge of Status](https://img.shields.io/badge/Status-Completed-green)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Uso](#instalação-e-uso)

---

## Sobre o Projeto

Este projeto foi desenvolvido para **facilitar o atendimento de clientes em barbearias**. Ele oferece funcionalidades que beneficiam tanto os clientes quanto os proprietários, proporcionando:

- ✅ **Acompanhamento em tempo real** dos agendamentos por parte de clientes e donos.
- ✅ **Facilidade para encontrar barbearias** adequadas, com avaliações, serviços e valores visíveis.
- ✅ **Agendamento direto no aplicativo**, sem necessidade de contato ou deslocamento ao local.

A aplicação foi construída com foco em design moderno, navegação intuitiva e arquitetura robusta, utilizando um banco de dados em container-docker para armazenar informações de barbearias, serviços, clientes e agendamentos.

## Funcionalidades

- **🔍 Visualização de Barbearias:** Acesse a lista completa de barbearias cadastradas.
- **⭐ Avaliação de Barbearias:** Consulte a avaliação de cada barbearia.
- **💼 Detalhes de Serviços:** Visualize serviços, informações e valores de cada barbearia.
- **📅 Agendamento Online:** Realize agendamentos mostrando apenas dias e horários disponíveis.
- **🔒 Autenticação com Google:** Faça login usando sua conta Google.
- **📲 Acompanhamento de Agendamentos:** Veja agendamentos realizados em tempo real.

## Tecnologias Utilizadas

As principais tecnologias usadas neste projeto são:

| Tecnologia             | Descrição                                   |
|------------------------|---------------------------------------------|
| **Next.js**            | Framework React para desenvolvimento web    |
| **Tailwind CSS**       | Biblioteca de estilização                  |
| **TypeScript**         | Superset de JavaScript para tipagem         |
| **Prisma ORM**         | ORM para manipulação de banco de dados      |
| **Next-Auth**          | Autenticação de usuários                    |
| **PostgreSQL**         | Banco de dados relacional                   |
| **Docker**             | Container com PostgreSQL para testes locais                    |
| **SupaBase, Vercel Storage**             | Plataforma para gerenciar banco de dados em nuvem  |
| **Git**                | Controle de versão                          |
| **Figma, Lucid Dev, ShadeCN** | Ferramentas auxiliares para desenvolvimento |
| **Date-fns**           | Manipulação de datas                        |

## Instalação e Uso

Siga os passos abaixo para rodar o projeto em seu ambiente local:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/keuvyndev/portfolio.git

2. **Instale o Docker:**
Acesse o [site oficial do Docker](https://www.docker.com/products/docker-desktop) para download e instalação.<br><br>

3. **Acesse o diretório do projeto:**
   ```bash
   cd app-barbershop

4. **Instale as dependências:**
   ```bash
   npm install

5. **Configure o arquivo .env:**
   Para testar a função de login com o Google, insira seus próprios valores nas variáveis `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET` no arquivo .env

6. **Inicie o projeto em ambiente de desenvolvimento:**
   ```bash
   npm run dev

7. **Acesse seu localhost para visualizar o projeto:**
   ```bash
   http://localhost:3000/