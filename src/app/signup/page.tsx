"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Lottie from "lottie-react";
import animation2 from "@/assets/lottie/Revenue.json";

export default function SignupPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check for empty fields
        if (!firstName || !lastName || !email || !password) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: `${firstName} ${lastName}`,
                email,
                password
            }),
        });

        if (res.ok) {
            // Automatically log in the user after successful registration
            const loginRes = await signIn("credentials", {
                redirect: false,
                email,
                password
            });
            if (loginRes?.ok && !loginRes.error) {
                router.push("/");
            } else {
                setError("Registration succeeded, but login failed. Please try logging in.");
            }
        } else {
            const data = await res.json();
            setError(data.error || "Registration failed");
        }
    };
    return (
        <div className="dark:bg-dark-background dark:text-dark-foreground min-h-screen flex items-center justify-center transition-colors bg-light-background text-light-foreground">
            <div className="w-[80vw] h-[80vh] dark:bg-dark-card border-2 dark:border-dark-border rounded-4xl flex flex-row overflow-hidden">
                <div className="flex-1 h-full flex flex-col justify-center items-center p-2">
                    <form className="w-full h-full flex flex-col justify-evenly items-center p-2" onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
                        <div className="flex flex-col w-[80%]">
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} name="first-name" id="first-name" placeholder="Jane" className="border p-2 rounded mb-4 dark:border-dark-border placeholder-gray-400 dark:placeholder-gray-500 text-light-foreground dark:text-dark-foreground" />
                        </div>
                        <div className="flex flex-col w-[80%]">
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} name="last-name" id="last-name" placeholder="Doe" className="border p-2 rounded mb-4 dark:border-dark-border placeholder-gray-400 dark:placeholder-gray-500 text-light-foreground dark:text-dark-foreground" />
                        </div>
                        <div className="flex flex-col w-[80%]">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" placeholder="email@example.com" className="border p-2 rounded mb-4 dark:border-dark-border placeholder-gray-400 dark:placeholder-gray-500 text-light-foreground dark:text-dark-foreground" />
                        </div>
                        <div className="flex flex-col w-[80%]">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" placeholder="Password" className="border p-2 rounded mb-4 dark:border-dark-border placeholder-gray-400 dark:placeholder-gray-500 text-light-foreground dark:text-dark-foreground" />
                        </div>
                        <div className="flex flex-col w-[80%]">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="Confirm Password" className="border p-2 rounded mb-4 dark:border-dark-border placeholder-gray-400 dark:placeholder-gray-500 text-light-foreground dark:text-dark-foreground" />
                        </div>
                        <button type="submit" className="w-[50%] bg-light-accent dark:bg-dark-border dark:hover:bg-dark-accent dark:text-light-foreground p-2 rounded">Create Account</button>
                        {error && <p className="text-red-500">{error}</p>}
                        <p className="mt-4">
                            Already have an account? <a href="/login" className="text-light-accent dark:text-dark-border hover:text-dark-accent">Log in</a>.
                        </p>
                    </form>
                </div>
                <div className="flex-1 h-full flex items-center justify-center">
                    <Lottie animationData={animation2} loop={true} style={{ width: 400, height: 400 }} />
                </div>
            </div>
        </div>
    )
}