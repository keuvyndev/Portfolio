"use client"

import { Transaction } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import TranscationTypeBadge from "../_components/type-badge"

export const transactionColumns: ColumnDef<Transaction>[] = [
   {
      accessorKey: "name",
      header: "Nome",
   },
   {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row: { original: transaction } }) => {
         <TranscationTypeBadge transaction={transaction} />
      },
   },
   {
      accessorKey: "category",
      header: "Categoria",
   },
   {
      accessorKey: "paymentMethod",
      header: "Método de pagamento",
   },
   {
      accessorKey: "date",
      header: "Data",
   },
   {
      accessorKey: "amount",
      header: "Valor",
   },
   {
      accessorKey: "actions",
      header: "",
   },
]