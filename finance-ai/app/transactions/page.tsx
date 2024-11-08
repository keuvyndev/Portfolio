import { Metadata } from "next";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";

export const metadata: Metadata = {
  title: "Transações - Finance AI",
}

const TransactionPage = async () => {

  // acessar as transações do banco
  const transactions = await db.transaction.findMany({})

  return (
    <>
      <Navbar />
      <div className=" p-6 space-y-6">
        <div className="flex items-center justify-between">
          {/* TÍTULO */}
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
}

export default TransactionPage;