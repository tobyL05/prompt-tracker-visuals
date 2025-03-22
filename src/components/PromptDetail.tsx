
import React from "react";
import { Prompt } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  Copy, 
  Edit, 
  Eye, 
  FileText, 
  MessageSquare, 
  RefreshCw, 
  Settings, 
  Share2, 
  Sparkles, 
  Users 
} from "lucide-react";
import { userInfo } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import PerformanceChart from "./PerformanceChart";

interface PromptDetailProps {
  prompt: Prompt;
}

const PromptDetail = ({ prompt }: PromptDetailProps) => {
  const successRate = (prompt.success / prompt.usage) * 100;
  const createdDate = new Date(prompt.createdAt);
  const updatedDate = new Date(prompt.updatedAt);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="h-full space-y-6 animate-fade-in">
      <header className="space-y-2.5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
              <prompt.icon size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{prompt.name}</h1>
                <Badge variant="outline" className="bg-secondary/50">
                  {prompt.category}
                </Badge>
              </div>
              <p className="text-muted-foreground">{prompt.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Share2 size={15} />
              <span>Share</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Settings size={15} />
              <span>Settings</span>
            </Button>
            <Button size="sm" className="h-9 gap-1.5">
              <Edit size={15} />
              <span>Edit Prompt</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Tabs defaultValue="prompt" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="prompt">Prompt Template</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="prompt" className="space-y-4 pt-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">Prompt Template</h3>
                  <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground">
                    <Copy size={14} />
                    <span>Copy</span>
                  </Button>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <pre className="text-sm whitespace-pre-wrap">{prompt.content}</pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium">Usage Tips</h3>
                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-blue-500">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Replace placeholders like <code className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded">[product_name]</code> with your specific information.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-blue-500">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">For best results, provide detailed information for each placeholder.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-blue-500">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Try different tones to see which works best for your audience.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium">Example Usage</h3>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-3">
                    <div className="rounded-lg bg-background p-3 border">
                      <p className="text-sm font-medium mb-1">Input Example:</p>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap">Create a compelling product description for [Wireless Noise-Cancelling Headphones]. It should highlight the following features: [40-hour battery life, active noise cancellation, comfortable ear cups]. The target audience is [tech enthusiasts and frequent travelers]. The tone should be [sophisticated but approachable].</pre>
                    </div>
                    <div className="rounded-lg bg-background p-3 border">
                      <p className="text-sm font-medium mb-1">Output Example:</p>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap">Experience audio excellence with our Wireless Noise-Cancelling Headphones, designed for those who demand the best in sound technology. Whether you're a tech enthusiast seeking superior audio quality or a frequent traveler looking for peace during your journey, these headphones deliver exceptional performance in a sophisticated package.

Featuring industry-leading active noise cancellation, these headphones create a personal sanctuary wherever you go, blocking out distractions so you can focus on what matters—your music, podcast, or call. The premium ear cups are engineered for lasting comfort, allowing you to enjoy your audio experience for the full 40-hour battery life without discomfort.

Elevate your listening experience today with headphones that understand your lifestyle needs and exceed your expectations.</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="performance" className="pt-3">
              <div className="space-y-6">
                <PerformanceChart 
                  data={prompt.performance} 
                  title="Prompt Usage & Success Rate" 
                  description="Last 15 days performance"
                />
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Most Common Failures</h3>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Missing placeholders</p>
                        <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-200">42%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Ambiguous instructions</p>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">28%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Context limitations</p>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">18%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Other issues</p>
                        <Badge variant="outline" className="bg-slate-500/10 text-slate-500 border-slate-200">12%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Performance Recommendations</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 text-emerald-500">
                          <Sparkles size={16} />
                        </div>
                        <p className="text-sm">Add clearer instructions for placeholder formatting</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 text-emerald-500">
                          <Sparkles size={16} />
                        </div>
                        <p className="text-sm">Include examples of well-formatted inputs</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 text-emerald-500">
                          <Sparkles size={16} />
                        </div>
                        <p className="text-sm">Simplify the prompt structure for better usability</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="pt-3">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium">Creation Date</h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <Calendar size={14} />
                      <span>{formatDate(createdDate)}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium">Last Updated</h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <RefreshCw size={14} />
                      <span>{formatDate(updatedDate)}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2.5">
                  <h3 className="text-base font-medium">Created By</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={userInfo.avatar} />
                      <AvatarFallback>{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{userInfo.name}</p>
                      <p className="text-xs text-muted-foreground">{userInfo.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-4 bg-card">
            <h3 className="text-sm font-medium mb-3">Performance Summary</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-3 space-y-1">
                  <p className="text-xs text-muted-foreground">Total Usage</p>
                  <div className="flex items-center gap-1.5">
                    <Eye size={16} className="text-blue-500" />
                    <p className="font-semibold">{prompt.usage}</p>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/30 p-3 space-y-1">
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={16} className="text-emerald-500" />
                    <p className="font-semibold">{successRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-muted/30 p-3 space-y-1.5">
                <p className="text-xs text-muted-foreground">Performance Trend</p>
                <div className="h-10">
                  <ResponsiveSparkline data={prompt.performance.map(p => p.successRate * 100)} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border p-4 bg-card">
            <h3 className="text-sm font-medium mb-3">Related Prompts</h3>
            <div className="space-y-2.5">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10 text-primary shrink-0">
                    <FileText size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {i === 0 ? "Product Feature Highlight" : 
                       i === 1 ? "E-commerce Product Specs" : 
                       "Marketing Copy Template"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {i === 0 ? "Creates focused feature highlights" : 
                       i === 1 ? "Generates technical specifications" : 
                       "Creates marketing copy for products"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-lg border p-4 bg-card">
            <h3 className="text-sm font-medium mb-3">Usage Stats</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-muted-foreground" />
                  <p className="text-sm">Total Users</p>
                </div>
                <p className="text-sm font-medium">48</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ArrowUpRight size={14} className="text-muted-foreground" />
                  <p className="text-sm">Avg. Success Rate</p>
                </div>
                <p className="text-sm font-medium">{successRate.toFixed(1)}%</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <p className="text-sm">Avg. Response Time</p>
                </div>
                <p className="text-sm font-medium">3.2s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple sparkline chart component
const ResponsiveSparkline = ({ data }: { data: number[] }) => {
  // Find min and max for scaling
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Scale to fit within the height (with padding)
  const scaleY = (value: number) => {
    return 10 - ((value - min) / (range || 1)) * 8;
  };
  
  // Create points for the path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = scaleY(value);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 10" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PromptDetail;
