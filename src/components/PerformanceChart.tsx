
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChartType, PerformanceChartProps } from "./charts/types";
import { formatChartData } from "./charts/utils";
import LineChartComponent from "./charts/LineChart";
import AreaChartComponent from "./charts/AreaChart";
import BarChartComponent from "./charts/BarChart";
import PieChartComponent from "./charts/PieChart";

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

  // Format the data for display
  const formattedData = formatChartData(localData);

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
          {chartType === "line" && <LineChartComponent data={formattedData} />}
          {chartType === "area" && <AreaChartComponent data={formattedData} />}
          {chartType === "bar" && <BarChartComponent data={formattedData} />}
          {chartType === "pie" && <PieChartComponent data={formattedData} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
