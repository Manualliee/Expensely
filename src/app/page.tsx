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
    <main className="bg-light-background text-light-foreground dark:bg-dark-background dark:text-dark-foreground min-h-screen flex flex-col items-center justify-center transition-colors p-4">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome to Expensely {session.user?.name?.split(" ")?.[0]}!
        </h1>
        <p className="mt-4 text-lg">
          Your one-stop solution for expense tracking.
        </p>
        <button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
      </div>
      <ExpenseForm />
    </main>
  );
}
