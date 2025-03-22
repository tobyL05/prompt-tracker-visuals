
import React from "react";
import { 
  Bell,
  ChevronDown,
  Command, 
  Home, 
  Plus, 
  Search,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userInfo } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface NavbarProps {
  title: string;
  activePrompt: string | null;
}

const Navbar = ({ title, activePrompt }: NavbarProps) => {
  return (
    <header className="h-16 border-b border-border bg-background/70 backdrop-blur-md sticky top-0 z-30">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="font-semibold text-xl">{title}</div>
          {activePrompt && (
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                <Home size={14} />
                <span>Dashboard</span>
              </Button>
              <span>/</span>
              <Button variant="ghost" size="sm" className="h-8 text-foreground">
                {title}
              </Button>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-[400px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
            <input
              type="text"
              placeholder="Search prompts..."
              className="h-9 w-full rounded-md border border-input bg-background pl-10 pr-12 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="h-9 w-9 text-muted-foreground">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 text-muted-foreground">
              <Settings className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" className="h-9 gap-1.5 text-primary">
              <Plus className="h-4 w-4" />
              <span>New Prompt</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback>{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{userInfo.name}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
