"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expensess } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";

function Expenses({ params }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expensess.amount})`.mapWith(Number),
        totalItem: sql`count(${Expensess.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expensess, eq(Budgets.id, Expensess.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);
    setBudgetInfo(result[0]);
    console.log(result);
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-primary">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        <BudgetItem budget={budgetInfo} />
      </div>
    </div>
  );
}

export default Expenses;
