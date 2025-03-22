
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { mockPrompts, userInfo, categories } from "@/data/mockData";
import PromptDetail from "@/components/PromptDetail";
import StatsOverview from "@/components/dashboard/StatsOverview";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import PromptsSection from "@/components/dashboard/PromptsSection";

const Index = () => {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  
  // Combine all performance data for overview chart
  const combinedPerformanceData = React.useMemo(() => {
    const dateMap = new Map();
    
    mockPrompts.forEach(prompt => {
      prompt.performance.forEach(perf => {
        if (!dateMap.has(perf.date)) {
          dateMap.set(perf.date, { date: perf.date, usage: 0, successRate: 0, count: 0 });
        }
        const current = dateMap.get(perf.date);
        current.usage += perf.usage;
        current.successRate += perf.successRate;
        current.count += 1;
      });
    });
    
    return Array.from(dateMap.values())
      .map(({ date, usage, successRate, count }) => ({
        date,
        usage,
        successRate: successRate / count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  // If a prompt is selected, show the prompt detail view
  if (activePrompt) {
    const prompt = mockPrompts.find(p => p.id === activePrompt);
    if (!prompt) return null;
    
    return (
      <DashboardLayout>
        <PromptDetail prompt={prompt} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats overview */}
        <StatsOverview 
          totalPrompts={mockPrompts.length}
          totalUsage={userInfo.totalUsage}
          successRate={userInfo.successRate}
        />

        {/* Performance chart */}
        <PerformanceOverview data={combinedPerformanceData} />

        {/* Prompts section */}
        <PromptsSection 
          prompts={mockPrompts}
          categories={categories}
          onSelectPrompt={setActivePrompt}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
