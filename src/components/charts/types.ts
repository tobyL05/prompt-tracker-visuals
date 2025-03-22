
import { LucideIcon } from "lucide-react";

export interface PerformanceData {
  date: string;
  usage: number;
  successRate: number;
  successPercent?: string; // Added when formatting data
}

export interface ChartProps {
  data: PerformanceData[];
}

export interface PerformanceChartProps {
  data: Array<{ date: string; usage: number; successRate: number }>;
  title: string;
  description?: string;
  className?: string;
}

export type ChartType = "line" | "area" | "bar" | "pie";

export const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#f59e0b', '#10b981'];
