import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TranscationTypeBadgeProps {
   transaction: Transaction,
}


const TranscationTypeBadge = ({ transaction }: TranscationTypeBadgeProps) => {

   const render = () => {
      switch (transaction.type) {
         case TransactionType.DEPOSIT:
            return (
               <Badge className="bg-muted text-primary hover:bg-muted font-bold">
                  <CircleIcon className="fill-primary mr-2" size={10} />
                  Ganho
               </Badge>
            );
         case TransactionType.EXPENSE:
            return (
               <Badge className="font-bold text-danger bg-danger bg-opacity-10 hover:bg-danger hover:bg-opacity-10">
                  <CircleIcon className="fill-danger mr-2" size={10} />
                  Gasto
               </Badge>
            );
         case TransactionType.INVESTMENT:
            return (
               <Badge className="font-bold text-white bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-10">
                  <CircleIcon className="fill-white mr-2" size={10} />
                  Investimento
               </Badge>
            );
      }
   }

   return <>{render}</>
};

export default TranscationTypeBadge;