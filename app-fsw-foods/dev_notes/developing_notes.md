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

## 3. NextAuth.js

Objetivo: Usado implementar autenticação.
Site Instalação Next-Auth: https://next-auth.js.org/configuration/initialization#route-handlers-app
Site Google Provider: https://next-auth.js.org/providers/google
Site Adapters-Prisma: https://authjs.dev/getting-started/adapters/prisma?_gl=1*1h03tgd*_gcl_au*MTM5NjkzODEzMC4xNzMwNDcwNDI3

```bash
npm install next-auth
```

1. Crie o arquivo "route.ts" conforme o caminho:

```bash
/pages/api/auth/[...nextauth].ts
```

2. Insira o código do NextAuth no route.ts (Já inclui Google como Provider):

```bash
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  }),
  ],
})
```

3. Configure o Prisma para usar com NextAuth

3.1 Instale o Adapter:

```bash
npm install @auth/prisma-adapter
```

3.2 Adicione o adapter ao route.ts:

```bash
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});

export { handler as GET, handler as POST };
```

3.3 Adicione as tabelas necessárias no Schema.prisma:

```bash
model Account {
  id                 String  @id @default(cuid())
  userId             String  @map("user_id")
  type               String
  provider           String
  providerAccountId  String  @map("provider_account_id")
  refresh_token      String? @db.Text
  access_token       String? @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String? @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime? @map("email_verified")
  image         String?
  accounts      Account[]
  sessions      Session[]

  @@map("users")
}

model VerificationToken {
  identifier String
  token      String
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

3.4 Execute o migrate no Prisma:

```bash
npx prisma migrate dev --name add_auth_tables
```

4. Crie o arquivo "auth.tsx" no caminho especificado com o código:

```bash (caminho)
app/_providers/auth.tsx
```

```bash (código)
"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
   return (
      <SessionProvider>{children}</SessionProvider>

   );
}

export default AuthProvider;
```

5. Adicione o componente ao arquivo "layout.tsx" da aplicação:

```bash
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </ AuthProvider>
```
