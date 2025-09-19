"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok && !res.error) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="w-90 h-95 flex flex-col justify-evenly items-center p-2 border rounded-4xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <div className="w-[80%] flex flex-col space-y-4">
          <input
            className="border p-2 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            className="border p-2 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button
          className="w-[50%] bg-blue-500 text-white p-2 rounded"
          type="submit"
        >
          Login
        </button>
        <p>
          First time here?{" "}
          <a href="/signup" className="text-blue-500">
            Create an account
          </a>
          .
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
