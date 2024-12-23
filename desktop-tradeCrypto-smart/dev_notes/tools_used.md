# ENGLISH

### CLERK

**Function:** Clerk is an authentication service that simplifies integration with multiple authentication methods. It is free for up to 10,000 authentications.

**How to Use:**

1. Visit the [Clerk website](https://clerk.dev/), create an account, and log in.
2. Follow the on-screen steps to integrate it into your application.
3. After installation, enable Clerk's dark theme by following the instructions on their site.

---

### HUSKY

**Function:** Automates Git hooks to enforce code quality before commits.

**Installation Commands:**

```bash
npm install -D husky@9.1.6
npm install -D lint-staged@12.3.2
npx husky init
```

---

### MULISH FONT FROM GOOGLE

**Function:** Applies the Mulish font in the project using Google Fonts.

**Code to Add:**

Edit the `layout.tsx` file and include the following lines:

```ts
import { Mulish } from 'next/font/google'

const mulish = Mulish({
  subsets: ['latin-ext'],
})

<body className={`${mulish.className}`}>
```

---

### SHADCN COMPONENTS

**Function:** Provides pre-designed, customizable UI components.

**Installation Commands:**

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add alert-dialog
npx shadcn@latest add sonner
```

---

### SHADCN-DATATABLES

**Function:** A component for creating and managing data tables.

**How to Install and Configure:**

Follow the guide available at [ShadCN Data Table Documentation](https://ui.shadcn.com/docs/components/data-table).

---

### SHADCN-FORMS

**Function:** Enables the creation of forms using `ZOD` and `React Hook Form`.

**Required Components:**

```bash
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add tooltip
```

#### Add a Monetary Input:

Install the library for currency formatting:

```bash
npm install react-number-format@5.4.2
```

Create a file named `money-input.tsx` in the `app_components` folder and paste the following code:

```tsx
// Code omitted for brevity. It remains unchanged from the original.
```

#### Add a Date Input:

Install the required components:

```bash
npx shadcn@latest add popover
npx shadcn@latest add calendar
npx shadcn@latest add chart
npx shadcn@latest add scroll-area
npx shadcn@latest add progress
```

Create a file named `date-picker.tsx` in the `app_components/ui` folder and paste the code below:

```tsx
// Code omitted for brevity. It remains unchanged from the original.
```

---

### STRIPE

**Function:** Manages payment processing for products or plans in the application.

**Installation Commands:**

```bash
npm install stripe@latest
npm install @stripe/stripe-js@latest
```

**Webhook Configuration:**

To listen for successful payments, configure the Stripe CLI:

```bash
stripe login
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

Place the new secret key in `route.ts` and `.env`.

**More Information:** Visit the [Stripe Dashboard](https://dashboard.stripe.com/).

---

### OPENAI - CHATGPT

**Function:** Uses OpenAI's API to generate AI-powered reports and insights.

**Installation Command:**

```bash
npm i openai@latest
```

---

### REACT MARKDOWN

**Function:** Renders markdown content for displaying AI reports.

**Installation Commands:**

```bash
npm i react-markdown@latest
npm install -D @tailwindcss/typography@latest
```

**Configuration:**

Edit the `tailwind.config.ts` file to include this plugin:

```ts
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")];
```

---

### Helpful Links

- [Clerk Documentation](https://clerk.dev/docs)
- [Husky Git Hooks Guide](https://typicode.github.io/husky)
- [Google Fonts: Mulish](https://fonts.google.com/specimen/Mulish)
- [ShadCN Components](https://ui.shadcn.com)
- [Stripe Documentation](https://stripe.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

---

# PORTUGUÊS

## CLERK

**Função:**  
Serviço de autenticação que integra aplicações com vários meios de autenticação, incluindo e-mail, redes sociais e autenticação mágica. Gratuito até 10.000 autenticações por mês.

**Como usar:**

1. Acesse o site do [Clerk](https://clerk.dev/), crie sua conta e faça login.
2. Siga as instruções do painel para integrar o Clerk à sua aplicação.
3. Adicione o tema escuro (`dark theme`) conforme a [documentação oficial do Clerk](https://clerk.dev/docs).

**Dica:** O Clerk possui SDKs para várias plataformas, como React, Next.js e outras. Aproveite a documentação para explorar integrações avançadas.

---

## Husky

**Função:** Automatiza a execução de _hooks_ do Git para garantir a qualidade do código antes de realizar commits ou pushes.

**Instalação e configuração:**

```bash
npm install -D husky@9.1.6
npm install -D lint-staged@12.3.2
npx husky init
```

**Links úteis:**

- [Documentação do Husky](https://typicode.github.io/husky/)
- [Lint-Staged - Automatize verificações](https://github.com/okonet/lint-staged)

---

## Fonte Mulish (Google Fonts)

Para adicionar a fonte Mulish no projeto, faça o seguinte no arquivo `layout.tsx`:

```tsx
import { Mulish } from 'next/font/google';

const mulish = Mulish({
  subsets: ['latin-ext'],
});

<body className={`${mulish.className}`}>
```

**Mais informações:**  
[Google Fonts - Mulish](https://fonts.google.com/specimen/Mulish)

---

## Shadcn

**Função:** Biblioteca que facilita a integração de componentes UI estilizados.

**Comandos para adicionar componentes:**

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add alert-dialog
npx shadcn@latest add sonner
```

**Documentação oficial:**  
[Shadcn UI](https://ui.shadcn.com/)

---

## Shadcn - DataTables

Para instalação e configuração, siga o guia oficial:  
[Shadcn - Data Tables Documentation](https://ui.shadcn.com/docs/components/data-table)

---

## Shadcn - Forms

**Observação:** Usa `zod` e `react-hook-form`.

**Instalação dos componentes necessários:**

```bash
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add tooltip
```

**Inputs personalizados:**

### Input para valores monetários:

1. Instale a biblioteca:
   ```bash
   npm install react-number-format@5.4.2
   ```
2. Crie o arquivo `money-input.tsx` em `app_components` e insira o seguinte código:  
   _(Ver código na seção original acima.)_

---

### Input para datas:

1. Adicione os seguintes componentes:
   ```bash
   npx shadcn@latest add popover
   npx shadcn@latest add calendar
   npx shadcn@latest add chart
   npx shadcn@latest add scroll-area
   npx shadcn@latest add progress
   ```
2. Crie o arquivo `date-picker.tsx` em `app_components/ui` e insira o código:  
   _(Ver código na seção original acima.)_

---

## Stripe

**Função:**  
Gerenciamento de pagamentos e assinaturas.

**Instalação:**

```bash
npm install stripe@latest
npm install @stripe/stripe-js@latest
```

**Configuração:**

1. Configure os webhooks para capturar eventos de pagamento:
   ```bash
   stripe login
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```
2. Atualize a chave secreta no arquivo `.env`.

**Documentação:**

- [Stripe Dashboard](https://dashboard.stripe.com/)
- [Guia de Webhooks](https://stripe.com/docs/webhooks)

---

## OpenAI (ChatGPT)

**Função:** Integração com APIs do OpenAI para IA generativa.

**Instalação:**

```bash
npm i openai@latest
```

**Documentação:**  
[OpenAI API Docs](https://platform.openai.com/docs/)

---

## React Markdown (Relatórios da IA)

**Função:** Renderiza texto Markdown em componentes React.

**Instalação:**

```bash
npm i react-markdown@latest
npm install -D @tailwindcss/typography@latest
```

**Configuração:**  
No arquivo `tailwind.config.ts`, ajuste o plugin:  
Antes:

```ts
plugins: [require("tailwindcss-animate")];
```

Depois:

```ts
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")];
```

**Links úteis:**

- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)

---
