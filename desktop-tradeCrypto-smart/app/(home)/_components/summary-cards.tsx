import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummeryCard from "./summery-card";

interface SummaryCardsProps {
   month: string
   balance: number;
   depositsTotal: number;
   investmentsTotal: number,
   expensesTotal: number,
   userCanAddTransactions?: boolean,
}

const SummaryCards = async ({ userCanAddTransactions, balance, depositsTotal, investmentsTotal, expensesTotal }: SummaryCardsProps) => {


   return (
      <div className="space-y-6">
         {/* PRIMEIRO CARD */}
         <SummeryCard
            icon={<WalletIcon size={16} />}
            title={"Saldo"}
            amount={balance}
            size="large"
            typebg="high-gray"
            userCanAddTransactions={userCanAddTransactions}
         />

         {/* OUTROS CARDS */}
         <div className="grid grid-cols-3 gap-6">
            <SummeryCard
               icon={<PiggyBankIcon size={16} />}
               title={"Investido"}
               amount={investmentsTotal}
               typebg="medium-gray"
            />

            <SummeryCard
               icon={<TrendingDownIcon className="text-primary" size={16} />}
               title={"Receita"}
               amount={depositsTotal}
            />

            <SummeryCard
               icon={<TrendingUpIcon className="text-red-500" size={16} />}
               title={"Despesas"}
               amount={expensesTotal}
            />
         </div>
      </div >
   );
}

export default SummaryCards;