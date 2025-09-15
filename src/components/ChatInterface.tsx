import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  Code, 
  Bug, 
  HelpCircle, 
  Sparkles,
  Copy,
  Loader2,
  Settings
} from 'lucide-react';
import { openRouter, OPENROUTER_MODELS, ChatMessage } from '@/lib/openrouter';
import { authService } from '@/lib/auth';

interface Message extends ChatMessage {
  id: string;
  timestamp: Date;
  isLoading?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. I can help you generate code, debug issues, explain concepts, and much more. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(OPENROUTER_MODELS['claude-3.5-sonnet']);
  const [chatMode, setChatMode] = useState<'general' | 'code' | 'debug' | 'explain'>('general');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const user = authService.getCurrentUser();
    if (!user) {
      addMessage({
        role: 'assistant',
        content: 'Please sign in to use the AI assistant.'
      });
      return;
    }

    if (!openRouter.hasApiKey()) {
      addMessage({
        role: 'assistant',
        content: 'Please configure your OpenRouter API key in the settings to use AI features.'
      });
      return;
    }

    // Check usage limits
    const canUseAI = await authService.incrementRequestUsage(user.uid);
    if (!canUseAI) {
      addMessage({
        role: 'assistant',
        content: 'You\'ve reached your daily request limit. Please upgrade your plan to continue using AI features.'
      });
      return;
    }

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage
    });

    // Add loading assistant message
    const assistantMessageId = addMessage({
      role: 'assistant',
      content: 'Thinking...',
      isLoading: true
    });

    setIsLoading(true);

    try {
      let response;
      const recentMessages = messages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add current user message
      recentMessages.push({ role: 'user', content: userMessage });

      switch (chatMode) {
        case 'code':
          response = await openRouter.generateCode(userMessage);
          break;
        case 'debug':
          response = await openRouter.debugCode(userMessage, '', 'typescript');
          break;
        case 'explain':
          response = await openRouter.explainCode(userMessage);
          break;
        default:
          response = await openRouter.chat(recentMessages, selectedModel);
      }

      updateMessage(assistantMessageId, {
        content: response.content,
        isLoading: false
      });
    } catch (error: any) {
      updateMessage(assistantMessageId, {
        content: `Error: ${error.message}. Please check your API key and try again.`,
        isLoading: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'code': return <Code className="h-4 w-4" />;
      case 'debug': return <Bug className="h-4 w-4" />;
      case 'explain': return <HelpCircle className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <Card className="flex flex-col bg-card/50 border-border h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Assistant</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Select value={chatMode} onValueChange={(value: string) => setChatMode(value as any)}>
              <SelectTrigger className="w-32">
                <div className="flex items-center space-x-1">
                  {getModeIcon(chatMode)}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>General</span>
                  </div>
                </SelectItem>
                <SelectItem value="code">
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4" />
                    <span>Code Gen</span>
                  </div>
                </SelectItem>
                <SelectItem value="debug">
                  <div className="flex items-center space-x-2">
                    <Bug className="h-4 w-4" />
                    <span>Debug</span>
                  </div>
                </SelectItem>
                <SelectItem value="explain">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>Explain</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OPENROUTER_MODELS['claude-3.5-sonnet']}>Claude 3.5 Sonnet</SelectItem>
                <SelectItem value={OPENROUTER_MODELS['claude-3-haiku']}>Claude 3 Haiku</SelectItem>
                <SelectItem value={OPENROUTER_MODELS['gpt-4-turbo']}>GPT-4 Turbo</SelectItem>
                <SelectItem value={OPENROUTER_MODELS['codellama']}>CodeLlama</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' ? (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    ) : (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      {message.isLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <pre className="whitespace-pre-wrap font-sans text-sm">
                            {message.content}
                          </pre>
                        </div>
                      )}
                      {message.role === 'assistant' && !message.isLoading && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-6 px-2 text-xs opacity-50 hover:opacity-100"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about code, debugging, or development..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <Badge variant="outline" className="mr-2">
            Mode: {chatMode}
          </Badge>
          <Badge variant="outline">
            Model: {Object.keys(OPENROUTER_MODELS).find(key => 
              OPENROUTER_MODELS[key as keyof typeof OPENROUTER_MODELS] === selectedModel
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;