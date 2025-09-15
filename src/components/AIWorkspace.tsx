import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Code, 
  Play, 
  Save, 
  Share, 
  Settings, 
  MessageSquare,
  FileText,
  Layers,
  Terminal
} from "lucide-react";

const AIWorkspace = () => {
  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI-Powered
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Development Workspace
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of coding with our integrated AI assistant, real-time collaboration, and instant deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* AI Chat Interface */}
          <Card className="lg:col-span-1 bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>AI Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="ai-chat-container p-4 h-64 overflow-y-auto space-y-3">
                <div className="flex justify-start">
                  <div className="bg-primary/20 text-primary-foreground rounded-lg px-3 py-2 max-w-xs">
                    Hi! I'm your AI coding assistant. What would you like to build today?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-muted text-foreground rounded-lg px-3 py-2 max-w-xs">
                    Create a React component for a user dashboard
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-primary/20 text-primary-foreground rounded-lg px-3 py-2 max-w-xs">
                    I'll help you create a beautiful user dashboard component. Let me generate the code for you...
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Input 
                  placeholder="Ask AI anything..." 
                  className="flex-1"
                />
                <Button size="sm" className="bg-gradient-primary">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card className="lg:col-span-2 bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-secondary" />
                  <span>Code Editor</span>
                  <span className="text-sm bg-success/20 text-success px-2 py-1 rounded">
                    dashboard.tsx
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" className="bg-gradient-secondary">
                    <Play className="h-4 w-4 mr-1" />
                    Run
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="code-editor p-4 h-80 overflow-auto text-sm">
                <pre className="text-foreground">
                  <code>{`import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Activity, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Users', value: '2,543', icon: Users, color: 'text-primary' },
    { title: 'Revenue', value: '$12,425', icon: DollarSign, color: 'text-success' },
    { title: 'Activity', value: '1,284', icon: Activity, color: 'text-info' },
    { title: 'Analytics', value: '94.5%', icon: BarChart3, color: 'text-secondary' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={\`h-4 w-4 \${stat.color}\`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Management Panel */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Layers className="h-5 w-5 text-accent" />
                <span>Project Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button size="sm" className="bg-gradient-primary">
                  Deploy
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">File Tree</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>src/</span>
                  </div>
                  <div className="flex items-center space-x-2 text-foreground ml-4">
                    <FileText className="h-4 w-4" />
                    <span>Dashboard.tsx</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground ml-4">
                    <FileText className="h-4 w-4" />
                    <span>App.tsx</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground ml-4">
                    <FileText className="h-4 w-4" />
                    <span>index.css</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Team Members</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs">
                      V
                    </div>
                    <span className="text-sm">Vardaan (Owner)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">
                      A
                    </div>
                    <span className="text-sm">Alex (Editor)</span>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    + Invite Member
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Recent Activity</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Dashboard component updated</div>
                  <div>New user added to team</div>
                  <div>Project deployed to staging</div>
                  <div>AI suggestion applied</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Quick Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Terminal className="h-4 w-4 mr-2" />
                    Open Terminal
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Project Settings
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Share className="h-4 w-4 mr-2" />
                    Share Project
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIWorkspace;