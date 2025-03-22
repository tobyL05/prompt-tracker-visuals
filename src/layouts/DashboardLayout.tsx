
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { mockPrompts } from "@/data/mockData";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  // Get title based on active prompt
  const getTitle = () => {
    if (!activePrompt) return "Dashboard";
    const prompt = mockPrompts.find((p) => p.id === activePrompt);
    return prompt ? prompt.name : "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        activePrompt={activePrompt} 
        setActivePrompt={setActivePrompt}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={getTitle()} activePrompt={activePrompt} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
