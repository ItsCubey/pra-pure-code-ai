import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code, Rocket, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">The Future of AI Development</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Build, Deploy, and Scale
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered Apps
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            Combining the best of Replit, Bolt, and Lovable in one powerful platform.
            Create production-ready applications with AI assistance, real-time collaboration, and instant deployment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 group"
            >
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-border hover:bg-muted/50"
            >
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 mt-12 text-muted-foreground animate-fade-in">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-primary" />
              <span>AI-Powered Coding</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-secondary" />
              <span>Real-time Collaboration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-accent" />
              <span>Instant Deploy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;