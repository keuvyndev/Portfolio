# Projeto Next.js - Comandos de Desenvolvimento

## 1. Commands to Create App

#Shadecn

```bash
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add sheet
npx shadcn@latest add separator
npx shadcn@latest add alert-dialog
```

## 2. Add prisma.ts to instance client in development

Função: Permite que o banco possa ser consultado em tempo de desenvolvimento instanciando apenas 1 cliente mesmo que a tela seja reiniciada.

Crie um arquivo chamado "prisma.ts" em app/\_lib, e cole o seguinte código:

```typescript
import { PrismaClient } from "@prisma/client";

declare global {
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

## 3. Add domain to allows image render from url

Função: Permite usar imagens de um domínio externo.

Abra o arquivo "next.config.mjs" e coloque o código abaixo:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
  },
};

export default nextConfig;
```

## 4. Changed background from aplication

Função: Permite usar imagens de um domínio externo.

Adicione no body:

```css
body {
  @apply text-foreground antialiased;
}
```

## 1. Prisma

```bash
npx prisma reset
```

## 2. Context API

Objetivo: Usado para trabalhar com componentes de Estado Global.

```bash
npx prisma reset
```
