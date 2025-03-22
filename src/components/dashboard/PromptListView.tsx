
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/data/mockData";

interface PromptListViewProps {
  prompts: Prompt[];
  onSelectPrompt: (id: string) => void;
  getAnimationClass: (index: number) => string;
}

const PromptListView = ({ prompts, onSelectPrompt, getAnimationClass }: PromptListViewProps) => {
  return (
    <div className="space-y-4">
      {prompts.map((prompt, index) => (
        <div 
          key={prompt.id} 
          className={cn(
            "flex items-center gap-4 p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors",
            getAnimationClass(index)
          )}
          onClick={() => onSelectPrompt(prompt.id)}
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
  );
};

export default PromptListView;
