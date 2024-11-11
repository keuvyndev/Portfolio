# Projeto Next.js - Linha de Progresso

## 1. Commands to Create App

```bash
npx create-next-app@latest app-fsw-food
```

Durante a criação do app, o Next.js fará algumas perguntas. Responda da seguinte forma:

Would you like to use TypeScript with this project? √ Sim  
Would you like to use ESLint with this project? √ Sim  
Would you like to use Tailwind CSS with this project? √ Sim  
Would you like to use src/ directory with this project? √ Não  
Would you like to use App Router (recommended)? √ Sim  
Would you like to customize the default import alias? √ Sim  
What import alias would you like configured? √ Não

## 2. Commands to Config DB

Para configurar o banco de dados PostgreSQL com Prisma:

```bash
npm install prisma --save-dev
npx prisma init
npx prisma init --datasource-provider postgresql
npx prisma format
npx prisma migrate dev --name init_database
```

## 3. Grants you have the latest version of react and dependencies

Use o comando abaixo para atualizar o React para a versão mais recente:

```bash
npm install react@latest react-dom@latest
```

Use o comando abaixo para listar as dependências que precisam ser atualizadas:

```bash
npm outdated
```

Use o comando abaixo para atualizar uma ou todas as dependências:

```bash
npm update # Atualiza todos os pacotes desatualizados
npm update <package_name> # Atualiza um pacote desatualizado
```

## 4. Commands to Apply Libs

Instale o ts-node para suporte ao TypeScript:

```bash
npm install -D ts-node
npx prisma db seed
```

Inicialize o ShadCN UI:

```bash
npx shadcn@latest init
```

Durante a configuração, responda conforme abaixo:

- Style: Padrão
- Base color: Slate
- CSS variables for theming: Sim

Adicione um componente (exemplo: card) com ShadCN UI:

```bash
npx shadcn@latest add card
npx shadcn@latest add button
```

Instale a classificação automática de classes com Prettier:

```bash
npm install -D prettier prettier-plugin-tailwindcss --legacy-peer-deps
```

- Coloque o arquivo ".prettierrc" na pasta raiz com o código abaixo:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## 5. Organize Project

a) Mova as pastas "lib" e "components" para "app".  
b) Todas as pastas que não contêm rotas no Next, coloque "\_" como prefixo do nome da pasta.  
c) Altere algumas linhas no arquivo "components.json" para:

```json
{
  "components": "@/app/_components",
  "utils": "@/app/_lib/utils",
  "ui": "@/app/_components/ui",
  "lib": "@/app/_lib",
  "hooks": "@/app/_hooks"
}
```

d) Altere o arquivo "globals.css" para mudar as cores globais do projeto.

## 6. Install Extensions for VSCode

- Tailwind CSS IntelliSense.
- Simple React Snippet.
- Prettier - Code formatter.
  a) É necessário configurar "Prettier - Code formatter como "default formatter" nas configurações do VSCode.
  b) É necessário habilitar o "Format On Save" nas configurações do VSCode.

## 7. Install Git Hooks with Husky

O que é? Garante que o prettier e o eslint serão executados antes do commit do git. O "lint-staged" garante que os comandos sejam executados apenas nos arquivos que estão preparados para o git.

```bash
npm install -D husky lint-staged
npx husky-init
```

Abra o arquivo "pre-commit" que foi criado na pasta raiz. Coloque o código abaixo:

```bash
npx lint-staged
```

**O que é? Garante que o lint-staged será chamado antes do commit do git.**

Crie o arquivo ".lintstagedrc.json" na pasta raiz. Coloque o código abaixo:

```json
{
  "*.ts?(x)": ["eslint --fix", "prettier --write"]
}
```

**O que é? Garante que o eslint e o prettier serão chamados antes do commit do git (mas apenas em arquivos preparados).**

## 8. Install Git Commit Msg Linter

**O que é?** Valida se a mensagem do commit condiz com o assunto, baseado no conventional commits.

Rode o seguinte comando no terminal para instalar:

```bash
npm install git-commit-msg-linter --save-dev
npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1"
```

Cria um arquivo "commit-msg" na pasta ".husky". Cole o código abaixo:

```bash
. "$(dirname "$0")/_/husky.sh"

.git/hooks/commit-msg $1
```

## 9. Add prisma.ts to \_libs folder

**O que é?** Permite se comunicar com o banco em tempo de desenvolvimento..

Vá até a pasta "app/\_lib" e crie um arquivo chamado "prisma.ts", coloque o código abaixo e salve:

```bash
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
```

Agora instale a biblioteca com o comando abaixo:

```bash
npm install @prisma/client@5.20.1
```
