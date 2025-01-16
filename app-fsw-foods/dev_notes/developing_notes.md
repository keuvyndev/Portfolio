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
npx shadcn@latest add avatar
npx shadcn@latest add sonner
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
npx prisma generate
npm run dev
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

6. Configure sua aplicação no Google Cloud para usar o OAuth:

Site: https://console.cloud.google.com/cloud-resource-manager?pli=1&inv=1&invt=Abi6yQ

6.1 Create Project
6.2 Clique em "SELECT PROJECT"
6.3 Vá em "API & Services/Credentials"
6.4 Clique em CREATE CREDENTIALS e depois em "OAuth Client ID".
6.5 Clique no botão "Configure Consent Screen".
6.6 Selecione o "User Type": "External" e clique em "Create"
6.7 Informe os dados:

- App Name;
- E-mail qualquer;
- Não inclua LOGO;
- Não inclua App Domain ou Authorized domains;
- Coloque um e-mail qualquer em developer contact informations;
- Clique em Save;
  6.8 Clique em "Save and Continue" novamente;
  6.9 Clique em "Save and Continue" novamente;

7. Clique em "Back to Dashboard";
   7.1 Agora no menu lateral escolha "OAuth consent screen" e na área "Publishing status", em "Testing" aperte o botão "PUBLISH APP"
8. No menu lateral escolha "Credentials", e depois em "+ CREATE CREDENTIALS", e escolha "OAuth client ID".
   8.1 Para "Application Type" marque "WebApplication".
   8.2 Preencha as demais informações:

- Name: Nome do aplicativo
- Authorized redirect URIs, inclua: http://localhost:3000/api/auth/callback/google
- Authorized JavaScript origins, inclua: http://localhost:3000

9. Copie as chaves e cole-as no seu .env com nome:

- GOOGLE_CLIENT_ID = "SUA CHAVE"
- GOOGLE_CLIENT_SECRET = "SUA CHAVE"

10. Adicione o botão de login do google em um componente:

```bash (qualquer componente)
"use client"

import {signIn} from 'next-auth/react'

return (
  <Button onClick={() => signIn}>Login</Button>
)
```

11. Use hook para tratar usuário logado:

Explicação: "useSession" obtem os dados do usuario e armazena em "data". Dentro do componente, valida se o usuario possui nome, se houver, renderiza um h1, caso contrário, o botão de Login.

```bash (qualquer componente)
"use client"

import { signIn, signOut, useSession } from 'next-auth/react'

const {data} = useSession()

return (
  {data?.user?.name ? (
    <div className="flex items-center gap-2">
        <h1>{data.user.name}</h1>
        <Button onClick={() => signOut()}>Sair</Button>
    </div>
  ) : (
    <Button onClick={() => signIn()}>Login</Button>
  )}
)
```

## 4. Incrementando ID do usuário no NextAuth.js

1. No arquivo "route.ts", inclue o "callbacks" da seguinte forma:

```bash
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";
import { useParams } from "next/navigation";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session ({session, user}){
      session.user = { ...session.user, id: user.id};
      return session
    }
  }
});
```

export { handler as GET, handler as POST };

````

2. Na raiz da aplicação (antes de app), crie um arquivo chamado "next-auth.d.ts" e cole o código abaixo:

```bash
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}
````

3. No "tsconfig.json", inclue o arquivo "next-auth.d.ts" na sessão de "include".

# CONFIGURAÇÕES PARA DEPLOY

1. Modificar o arquivo auth.ts. Deve incluir a secret, tal como:

```bash
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";
import { useParams } from "next/navigation";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session ({session, user}){
      session.user = { ...session.user, id: user.id};
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
```

2. Modificar o arquivo "package.json" para incluir a rotina do "npx prisma generate"

```bash
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prepare": "husky && prisma generate"
  },
}
```

3. Colocar o domínio da vercen no "Google Developer Console". Em API & Services/Credentials/OAuth 2.0 Client IDs e selecione o seu projeto.
   3.1 Em "Authorized JavaScript origins" inclua o domínio gerado no vercel. Exemplo (fullstackweek-foods-henna.vercel.app)
   3.2 Em "Authorized redirect URIs" inclua o domínio tal como: fullstackweek-foods-henna.vercel.app/api/auth/callback/google
