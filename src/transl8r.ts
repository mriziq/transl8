import { TranslationOptions, TranslationResponse } from './types';

export class transl8r {
  private apiKey: string;
  private baseUrl: string = 'https://transl8r.vercel.app/api/v1';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    
    if (!apiKey.startsWith('tr8_')) {
      throw new Error('Invalid API key format. Expected format: tr8_...');
    }
    
    this.apiKey = apiKey;
  }

  private async getFetch(): Promise<typeof fetch> {
    // Check if fetch is available globally (browser or Node.js 18+)
    if (typeof globalThis.fetch !== 'undefined') {
      return globalThis.fetch;
    }
    
    // For older Node.js versions, try to use node-fetch
    try {
      const nodeFetch = await import('node-fetch');
      return (nodeFetch.default || nodeFetch) as any as typeof fetch;
    } catch {
      throw new Error('Fetch not available. Please use Node.js 18+ or install node-fetch');
    }
  }

  async translate(data: any, targetLanguage: string, options?: TranslationOptions): Promise<any> {
    const fetchImpl = await this.getFetch();
    
    const body = {
      data,
      targetLanguage,
      ...options
    };

    const response = await fetchImpl(`${this.baseUrl}/translate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage: string;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorJson.message || 'Translation failed';
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  }
} 