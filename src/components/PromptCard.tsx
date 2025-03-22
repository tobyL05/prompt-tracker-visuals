
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/data/mockData";
import { Calendar, ChevronRight, Edit, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  prompt: Prompt;
  onClick: () => void;
  className?: string;
}

const PromptCard = ({ prompt, onClick, className }: PromptCardProps) => {
  const successRate = (prompt.success / prompt.usage) * 100;
  
  return (
    <Card 
      className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start space-y-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary">
              <prompt.icon size={20} />
            </div>
            <div>
              <h3 className="font-medium text-base group-hover:text-primary transition-colors">
                {prompt.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{prompt.description}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-secondary/50">
            {prompt.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="rounded-md border p-2.5 bg-muted/40 text-sm">
          <p className="line-clamp-3 text-muted-foreground">{prompt.content}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Usage</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-semibold">{prompt.usage}</p>
              <span className="text-xs text-muted-foreground">prompts</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-semibold">{successRate.toFixed(1)}%</p>
              <span className={cn(
                "text-xs",
                successRate >= 95 ? "text-emerald-500" : 
                successRate >= 90 ? "text-amber-500" : "text-rose-500"
              )}>
                {successRate >= 95 ? "Excellent" : 
                successRate >= 90 ? "Good" : "Needs Improvement"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground gap-1.5">
          <Calendar size={12} />
          <span>Updated {new Date(prompt.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <span>Details</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
