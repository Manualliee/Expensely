"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Lottie from "lottie-react";
import animation1 from "@/assets/lottie/Financeguru.json";

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
    <div className="bg-light-background text-light-foreground dark:bg-dark-background dark:text-dark-foreground min-h-screen flex items-center justify-center transition-colors">
      <div className="w-[70vw] h-[70vh] dark:bg-dark-card border-2 dark:border-dark-border rounded-4xl flex flex-row bg-light-card overflow-hidden">
        {/* Form container */}
        <div className="flex-1 h-full flex flex-col justify-center items-center p-2">
          <form
            className="w-full h-full flex flex-col justify-evenly items-center p-2"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-semibold mb-4">Login</h2>
            <div className="w-[80%] flex flex-col space-y-4">
              <input
                className="border p-2 rounded dark:border-dark-border placeholder-gray-400 dark:placeholder-gray-500 text-light-foreground dark:text-dark-foreground"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />

              <input
                className="border p-2 rounded dark:border-dark-border placeholder-gray-400 dark:placeholder-gray-500 text-light-foreground dark:text-dark-foreground"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button
              className="w-[50%] bg-light-accent dark:bg-dark-border dark:hover:bg-dark-accent dark:text-light-foreground p-2 rounded"
              type="submit"
            >
              Login
            </button>
            <p>
              First time here?{" "}
              <a
                href="/signup"
                className="text-light-accent dark:text-dark-border hover:text-dark-accent"
              >
                Create an account
              </a>
              .
            </p>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        {/* Animation container */}
        <div className="flex-1 h-full flex items-center justify-center">
          <Lottie
            animationData={animation1}
            loop={true}
            style={{ width: 400, height: 400 }}
          />
        </div>
      </div>
    </div>
  );
}
