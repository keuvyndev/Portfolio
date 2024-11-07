import { Metadata } from "next";
import { Button } from "../_components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";

export const metadata: Metadata = {
  title: "Transação - Finance AI",
}

const TransactionPage = async () => {

  // acessar as transações do banco
  const transactions = await db.transaction.findMany({})

  return (
    <>
      <div className=" p-6 space-y-6">
        <div className="flex items-center justify-between">
          {/* TÍTULO */}
          <h1 className="text-2xl font-bold">Transações</h1>
          <Button className="rounded-full font-bold"> Adicionar Transação <ArrowDownUp /></Button>
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
}

export default TransactionPage;