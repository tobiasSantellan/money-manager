"use client";
import React, { useEffect, useState } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import { db } from "@/utils/dbConfig";
import { Expensess } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

function Expenses() {
  useEffect(() => {
    getExpensesList();
  }, []);

  const [expensesList, setExpensesList] = useState([]);
  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expensess)
      .orderBy(desc(Expensess.id));
    setExpensesList(result);
    console.log(result);
  };
  return (
    <div className="mt-5 p-5">
      <h2 className="font-bold text-2xl">My Expenses</h2>
      <ExpenseListTable expensesList={expensesList} />
    </div>
  );
}

export default Expenses;
