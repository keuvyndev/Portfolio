import { Metadata } from "next";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransactions } from "../_data/can-user-add-transactions";

export const metadata: Metadata = {
  title: "Transações - Finance AI",
}

const TransactionPage = async () => {

  // Se o usuário não estiver logado, deve ser redirecionado para homepage
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  // acessar as transações do banco: retorna somente as transações do usuário logado.
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    }
  });

  const canUserAddTransaction = await canUserAddTransactions();

  return (
    <>
      <Navbar />
      <div className=" p-6 space-y-6">
        <div className="flex items-center justify-between">
          {/* TÍTULO */}
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={canUserAddTransaction} />
        </div>
        {/* JSON.parse(JSON.stringify(transactions) foi usado para retirar o warning do decimal */}
        <DataTable columns={transactionColumns} data={JSON.parse(JSON.stringify(transactions))} />
      </div>
    </>
  );
}

export default TransactionPage;