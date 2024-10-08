"use client";
import { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expensess } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  /**
   * Retrieves a list of budgets with aggregated expense data. This function executes a database query to fetch all budgets along with
    aggregated expense information for each budget, such as total spending and the number of expense items.
    **Returns:**
   * An array of objects, where each object represents a budget and includes:
   * All properties of the budget.
   * `totalSpend`: The total spending associated with the budget.
   * `totalItem`: The total number of items associated with the budget.
   **/
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
    console.log(result);
  };
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList.length > 0
          ? budgetList.map((budget, index) => <BudgetItem budget={budget} />)
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lf h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
