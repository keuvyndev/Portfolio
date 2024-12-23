import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummeryCardProps {
   icon: ReactNode;
   title: string;
   amount: number;
   size?: "small" | "large";
   typebg?: "high-gray" | "medium-gray" | "";
   userCanAddTransactions?: boolean;
}

const SummeryCard = async ({ icon, title, amount, size = "small", typebg = "", userCanAddTransactions }: SummeryCardProps) => {

   return (
      <>
         <Card
            className={`${typebg === "high-gray"
               ? "bg-white bg-opacity-10"
               : typebg === "medium-gray"
                  ? "bg-[#1F1F21]"
                  : ""
               }`}
         >
            <CardHeader className="flex-row items-center gap-4">
               {icon}
               <p
                  className={`${size === "small"}`
                     ? 'text-muted-foreground'
                     : 'text-white opacity-70'}
               >
                  {title}
               </p>
            </CardHeader>
            <CardContent className="flex justify-between">
               <p className={`font-bold ${size === "small"}`
                  ? 'text-2xl'
                  : 'text-4xl'
               }>
                  {Intl.NumberFormat("pt-BR",
                     {
                        style: "currency",
                        currency: "BRL",
                     }).format(amount)
                  }</p>

               {size === 'large' && (
                  <AddTransactionButton userCanAddTransaction={userCanAddTransactions} />
               )}
            </CardContent>
         </Card>
      </>
   );
}

export default SummeryCard;