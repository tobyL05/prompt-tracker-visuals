
import React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ChartProps } from "./types";

const AreaChartComponent = ({ data }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <defs>
          <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={50}
        />
        <YAxis 
          yAxisId="left" 
          tick={{ fontSize: 12 }} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="usage"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#usageGradient)"
          dot={{ strokeWidth: 2, r: 3, fill: "hsl(var(--background))" }}
          activeDot={{ r: 5, stroke: "hsl(var(--background))" }}
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="successPercent"
          stroke="#10b981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#successGradient)"
          dot={{ strokeWidth: 2, r: 3, fill: "hsl(var(--background))" }}
          activeDot={{ r: 5, stroke: "hsl(var(--background))" }}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
