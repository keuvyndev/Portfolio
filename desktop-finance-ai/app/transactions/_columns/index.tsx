"use client"

import { Transaction } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { TRANSACTION_CATEGORY_LABELS, TRANSACTION_PAYMENT_METHOD_LABELS } from "@/app/_constants/transactions"
import EditTransactionButton from "../_components/edit-transaction-button"
import TransactionTypeBadge from "../_components/type-badge"
import DeleteTransactionButton from "../_components/delete-transaction-button"

export const transactionColumns: ColumnDef<Transaction>[] = [
   {
      accessorKey: "indice",
      header: "Índice",
      cell: (index) => (
         <p>{((Number(index.row.id)) + 1).toString()}</p>
      ),
   },
   {
      accessorKey: "name",
      header: "Nome",
   },
   {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row: { original: transaction } }) => (
         <TransactionTypeBadge transaction={transaction} />
      ),
   },
   {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row: { original: transaction } }) =>
         TRANSACTION_CATEGORY_LABELS[transaction.category],
   },
   {
      accessorKey: "paymentMethod",
      header: "Método de pagamento",
      cell: ({ row: { original: transaction } }) =>
         TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
   },
   {
      accessorKey: "date",
      header: "Data",
      cell: ({ row: { original: transaction } }) =>
         new Date(transaction.date).toLocaleDateString("pt-Br", {
            day: "2-digit",
            month: "long",
            year: "numeric",
         }),
   },
   {
      accessorKey: "amount",
      header: "Valor",
      cell: ({ row: { original: transaction } }) =>
         new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
         }).format(Number(transaction.amount)),
   },
   {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row: { original: transaction } }) => { // transaction captura as informações da linha.
         return (
            <div className="space-x1">
               <EditTransactionButton transaction={transaction} />
               <DeleteTransactionButton transactionId={transaction.id} />
            </div>
         );
      },
   },
]