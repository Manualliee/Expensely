import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ExpenseTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      date: string;
      amount: number;
      category: string;
      description: string;
    };
  }>;
  label?: string | number;
}

function CustomTooltip({ active, payload }: ExpenseTooltipProps) {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: 8 }}>
        <strong>Date:</strong> {entry.date || "—"}
        <br />
        <strong>Amount:</strong> ${entry.amount}
        <br />
        <strong>Category:</strong> {entry.category}
        <br />
        <strong>Description:</strong> {entry.description || "—"}
      </div>
    );
  }
  return null;
}

const categoryColors: Record<string, string> = {
  food: "#4f46e5",
  transportation: "#22c55e",
  utilities: "#f59e42",
  entertainment: "#eab308",
  health: "#f43f5e",
  other: "#64748b",
};

export default function ExpenseChart({
  data,
}: {
  data: {
    id: string;
    date: string;
    amount: number;
    category: string;
    description: string;
  }[];
}) {
  const chartData = data.map((expense, idx) => ({ ...expense, idx }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="idx"
          tickFormatter={(_, index) => chartData[index].date}
        />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Bar dataKey="amount" animationDuration={800}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={categoryColors[entry.category] || "#64748b"} 
            />
          ))}
        </Bar>
       
      </BarChart>
    </ResponsiveContainer>
  );
}
