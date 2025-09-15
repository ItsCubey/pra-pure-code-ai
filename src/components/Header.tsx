import { Button } from "@/components/ui/button";
import { Code2, Zap, Users } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PRA
            </span>
            <span className="text-sm text-muted-foreground">by Vardaan AI</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:flex">
            Sign In
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;