"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-[80%] h-150 flex flex-col justify-evenly items-center p-2 border rounded-4xl" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} name="first-name" id="first-name" placeholder="Jane" className="border p-2 rounded mb-4" />
                </div>
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} name="last-name" id="last-name" placeholder="Doe" className="border p-2 rounded mb-4" />
                </div>
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" placeholder="email@example.com" className="border p-2 rounded mb-4" />
                </div>
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" placeholder="Password" className="border p-2 rounded mb-4" />
                </div>
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="Confirm Password" className="border p-2 rounded mb-4" />
                </div>
                <button type="submit" className="w-[50%] bg-blue-500 text-white p-2 rounded">Create Account</button>
                {error && <p className="text-red-500">{error}</p>}
                <p className="mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Log in</a>.
                </p>
            </form>
        </div>
    )
}