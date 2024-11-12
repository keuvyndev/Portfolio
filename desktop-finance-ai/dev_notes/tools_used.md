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
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add alert-dialog
npx shadcn@latest add sonner
```

## Shadcn-DataTables

Para instalação e configuração é necessário seguir o guia dispoto no site: https://ui.shadcn.com/docs/components/data-table

## Shadcn-Forms

Observação: Utiliza ZOD e React-form

- Requer:

```bash
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add tooltip
```

### Adicione um input para valores monetários:

```bash
npm install react-number-format@5.4.2
```

Crie um arquivo chamado "money-input.tsx" na pasta "app_components" e cole o código abaixo:

```bash
import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { Input, InputProps } from "@/app/_components/ui/input";

export const MoneyInput = forwardRef(
   (
      props: NumericFormatProps<InputProps>,
      ref: React.ForwardedRef<HTMLInputElement>,
   ) => {
      return (
         <NumericFormat
            {...props}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            allowNegative={false}
            customInput={Input}
            getInputRef={ref}
         />
      );
   },
);

MoneyInput.displayName = "MoneyInput";
```

### Adicione um input para datas:

```bash
npx shadcn@latest add popover
npx shadcn@latest add calendar
npx shadcn@latest add chart
npx shadcn@latest add scroll-area
npx shadcn@latest add progress
```

Crie um arquivo chamado "date-picker.tsx" na pasta "app_components\ui" e cole o código abaixo:

```bash
"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/app/_lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "./popover"
import { SelectSingleEventHandler } from "react-day-picker"

interface DatePickerProps {
   value?: Date;
   onChange?: SelectSingleEventHandler;
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant={"outline"}
               className={cn(
                  "w-full justify-start text-left font-normal",
                  !value && "text-muted-foreground"
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4" />
               {value ? new Date(value).toLocaleDateString("pt-Br", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
               }) : <span>Selecione uma data...</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar
               mode="single"
               selected={value}
               onSelect={onChange}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   )
}
```

# Stripe

Função: Obter pagamento de produtos (planos da aplicação)

```bash
npm install stripe@latest
npm install @stripe/stripe-js@latest
```

- Need to use webhooks (Destiny Events) to receive sucess payments. To this, config Stripe CLI and execute below codes:

```bash
stripe login
```

Now, create route with file "route.ts" in "app/api/webhooks/Stripe", and put the below code:

Now execute this commands:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

Put the new secret key in file route.ts and .env

More informations in website: https://dashboard.stripe.com/

# OpenAI - ChatGPT

Instale a lib com o código abaixo:

```bash
npm i openai@latest
```

# React Markdown (Para apresentar o relatório da IA)

Instale a lib com o código abaixo:

```bash
npm i react-markdown@latest
npm install -D @tailwindcss/typography@latest
```

Após instalar, abre o arquivo "tailwind.config.ts" e deixe esta linha:

```bash
  plugins: [require("tailwindcss-animate")
```

Assim:

```bash
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
```