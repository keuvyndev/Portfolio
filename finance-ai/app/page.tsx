import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Resumo de Finanças - Finance AI",
}

const HomePage = async () => {

  // Se o usuário não estiver logado, deve ser redirecionado para homepage
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  return (
    <>
      <Navbar />
      <div className=" p-6 space-y-6">
        <h1>Esta á minha página de Dashboard.</h1>
      </div>
    </>
  );
}

export default HomePage;