
import React from "react";
import { ArrowUp, ArrowUpRight, BarChart3, Clock, FileText, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsOverviewProps {
  totalPrompts: number;
  totalUsage: number;
  successRate: number;
}

const StatsOverview = ({ totalPrompts, totalUsage, successRate }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className={cn("animate-slide-in", "[animation-delay:50ms]", "opacity-0")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPrompts}</div>
          <p className="text-xs text-muted-foreground">
            +2 from last month
          </p>
        </CardContent>
      </Card>
      <Card className={cn("animate-slide-in", "[animation-delay:100ms]", "opacity-0")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">18.2%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card className={cn("animate-slide-in", "[animation-delay:150ms]", "opacity-0")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(successRate * 100).toFixed(1)}%</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">4.3%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card className={cn("animate-slide-in", "[animation-delay:200ms]", "opacity-0")}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2s</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">12.5%</span>
            <span className="ml-1">faster than last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
