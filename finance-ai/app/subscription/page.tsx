import { Metadata } from "next";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Assinatura - Finance AI",
}


const SubscriptionPage = async () => {

  // Se o usuário não estiver logado, deve ser redirecionado para homepage
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  return (
    <>
      <Navbar />
      <div className=" p-6 space-y-6">
        <h1>Esta á minha página de assinatura.</h1>
      </div>
    </>
  );
}

export default SubscriptionPage;