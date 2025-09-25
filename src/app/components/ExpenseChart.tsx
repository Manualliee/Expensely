import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ExpenseTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    payload: { [key: string]: string | number };
  }>;
}

function CustomTooltip({ active, payload }: ExpenseTooltipProps) {
  const isDarkMode =
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;

  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    const tooltipStyle = {
      background: isDarkMode ? "var(--color-dark-card)" : "var(--color-light-background)",
      color: isDarkMode ? "var(--color-dark-foreground)" : "var(--color-light-foreground)",
      border: isDarkMode ? "1px solid var(--color-dark-border)" : "1px solid var(--color-light-border)",
      padding: 8,
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    };
    return (
      <div style={tooltipStyle}>
        <strong>Date:</strong> {entry.date || "—"}
        <br />
        {Object.keys(entry)
          .filter(
            (key) =>
              !key.endsWith("_count") &&
              key !== "date" &&
              typeof entry[key] === "number" &&
              entry[key] > 0
          )
          .map((category) => (
            <div key={category}>
              <strong>
                {category.charAt(0).toUpperCase() + category.slice(1)}:
              </strong>{" "}
              ${entry[category]} ({entry[`${category}_count`]} expense
              {entry[`${category}_count`] === 1 ? "" : "s"})
            </div>
          ))}
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
  darkMode?: boolean;
}) {
  // chart data
  const dates = Array.from(new Set(data.map((exp) => exp.date))).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const categories = Array.from(new Set(data.map((exp) => exp.category)));

  const chartData = dates.map((date) => {
    const entry: { date: string } & { [cat: string]: number | string } = {
      date,
    };
    categories.forEach((cat) => {
      const filtered = data.filter(
        (exp) => exp.date === date && exp.category === cat
      );
      const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
      entry[cat] = total;
      entry[`${cat}_count`] = filtered.length;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        {categories.map((cat) => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={categoryColors[cat] || "#64748b"}
            dot={false}
            animationDuration={500}
            name={cat.charAt(0).toUpperCase() + cat.slice(1)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
