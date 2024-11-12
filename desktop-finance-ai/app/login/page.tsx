import { Metadata } from "next";
import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Efetue Login - Finance AI",
}

const LoginPage = async () => {

   // Se o usuário estiver logado, deve ser redirecionado para homepage
   const { userId } = await auth()
   if (userId) {
      redirect("/")
   }

   return (
      <div className="grid h-full grid-cols-2">
         {/* ESQUERDA - LOGIN */}
         <div className="flex flex-col h-full justify-center p-8 max-w-[550px] mx-auto">
            <Image src="/logo.svg" alt="Finance AI" width={173} height={39} className="mb-8" />
            <h1 className="text-4xl font-bold mb-3">Bem-Vindo</h1>
            <p className="text-muted-foreground mb-8"> A Finance AI é uma plataforma de gestão financeira que utiliza IA
               para monitorar suas movimentações, oferecer insights personalizados,
               facilitando o controle do seu orçamento. </p>
            <SignInButton>
               <Button variant="outline">
                  <LogInIcon className="mr-2" />
                  Fazer Login ou criar conta
               </Button>
            </SignInButton>
         </div>
         {/* DIREITA - IMAGEM */}
         <div className="relative h-full w-full">
            <Image src="/login.svg" alt="Faça login" fill className="object-cover" />
         </div>
      </div>
   );
}

export default LoginPage;