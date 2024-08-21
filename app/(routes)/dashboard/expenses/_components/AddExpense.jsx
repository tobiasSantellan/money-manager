"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expensess } from "@/utils/schema";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const addNewExpense = async () => {
    const result = await db
      .insert(Expensess)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });

    console.log(result);
    if (result) {
      refreshData();
      toast("New Expense Added");
      // Clear input fields
      setAmount("");
      setName("");
    }
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-2">Expense Name</h2>
        <Input
          placeholder="e.g Bedroom Decor"
          className="outline-none"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-2">Expense Amount</h2>
        <Input
          placeholder="e.g 1000"
          className="outline-none"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-5 w-full"
        onClick={() => addNewExpense()}
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
