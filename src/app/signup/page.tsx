"use client";
import { useState } from "react";

export default function SignupPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-[80%] h-150 flex flex-col justify-evenly items-center p-2 border rounded-4xl" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" name="first-name" id="first-name" placeholder="Jane" className="border p-2 rounded mb-4" />
                </div>
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" name="last-name" id="last-name" placeholder="Doe" className="border p-2 rounded mb-4" />
                </div>
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="email@example.com" className="border p-2 rounded mb-4" />
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