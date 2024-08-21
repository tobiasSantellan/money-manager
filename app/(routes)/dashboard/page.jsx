"use client";
import { useUser } from "@clerk/nextjs";
import CardInfo from "../_components/CardInfo";
import { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expensess } from "@/utils/schema";
import BarChartDashboard from "../_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expensess.amount})`.mapWith(Number),
        totalItem: sql`count(${Expensess.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expensess, eq(Budgets.id, Expensess.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
  };

  // used to get all expenses belong to users
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expensess.id,
        name: Expensess.name,
        amount: Expensess.amount,
        createdAt: Expensess.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expensess, eq(Budgets.id, Expensess.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expensess.id));
    setExpensesList(result);
    console.log(result);
  };
  return (
    <div className="p-8">
      <h2 className="font-bold text-2xl">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Here's the breakdown of your money. Let's help you reach your financial
        goals.
      </p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets </h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
