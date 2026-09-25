import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { week: "W1", hours: 38, tasks: 22 },
  { week: "W2", hours: 42, tasks: 28 },
  { week: "W3", hours: 32, tasks: 18 },
  { week: "W4", hours: 45, tasks: 34 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-bold text-gray-900">{label}</p>
      <p className="text-indigo-600 font-medium mt-1">
        Hours : {payload[0]?.value}
      </p>
      <p className="text-cyan-500 font-medium">Tasks : {payload[1]?.value}</p>
    </div>
  );
}

function WeeklyProductivityChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 min-w-0">
      <h3 className="font-bold text-gray-900">Weekly Productivity</h3>
      <p className="text-sm text-gray-400">Hours worked &amp; tasks done</p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
            <Bar dataKey="hours" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tasks" fill="#22D3EE" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyProductivityChart;
