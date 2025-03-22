
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { mockPrompts, userInfo, categories } from "@/data/mockData";
import PromptCard from "@/components/PromptCard";
import PromptDetail from "@/components/PromptDetail";
import PerformanceChart from "@/components/PerformanceChart";
import { 
  ArrowUp, 
  ArrowUpRight, 
  BarChart3, 
  Bot, 
  Brain, 
  Clock, 
  FileText, 
  Grid3X3, 
  Grid2X2, 
  LayoutGrid, 
  List, 
  Plus, 
  Search, 
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
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

  // Filter prompts based on search and category
  const filteredPrompts = React.useMemo(() => {
    return mockPrompts.filter(prompt => {
      const matchesSearch = searchTerm === "" || 
        prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === null || prompt.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

  // Animation classes for cards to create a staggered entrance effect
  const getAnimationClass = (index: number) => {
    const baseDelay = 50;
    const delay = baseDelay + (index * 50);
    return `animate-slide-in [animation-delay:${delay}ms] opacity-0`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className={cn("animate-slide-in", "[animation-delay:50ms]", "opacity-0")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPrompts.length}</div>
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
              <div className="text-2xl font-bold">{userInfo.totalUsage.toLocaleString()}</div>
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
              <div className="text-2xl font-bold">{(userInfo.successRate * 100).toFixed(1)}%</div>
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

        {/* Performance chart */}
        <div className={cn("animate-slide-in", "[animation-delay:250ms]", "opacity-0")}>
          <PerformanceChart 
            data={combinedPerformanceData}
            title="Overall Performance"
            description="Usage and success rate across all prompts"
          />
        </div>

        {/* Prompts section */}
        <div className={cn("animate-slide-in", "[animation-delay:300ms]", "opacity-0")}>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Your Prompts</h2>
                <p className="text-sm text-muted-foreground">
                  Manage and monitor your prompt templates and their performance.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Search prompts..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && setViewType(value as "grid" | "list")}>
                  <ToggleGroupItem value="grid" aria-label="Grid view" size="sm" className="px-3">
                    <Grid2X2 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view" size="sm" className="px-3">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <Button className="gap-1.5">
                  <Plus className="h-4 w-4" />
                  <span>New Prompt</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center">
              <TabsList className="bg-transparent p-0 h-9">
                <TabsTrigger 
                  value="all" 
                  className="rounded-md data-[state=active]:bg-secondary data-[state=active]:text-foreground"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Prompts
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category} 
                    className="rounded-md data-[state=active]:bg-secondary data-[state=active]:text-foreground"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="m-0">
              {viewType === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrompts.map((prompt, index) => (
                    <div key={prompt.id} className={getAnimationClass(index)}>
                      <PromptCard prompt={prompt} onClick={() => setActivePrompt(prompt.id)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPrompts.map((prompt, index) => (
                    <div 
                      key={prompt.id} 
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors",
                        getAnimationClass(index)
                      )}
                      onClick={() => setActivePrompt(prompt.id)}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                        <prompt.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-base truncate">{prompt.name}</h3>
                          <Badge variant="outline" className="bg-secondary/50">
                            {prompt.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{prompt.description}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Usage</p>
                          <p className="font-medium">{prompt.usage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Success</p>
                          <p className="font-medium">{((prompt.success / prompt.usage) * 100).toFixed(1)}%</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Render content for each category */}
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="m-0">
                {viewType === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrompts.map((prompt, index) => (
                      <div key={prompt.id} className={getAnimationClass(index)}>
                        <PromptCard prompt={prompt} onClick={() => setActivePrompt(prompt.id)} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPrompts.map((prompt, index) => (
                      <div 
                        key={prompt.id} 
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors",
                          getAnimationClass(index)
                        )}
                        onClick={() => setActivePrompt(prompt.id)}
                      >
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
                          <prompt.icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-base truncate">{prompt.name}</h3>
                            <Badge variant="outline" className="bg-secondary/50">
                              {prompt.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{prompt.description}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Usage</p>
                            <p className="font-medium">{prompt.usage}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Success</p>
                            <p className="font-medium">{((prompt.success / prompt.usage) * 100).toFixed(1)}%</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
