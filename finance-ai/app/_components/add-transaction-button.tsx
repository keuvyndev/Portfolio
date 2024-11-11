"use client"

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUp } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface AddTransactionButtonProps {
   userCanAddTransaction?: boolean
}

const AddTransactionButton = ({ userCanAddTransaction }: AddTransactionButtonProps) => {

   // Para verificar se a operação ocorreu ou está ocorrendo.
   const [dialogIsOpen, setDiaLogIsOpen] = useState(false);

   return (
      <>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     className="rounded-full font-bold"
                     onClick={() => setDiaLogIsOpen(true)}
                     disabled={!userCanAddTransaction}>
                     Adicionar Transação <ArrowDownUp />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  {!userCanAddTransaction && "Você atingiu o limite de suas transações. Atualize o limite para criar transações ilimitadas."}
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <UpsertTransactionDialog isOpen={dialogIsOpen} setIsOpen={setDiaLogIsOpen} />
      </>
   );
}

export default AddTransactionButton;