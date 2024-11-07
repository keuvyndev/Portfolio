## CLERK

Função: É um serviço de autenticação que permite integrar sua aplicações de forma simplificada com vários meios de autenticação. É gratúito até 10.000 autenticações.

Como usar:

1. Vá até o site do Clerk, crie sua conta e efetue login.
2. Siga os passos mostrados na tela para implementar.
3. Após a instalação, incluir o darktheme do clerk seguindo as orientações do site.

## Husky

```bash
npm install -D husky@9.1.6
npm install -D lint-staged@12.3.2
npx husky init
```

## Mulish font from google

Abra o arquivo layout.tsx as linhas de código abaixo:

```bash
import { Inter } from 'next/font/google'
const mulish = Mulish({
  subsets: ['latin-ext'],
})
<body className={`${mulish.className}>
```

## Shadcn

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
```

## Shadcn-DataTables

Para instalação e configuração é necessário seguir o guia dispoto no site: https://ui.shadcn.com/docs/components/data-table
