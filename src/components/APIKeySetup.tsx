import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Key, AlertTriangle, CheckCircle } from 'lucide-react';
import { openRouter } from '@/lib/openrouter';

interface APIKeySetupProps {
  onApiKeySet?: (hasKey: boolean) => void;
}

const APIKeySetup = ({ onApiKeySet }: APIKeySetupProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [hasExistingKey, setHasExistingKey] = useState(false);

  useEffect(() => {
    // Check if API key already exists
    const existingKey = openRouter.getApiKey();
    if (existingKey) {
      setHasExistingKey(true);
      setValidationStatus('valid');
      onApiKeySet?.(true);
    }
  }, [onApiKeySet]);

  const validateApiKey = async (key: string) => {
    setIsValidating(true);
    try {
      // Test the API key with a simple request
      openRouter.setApiKey(key);
      await openRouter.chat([
        { role: 'user', content: 'Hello' }
      ], 'anthropic/claude-3-haiku', { max_tokens: 10 });
      
      setValidationStatus('valid');
      setHasExistingKey(true);
      onApiKeySet?.(true);
    } catch (error) {
      setValidationStatus('invalid');
      openRouter.clearApiKey();
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) return;
    await validateApiKey(apiKey.trim());
  };

  const handleRemoveApiKey = () => {
    openRouter.clearApiKey();
    setApiKey('');
    setHasExistingKey(false);
    setValidationStatus('idle');
    onApiKeySet?.(false);
  };

  if (hasExistingKey && validationStatus === 'valid') {
    return (
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-success">
            <CheckCircle className="h-5 w-5" />
            <span>OpenRouter API Connected</span>
          </CardTitle>
          <CardDescription>
            Your OpenRouter API key is configured and ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleRemoveApiKey} size="sm">
            Remove API Key
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="h-5 w-5 text-primary" />
          <span>Configure OpenRouter API</span>
        </CardTitle>
        <CardDescription>
          Enter your OpenRouter API key to enable AI features. Your key is stored locally and never sent to our servers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-700 dark:text-yellow-300">
            <strong>Security Notice:</strong> Your API key is stored in your browser's localStorage. 
            For production apps, consider using a secure backend to handle API keys.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="apiKey">OpenRouter API Key</Label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showApiKey ? 'text' : 'password'}
              placeholder="sk-or-v1-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {validationStatus === 'invalid' && (
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              Invalid API key. Please check your key and try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center space-x-2">
          <Button 
            onClick={handleSaveApiKey}
            disabled={!apiKey.trim() || isValidating}
            className="bg-gradient-primary"
          >
            {isValidating ? 'Validating...' : 'Save & Validate'}
          </Button>
          
          <Button variant="outline" asChild>
            <a 
              href="https://openrouter.ai/keys" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get API Key
            </a>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Don't have an API key?</strong></p>
          <p>1. Visit <a href="https://openrouter.ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">OpenRouter.ai</a></p>
          <p>2. Sign up for a free account</p>
          <p>3. Generate an API key in your account settings</p>
          <p>4. Add credits to your account to start using AI models</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeySetup;