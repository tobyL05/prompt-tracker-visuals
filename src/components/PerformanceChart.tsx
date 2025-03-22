
import React, { useState, useEffect, useRef } from "react";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  BarChart3,
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon 
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface PerformanceChartProps {
  data: Array<{ date: string; usage: number; successRate: number }>;
  title: string;
  description?: string;
  className?: string;
}

type ChartType = "line" | "area" | "bar" | "pie";

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#f59e0b', '#10b981'];

const PerformanceChart = ({
  data,
  title,
  description,
  className,
}: PerformanceChartProps) => {
  const [chartType, setChartType] = useState<ChartType>("area");
  const [localData, setLocalData] = useState(data);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Update local data when prop data changes
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Process data for pie chart
  const pieData = [
    { name: "Successful", value: localData.reduce((acc, item) => acc + (item.usage * item.successRate), 0) },
    { name: "Failed", value: localData.reduce((acc, item) => acc + (item.usage * (1 - item.successRate)), 0) }
  ];

  // Format the date for better display
  const formattedData = localData.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    successPercent: (item.successRate * 100).toFixed(1),
  }));

  // Handle chart type change
  const handleChartTypeChange = (value: string) => {
    if (value) {
      setChartType(value as ChartType);
    }
  };

  return (
    <Card className={cn("h-full w-full overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
        <ToggleGroup type="single" value={chartType} onValueChange={handleChartTypeChange}>
          <ToggleGroupItem value="area" size="sm" className="h-8 w-8 p-0">
            <LineChartIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="bar" size="sm" className="h-8 w-8 p-0">
            <BarChart3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="pie" size="sm" className="h-8 w-8 p-0">
            <PieChartIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className="h-[300px] w-full" ref={chartContainerRef}>
          {chartType === "line" && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
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
              </LineChart>
            </ResponsiveContainer>
          )}

          {chartType === "area" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedData}
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
              </AreaChart>
            </ResponsiveContainer>
          )}

          {chartType === "bar" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedData}
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
                <Bar yAxisId="left" dataKey="usage" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                <Bar yAxisId="right" dataKey="successPercent" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartType === "pie" && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
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
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
