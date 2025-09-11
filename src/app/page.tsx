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
      <h1 className="text-4xl font-bold">Welcome to Expensely</h1>
      <p className="mt-4 text-lg">Your one-stop solution for expense tracking.</p>
      {/* Your dashboard or main app content here */}
      <h1>Welcome, {session.user?.email}!</h1>
    </main>
  );
}
