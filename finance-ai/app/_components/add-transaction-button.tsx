"use client"

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUp } from "lucide-react";

const AddTransactionButton = () => {

   // Para verificar se a operação ocorreu ou está ocorrendo.
   const [dialogIsOpen, setDiaLogIsOpen] = useState(false);

   return (
      <>
         <Button
            className="rounded-full font-bold"
            onClick={() => setDiaLogIsOpen(true)}>
            Adicionar Transação <ArrowDownUp />
         </Button>
         <UpsertTransactionDialog isOpen={dialogIsOpen} setIsOpen={setDiaLogIsOpen} />
      </>
   );
}

export default AddTransactionButton;