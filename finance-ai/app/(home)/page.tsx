import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";

export const metadata: Metadata = {
  title: "Resumo de Finanças - Finance AI",
}

interface HomeProps { //Recebe as propriedades do month
  searchParams: {
    month: string;
  }
}

const HomePage = async ({ searchParams: { month } }: HomeProps) => {

  // Se o usuário não estiver logado, deve ser redirecionado para homepage
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  //Valida o mês (Para tratar erros de digitação na URL)
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect("/?month=01")
  }

  const dashboard_data = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards
              month={month}
              {...dashboard_data}
            //balance={dashboard_data.balance}
            //investmentsTotal={dashboard_data.investmentsTotal}
            //expensesTotal={dashboard_data.expensesTotal}
            //depositsTotal={dashboard_data.depositsTotal}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionPieChart {...dashboard_data} />
              <ExpensesPerCategory expensesPerCategory={dashboard_data.totalExpensePerCategory} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;