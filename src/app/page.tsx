import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="">
      <h1 className="text-4xl font-bold">Welcome to Expensely {session.user?.name?.split(" ")?.[0]}</h1>
      <p className="mt-4 text-lg">Your one-stop solution for expense tracking.</p>
      
    </main>
  );
}
