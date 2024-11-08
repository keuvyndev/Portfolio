import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummeryCard from "./summery-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
   month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {

   const where = { // Inclui validação do mês.
      date: {
         gte: new Date(`2024-${month}-01`),
         lt: new Date(`2024-${month}-31`),
      },
   }

   const depositsTotal = Number((await db.transaction.aggregate({ // Retorna o somátorio de depósitos encontrados no banco
      where: { ...where, type: "DEPOSIT" },
      _sum: { amount: true },
   }))._sum?.amount);

   const investmentsTotal = Number((await db.transaction.aggregate({ // Retorna o somátorio de investimentos encontrados no banco
      where: { ...where, type: "INVESTMENT" },
      _sum: { amount: true },
   }))._sum?.amount);

   const expensesTotal = Number((await db.transaction.aggregate({ // Retorna o somátorio de gastos encontrados no banco
      where: { ...where, type: "EXPENSE" },
      _sum: { amount: true },
   }))._sum?.amount);

   const balance = depositsTotal - expensesTotal - investmentsTotal;

   return (
      <div className="space-y-6">
         {/* PRIMEIRO CARD */}
         <SummeryCard
            icon={<WalletIcon size={16} />}
            title={"Saldo"}
            amount={balance}
            size="large"
         />

         {/* OUTROS CARDS */}
         <div className="grid grid-cols-3 gap-6">
            <SummeryCard
               icon={<PiggyBankIcon size={16} />}
               title={"Investido"}
               amount={investmentsTotal}
            />

            <SummeryCard
               icon={<TrendingDownIcon className="text-primary" size={16} />}
               title={"Receita"}
               amount={expensesTotal}
            />

            <SummeryCard
               icon={<TrendingUpIcon className="text-red-500" size={16} />}
               title={"Despesas"}
               amount={depositsTotal}
            />
         </div>
      </div >
   );
}

export default SummaryCards;