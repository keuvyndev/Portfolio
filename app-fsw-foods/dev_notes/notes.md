# Projeto Next.js - Linha de Progresso

## 1. Commands to Create App

```bash
npx create-next-app@latest app-fsw-food
```

Durante a criação do app, o Next.js fará algumas perguntas. Responda da seguinte forma:

Would you like to use TypeScript with this project? √ Yes
Would you like to use ESLint with this project? √ Yes
Would you like to use Tailwind CSS with this project? √ Yes
Would you like to use src/ directory with this project? √ No
Would you like to use App Router (recommended)? √ Yes
Would you like to customize the default import alias? √ Yes
What import alias would you like configured? @/*

## 2. Commands to Config DB
Para configurar o banco de dados PostgreSQL com Prisma:

```bash
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql
npx prisma format
npx prisma migrate dev --name init_database
```

## 3. Commands to Apply Libs

Instale o ts-node para suporte ao TypeScript:

```bash
npm install -D ts-node
npx prisma db seed
```

Inicialize o ShadCN UI:

```bash
npx shadcn-ui@latest init
```

Durante a configuração, responda conforme abaixo:

* Style: Default
* Base color: Slate
* CSS variables for theming: Yes

Adicione um componente (exemplo: card) com ShadCN UI:

```bash
npx shadcn@latest add card
npx shadcn@latest add button

```

Install automatic class sorting with prettier:

```bash
npm install -D prettier prettier-plugin-tailwindcss --legacy-peer-deps
```
* Put file ".prettierrc" into root folder with below code:
```bash
{
   "plugins": ["prettier-plugin-tailwindcss"]
 }
```

## 4. Organize Project
a) Move folds "lib" and "components" to "app".
b) All folders there's not routes in next, put "_" like prefix of name folder.
c) Change some lins in file "components.json" to:
    "components": "@/app/components",
    "utils": "@/app/_lib/utils",
d) Change file "globals.css" to change global colors of the project.
e) Change favicon.ico

## 5. Install Extensions for VSCode
- Tailwind CSS IntelliSense.