"use client";
import { useUser } from "@clerk/nextjs";

function Dashboard() {
  const { user } = useUser();
  return (
    <div className="p-8">
      <h2 className="font-bold text-2xl">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Here's the breakdown of your finances. Let's help you reach your
        financial goals.
      </p>
    </div>
  );
}

export default Dashboard;
