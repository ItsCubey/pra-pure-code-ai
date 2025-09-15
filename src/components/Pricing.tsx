import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      icon: Zap,
      description: "Perfect for getting started",
      features: [
        "10 requests per day",
        "2 team members",
        "2 projects per month",
        "Basic AI assistance",
        "Community support",
        "Basic analytics"
      ],
      popular: false,
      buttonText: "Get Started",
      gradient: "bg-muted/50"
    },
    {
      name: "Basic",
      price: "$10",
      period: "/month",
      icon: Crown,
      description: "Ideal for small teams",
      features: [
        "50 requests per day",
        "10 team members",
        "5 projects per month",
        "Advanced AI features",
        "Priority support",
        "Advanced analytics",
        "Version control",
        "Custom domains"
      ],
      popular: true,
      buttonText: "Start Basic Plan",
      gradient: "bg-gradient-secondary"
    },
    {
      name: "Pro",
      price: "$25",
      period: "/month",
      icon: Rocket,
      description: "For growing businesses",
      features: [
        "200 requests per day",
        "50 team members",
        "15 projects per month",
        "Full AI capabilities",
        "24/7 dedicated support",
        "Enterprise analytics",
        "Advanced collaboration",
        "White-label options",
        "API access",
        "Custom integrations"
      ],
      popular: false,
      buttonText: "Go Pro",
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include core features with secure ETH payments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden border-border hover:shadow-accent transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-center py-2">
                  <span className="text-sm font-semibold text-white">Most Popular</span>
                </div>
              )}
              
              <CardHeader className={plan.popular ? 'pt-8' : ''}>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg ${plan.gradient} flex items-center justify-center`}>
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  {plan.popular && (
                    <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      POPULAR
                    </div>
                  )}
                </div>
                
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-glow' 
                      : 'bg-muted hover:bg-muted/80'
                  } transition-all duration-300`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Pay securely with ETH • Cancel anytime
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include our core AI features, secure hosting, and 99.9% uptime guarantee.
          </p>
          <Button variant="outline" className="hover:bg-muted/50">
            Compare All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;