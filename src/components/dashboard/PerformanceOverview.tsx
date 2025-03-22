
import React from "react";
import { cn } from "@/lib/utils";
import PerformanceChart from "@/components/PerformanceChart";
import { PerformanceData } from "@/components/charts/types";

interface PerformanceOverviewProps {
  data: PerformanceData[];
}

const PerformanceOverview = ({ data }: PerformanceOverviewProps) => {
  return (
    <div className={cn("animate-slide-in", "[animation-delay:250ms]", "opacity-0")}>
      <PerformanceChart 
        data={data}
        title="Overall Performance"
        description="Usage and success rate across all prompts"
      />
    </div>
  );
};

export default PerformanceOverview;
