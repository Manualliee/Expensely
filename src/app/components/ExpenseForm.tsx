import { useEffect, useState } from "react";
import ExpenseChart from "./ExpenseChart";
import getLocalToday from "../utils/getLocalToday";

export default function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const today = getLocalToday(); // "YYYY-MM-DD"
  const [date, setDate] = useState(today);
  const [category, setCategory] = useState("food");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<{ amount?: string; date?: string }>({});
  const [expense, setExpense] = useState<
    {
      id: string;
      date: string;
      amount: number;
      category: string;
      description: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpense(data))
      .catch((err) => console.error("Failed to fetch expenses:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { amount?: string; date?: string } = {};

    // Amount validation
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Amount is required and must be a positive number.";
    }

    // Date validation (compare as strings to avoid timezone issues)
    if (date < today) {
      newErrors.date = "Date cannot be in the past.";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          amount: Number(amount),
          category: category || "other",
          description: description || "No description",
        }),
      });

      if (res.ok) {
        fetch("/api/expenses")
          .then((res) => res.json())
          .then((data) => setExpense(data))
          .catch((err) => console.error("Failed to fetch expenses:", err));
        setAmount("");
        setDescription("");
        setDate(today);
        setCategory("food");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="expense-amount">Amount</label>
          <input
            type="number"
            inputMode="decimal"
            id="expense-amount"
            step="0.01"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numbers and up to two decimal places
              if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
                setAmount(value);
              }
            }}
            onKeyDown={(e) => {
              if (
                e.key === "e" ||
                e.key === "E" ||
                e.key === "+" ||
                e.key === "-"
              ) {
                e.preventDefault();
              }
            }}
          />
          {error.amount && <p className="text-red-500">{error.amount}</p>}
        </div>

        <label htmlFor="expense-category">Category</label>
        <select
          id="expense-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="expense-description">Description</label>
        <input
          type="text"
          value={description}
          id="expense-description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <label htmlFor="expense-date">Date</label>
          <input
            type="date"
            id="expense-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {error.date && <p className="text-red-500">{error.date}</p>}
        </div>

        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expense.map((exp) => (
          <li key={exp.id}>
            {exp.date} - ${exp.amount} - {exp.category} - {exp.description}
            <button
              onClick={async () => {
                const res = await fetch(`/api/expenses/${exp.id}`, {
                  method: "DELETE",
                });
                if (res.ok) {
                  fetch("/api/expenses")
                    .then((res) => res.json())
                    .then((data) => setExpense(data))
                    .catch((err) =>
                      console.error("Failed to fetch expenses:", err)
                    );
                } else {
                  console.error("Failed to delete expense:", await res.json());
                }
              }}
              style={{ marginLeft: "1em", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <ExpenseChart data={expense} />
    </div>
  );
}
