import { db } from "@/utils/dbConfig";
import { Expensess } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expenses) => {
    const result = await db
      .delete(Expensess)
      .where(eq(Expensess.id, expenses.id))
      .returning();
    if (result) {
      toast("Expense Deleted");
      refreshData();
    }
  };
  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div className="grid grid-cols-4 bg-slate-200 p-2">
          <h2 className="text-sm">{expenses?.name}</h2>
          <h2 className="text-sm">{expenses?.amount}</h2>
          <h2 className="text-sm">{expenses?.createdAt}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer text-sm"
              onClick={() => deleteExpense(expenses)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
