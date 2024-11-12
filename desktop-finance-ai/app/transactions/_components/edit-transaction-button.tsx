"use client"

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {

   transaction: Transaction,
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {

   // Para verificar se a operação ocorreu ou está ocorrendo.
   const [dialogIsOpen, setDiaLogIsOpen] = useState(false);

   return (
      <>
         <Button variant="ghost" onClick={() => setDiaLogIsOpen(true)}>
            <PencilIcon size="icon" className="text-muted-foreground" />
         </Button>
         <UpsertTransactionDialog
            isOpen={dialogIsOpen}
            setIsOpen={setDiaLogIsOpen}
            defaultValues={{
               // Passa os dados de transaction mas converte o dado amount.
               ...transaction,
               amount: Number(transaction.amount),
            }}
            transactionId={transaction.id}
         />
      </>
   );
}

export default EditTransactionButton;