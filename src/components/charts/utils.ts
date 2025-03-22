
import { PerformanceData } from "./types";

export const formatChartData = (data: PerformanceData[]): PerformanceData[] => {
  return data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    successPercent: (item.successRate * 100).toFixed(1),
  }));
};

export const processPieData = (data: PerformanceData[]) => [
  { 
    name: "Successful", 
    value: data.reduce((acc, item) => acc + (item.usage * item.successRate), 0) 
  },
  { 
    name: "Failed", 
    value: data.reduce((acc, item) => acc + (item.usage * (1 - item.successRate)), 0) 
  }
];
