import { Metadata } from "next";
import Navbar from "../_components/navbar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";

export const metadata: Metadata = {
  title: "Assinatura - Finance AI",
}


const SubscriptionPage = async () => {

  // Se o usuário não estiver logado, deve ser redirecionado para homepage
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const user = await (await clerkClient()).users.getUser(userId)
  const hasPremiumPlano = user.publicMetadata.subscriptionPlan == "premium";

  return (
    <>
      <Navbar />
      <div className=" p-6 space-y-6">
        <h1 className="font-bold text-2xl">Assinatura</h1>
        <div className="flex gap-6">
          {/* PLANO FREE */}
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              {!hasPremiumPlano && (
                <Badge className="absolute left-16 top-12 bg-primary/10 text-primary">Ativo</Badge>
              )}
              < h2 className="font-semibold text-center text-2xl">Plano Básico</h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="4-xl">R$</span>
                <span className="font-semibold text-6xl">0</span>
                <span className="text-muted-foreground text-2xl">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 10 transações por mês (7/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          {/* PLANO PRO */}
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              {hasPremiumPlano && (
                <Badge className="absolute left-16 top-12 bg-primary/10 text-primary">Ativo</Badge>
              )}
              <h2 className="font-semibold text-center text-2xl">Plano Premium</h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="4-xl">R$</span>
                <span className="font-semibold text-6xl">19,90</span>
                <span className="text-muted-foreground text-2xl">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div >
    </>
  );
}

export default SubscriptionPage;