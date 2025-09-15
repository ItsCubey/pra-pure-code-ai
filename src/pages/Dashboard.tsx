import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Activity, 
  DollarSign, 
  Code2, 
  MessageSquare, 
  Settings,
  Plus,
  Folder,
  Clock,
  Zap
} from 'lucide-react';
import { authService, UserProfile, PLAN_LIMITS } from '@/lib/auth';
import ChatInterface from '@/components/ChatInterface';
import APIKeySetup from '@/components/APIKeySetup';
import { openRouter } from '@/lib/openrouter';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      const user = authService.getCurrentUser();
      if (user) {
        const profile = await authService.getUserProfile(user.uid);
        setUserProfile(profile);
      }
      setLoading(false);
    };

    loadUserProfile();
    setHasApiKey(openRouter.hasApiKey());
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <p className="text-muted-foreground">Unable to load user profile</p>
      </div>
    );
  }

  const planLimits = PLAN_LIMITS[userProfile.plan];
  const requestsProgress = (userProfile.usage.requestsToday / planLimits.requestsPerDay) * 100;
  const projectsProgress = (userProfile.usage.projectsThisMonth / planLimits.projectsPerMonth) * 100;
  const teamProgress = (userProfile.usage.teamMembersCount / planLimits.teamMembers) * 100;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {userProfile.displayName || 'Developer'}
            </h1>
            <p className="text-muted-foreground">
              Build amazing applications with AI assistance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge 
              variant="outline" 
              className={`${
                userProfile.plan === 'pro' ? 'border-primary bg-primary/10 text-primary' :
                userProfile.plan === 'basic' ? 'border-secondary bg-secondary/10 text-secondary' :
                'border-muted bg-muted/10 text-muted-foreground'
              }`}
            >
              {userProfile.plan.toUpperCase()} Plan
            </Badge>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                AI Requests Today
              </CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userProfile.usage.requestsToday}/{planLimits.requestsPerDay}
              </div>
              <Progress value={requestsProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projects This Month
              </CardTitle>
              <Folder className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userProfile.usage.projectsThisMonth}/{planLimits.projectsPerMonth}
              </div>
              <Progress value={projectsProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Team Members
              </CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userProfile.usage.teamMembersCount}/{planLimits.teamMembers}
              </div>
              <Progress value={teamProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Plan Cost
              </CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${planLimits.price}/month
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {userProfile.plan === 'free' ? 'Free forever' : 'Billed monthly'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workspace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workspace">
              <Code2 className="h-4 w-4 mr-2" />
              Workspace
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Folder className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workspace" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* API Key Setup */}
              {!hasApiKey && (
                <div className="lg:col-span-2">
                  <APIKeySetup onApiKeySet={setHasApiKey} />
                </div>
              )}

              {/* AI Chat Interface */}
              <div className="lg:col-span-1">
                <ChatInterface />
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <Card className="bg-card/50 border-border">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Start a new project or continue working
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Code2 className="h-4 w-4 mr-2" />
                      Browse Templates
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        2 hours ago
                      </span>
                      <span>Created React component</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        1 day ago
                      </span>
                      <span>Deployed to production</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        3 days ago
                      </span>
                      <span>Added team member</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>
                  Manage and organize your development projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first project to get started
                  </p>
                  <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Invite and manage team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Just you for now</h3>
                  <p className="text-muted-foreground mb-4">
                    Invite team members to collaborate on projects
                  </p>
                  <Button className="bg-gradient-secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <APIKeySetup onApiKeySet={setHasApiKey} />
              
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Account settings will be available in the next update.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;