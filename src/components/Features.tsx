import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Code2, 
  Users, 
  Rocket, 
  Shield, 
  Zap, 
  MessageSquare, 
  BarChart3,
  GitBranch,
  Globe,
  Wallet,
  Bot
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI + Coding Assistant",
      description: "Natural language to code scaffolding with real-time suggestions, debugging help, and multi-language support.",
      color: "text-primary"
    },
    {
      icon: Code2,
      title: "Browser-Based IDE",
      description: "Full-featured code editor with file tree, live preview, version control, and instant deployment capabilities.",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Real-Time Collaboration",
      description: "Multiple users editing simultaneously with in-app chat, comment threads, and role-based permissions.",
      color: "text-accent"
    },
    {
      icon: Rocket,
      title: "One-Click Deploy",
      description: "Deploy your applications instantly with custom domains and automatic scaling capabilities.",
      color: "text-info"
    },
    {
      icon: Bot,
      title: "AI Agent Automation",
      description: "Multi-step workflows with Slack/CRM integrations and automatic cost optimization logic.",
      color: "text-primary"
    },
    {
      icon: MessageSquare,
      title: "Advanced Chatbot",
      description: "Multilingual support, sentiment analysis, live chat with handover, and widget customization.",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Security & Analytics",
      description: "Usage analytics dashboard, anomaly detection, governance tools, and compliance features.",
      color: "text-accent"
    },
    {
      icon: Wallet,
      title: "Crypto Payments",
      description: "Direct ETH wallet integration for seamless subscription management and secure transactions.",
      color: "text-success"
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Built-in version history, rollback functionality, and diff view for all your projects.",
      color: "text-info"
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Lightning-fast deployment with global content delivery network and edge computing.",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into usage patterns, performance metrics, and team productivity.",
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for speed with instant hot reloading, efficient bundling, and smart caching.",
      color: "text-accent"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-dark">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to Build
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Next-Generation Apps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered development to deployment and scaling - all the tools you need in one integrated platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/50 border-border hover:shadow-accent transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;