import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", thisWeek: 7, lastWeek: 10 },
  { day: "Tue", thisWeek: 11, lastWeek: 9 },
  { day: "Wed", thisWeek: 6, lastWeek: 12 },
  { day: "Thu", thisWeek: 14, lastWeek: 13 },
  { day: "Fri", thisWeek: 9, lastWeek: 8 },
  { day: "Sat", thisWeek: 5, lastWeek: 4 },
  { day: "Sun", thisWeek: 3, lastWeek: 2 },
];

function TaskCompletionChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 min-w-0">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900">Task Completion</h3>
          <p className="text-sm text-gray-400">This week</p>
        </div>
        <span className="text-2xl font-extrabold text-indigo-600">82%</span>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <Line
              type="monotone"
              dataKey="lastWeek"
              stroke="#E2E8F0"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="thisWeek"
              stroke="#4F46E5"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TaskCompletionChart;
