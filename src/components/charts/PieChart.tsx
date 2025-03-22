
import React from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { ChartProps } from "./types";
import { processPieData } from "./utils";

const PieChartComponent = ({ data }: ChartProps) => {
  const pieData = processPieData(data);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
          labelLine={false}
          animationBegin={0}
          animationDuration={800}
        >
          {pieData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={index === 0 ? "#10b981" : "#f87171"} 
              stroke="hsl(var(--background))"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => [`${value.toFixed(0)} prompts`, undefined]}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
