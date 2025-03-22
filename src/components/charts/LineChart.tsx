
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ChartProps } from "./types";

const LineChartComponent = ({ data }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
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
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="usage"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--background))" }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="successPercent"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--background))" }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
