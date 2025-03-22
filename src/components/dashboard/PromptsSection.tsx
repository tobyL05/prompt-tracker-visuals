
import React, { useState } from "react";
import { Grid2X2, List, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Prompt } from "@/data/mockData";
import PromptGridView from "./PromptGridView";
import PromptListView from "./PromptListView";

interface PromptsSectionProps {
  prompts: Prompt[];
  categories: string[];
  onSelectPrompt: (id: string) => void;
}

const PromptsSection = ({ prompts, categories, onSelectPrompt }: PromptsSectionProps) => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter prompts based on search and category
  const filteredPrompts = React.useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = searchTerm === "" || 
        prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === null || prompt.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [prompts, searchTerm, selectedCategory]);

  // Animation classes for cards to create a staggered entrance effect
  const getAnimationClass = (index: number) => {
    const baseDelay = 50;
    const delay = baseDelay + (index * 50);
    return `animate-slide-in [animation-delay:${delay}ms] opacity-0`;
  };

  return (
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
            <PromptGridView 
              prompts={filteredPrompts}
              onSelectPrompt={onSelectPrompt}
              getAnimationClass={getAnimationClass}
            />
          ) : (
            <PromptListView 
              prompts={filteredPrompts}
              onSelectPrompt={onSelectPrompt}
              getAnimationClass={getAnimationClass}
            />
          )}
        </TabsContent>

        {/* Render content for each category */}
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="m-0">
            {viewType === "grid" ? (
              <PromptGridView 
                prompts={filteredPrompts}
                onSelectPrompt={onSelectPrompt}
                getAnimationClass={getAnimationClass}
              />
            ) : (
              <PromptListView 
                prompts={filteredPrompts}
                onSelectPrompt={onSelectPrompt}
                getAnimationClass={getAnimationClass}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PromptsSection;
