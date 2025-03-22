
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Bell, 
  ChevronDown, 
  ChevronLeft, 
  ChevronsLeft, 
  ChevronsRight, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Plus, 
  Settings, 
  User
} from "lucide-react";
import { categories, mockPrompts, userInfo } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activePrompt: string | null;
  setActivePrompt: (id: string | null) => void;
}

const Sidebar = ({ 
  collapsed, 
  setCollapsed, 
  activePrompt, 
  setActivePrompt
}: SidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories);

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  // Group prompts by category
  const promptsByCategory = categories.reduce((acc, category) => {
    acc[category] = mockPrompts.filter(prompt => prompt.category === category);
    return acc;
  }, {} as Record<string, typeof mockPrompts>);

  return (
    <div 
      className={cn(
        "h-screen flex flex-col bg-background border-r border-border transition-all duration-300 overflow-hidden",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Header with logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <div className="flex items-center">
          <div className="text-primary">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          {!collapsed && (
            <h1 className="ml-3 text-lg font-semibold text-foreground animate-fade-in">
              Prompt Manager
            </h1>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground transition-all duration-200"
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Main navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1.5 mb-6">
          <div 
            className={cn(
              "sidebar-item",
              !activePrompt && "bg-secondary"
            )}
            onClick={() => setActivePrompt(null)}
          >
            <Home size={20} />
            {!collapsed && <span>Dashboard</span>}
          </div>
        </div>

        <div className="mb-4">
          {!collapsed && (
            <div className="flex items-center justify-between px-1.5 mb-2">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Prompts
              </h2>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                <Plus size={16} />
              </Button>
            </div>
          )}

          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="space-y-1">
                <div 
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200",
                    collapsed ? "justify-center hover:bg-secondary" : "hover:bg-secondary/50"
                  )}
                  onClick={() => !collapsed && toggleCategory(category)}
                >
                  {collapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs font-semibold text-muted-foreground uppercase">
                            {category.charAt(0)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{category}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground font-medium">{category}</span>
                      <ChevronDown 
                        size={16} 
                        className={cn(
                          "text-muted-foreground transition-transform duration-200",
                          expandedCategories.includes(category) ? "transform rotate-180" : ""
                        )} 
                      />
                    </>
                  )}
                </div>

                {!collapsed && expandedCategories.includes(category) && (
                  <div className="ml-2 space-y-1 animate-fade-in">
                    {promptsByCategory[category].map((prompt) => (
                      <div 
                        key={prompt.id}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer transition-all duration-200",
                          activePrompt === prompt.id 
                            ? "bg-primary text-primary-foreground" 
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                        onClick={() => setActivePrompt(prompt.id)}
                      >
                        <prompt.icon size={16} />
                        <span className="truncate">{prompt.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3">
          <Avatar className={cn("", collapsed ? "h-10 w-10" : "h-9 w-9")}>
            <AvatarImage src={userInfo.avatar} />
            <AvatarFallback>{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">{userInfo.name}</p>
                <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20 text-primary">
                  {userInfo.plan}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            <Button variant="outline" size="icon" className="h-9 w-full">
              <User size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-full">
              <Bell size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-full">
              <Settings size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
