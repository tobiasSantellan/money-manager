"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon);
    setName(budgetInfo?.name);
    setAmount(budgetInfo?.amount);
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast("Budget Updated");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  {" "}
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-2">Budget Name</h2>
                  <Input
                    placeholder="e.g Home Taxes"
                    className="outline-none"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={budgetInfo?.name}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-2">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g 5000$"
                    className="outline-none"
                    onChange={(e) => setAmount(e.target.value)}
                    defaultValue={budgetInfo?.amount}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
                className="mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
