"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ExpenseForm from "@/app/components/ExpenseForm";
import { signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="">
      <h1 className="text-4xl font-bold">
        Welcome to Expensely {session.user?.name?.split(" ")?.[0]}
      </h1>
      <p className="mt-4 text-lg">
        Your one-stop solution for expense tracking.
      </p>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
      <ExpenseForm />
    </main>
  );
}
