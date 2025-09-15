// OpenRouter AI Service
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenRouterService {
  private apiKey: string;
  private baseURL = 'https://openrouter.ai/api/v1';

  constructor(apiKey?: string) {
    // Try to get API key from localStorage first, then from parameter
    this.apiKey = apiKey || localStorage.getItem('openrouter_api_key') || '';
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('openrouter_api_key', apiKey);
  }

  getApiKey(): string {
    return this.apiKey;
  }

  hasApiKey(): boolean {
    return !!this.apiKey;
  }

  clearApiKey() {
    this.apiKey = '';
    localStorage.removeItem('openrouter_api_key');
  }

  async chat(
    messages: ChatMessage[],
    model: string = 'anthropic/claude-3.5-sonnet',
    options: {
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
    } = {}
  ): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not set. Please configure your API key first.');
    }

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'PRA by Vardaan AI'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 2000,
        top_p: options.top_p || 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`OpenRouter API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage
    };
  }

  // Specialized methods for different use cases
  async generateCode(prompt: string, language: string = 'typescript'): Promise<AIResponse> {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are a senior software engineer specialized in ${language}. Generate clean, production-ready code with proper error handling and comments. Follow best practices and modern conventions.`
    };

    const userMessage: ChatMessage = {
      role: 'user',
      content: prompt
    };

    return this.chat([systemMessage, userMessage], 'anthropic/claude-3.5-sonnet', {
      temperature: 0.3
    });
  }

  async reviewCode(code: string, language: string = 'typescript'): Promise<AIResponse> {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are a code reviewer. Analyze the provided ${language} code for bugs, security issues, performance problems, and suggest improvements. Provide specific, actionable feedback.`
    };

    const userMessage: ChatMessage = {
      role: 'user',
      content: `Please review this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``
    };

    return this.chat([systemMessage, userMessage], 'anthropic/claude-3.5-sonnet', {
      temperature: 0.2
    });
  }

  async explainCode(code: string, language: string = 'typescript'): Promise<AIResponse> {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are a technical educator. Explain code in a clear, beginner-friendly way while also providing insights for advanced developers.`
    };

    const userMessage: ChatMessage = {
      role: 'user',
      content: `Please explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``
    };

    return this.chat([systemMessage, userMessage], 'anthropic/claude-3.5-sonnet');
  }

  async debugCode(code: string, error: string, language: string = 'typescript'): Promise<AIResponse> {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are a debugging expert. Analyze the code and error to provide specific solutions and explanations.`
    };

    const userMessage: ChatMessage = {
      role: 'user',
      content: `I'm getting this error in my ${language} code:\n\nError: ${error}\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\`\n\nPlease help me fix it.`
    };

    return this.chat([systemMessage, userMessage], 'anthropic/claude-3.5-sonnet', {
      temperature: 0.3
    });
  }
}

// Create a singleton instance
export const openRouter = new OpenRouterService();

// Available models for different use cases
export const OPENROUTER_MODELS = {
  // Most capable models
  'claude-3.5-sonnet': 'anthropic/claude-3.5-sonnet',
  'gpt-4-turbo': 'openai/gpt-4-turbo',
  
  // Fast models
  'claude-3-haiku': 'anthropic/claude-3-haiku',
  'gpt-3.5-turbo': 'openai/gpt-3.5-turbo',
  
  // Code-specialized models
  'codellama': 'meta-llama/codellama-34b-instruct',
  'deepseek-coder': 'deepseek/deepseek-coder-33b-instruct',
  
  // Cost-effective models
  'mixtral': 'mistralai/mixtral-8x7b-instruct',
  'llama-2': 'meta-llama/llama-2-70b-chat'
} as const;