/**
 * Configuration options for the Transl8r client
 */
export interface Transl8rOptions {
  /** API key for authentication */
  apiKey: string;
  /** Base URL for the API (defaults to https://api.transl8r.com) */
  baseUrl?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Number of retry attempts for failed requests */
  retries?: number;
  /** Custom fetch implementation */
  fetch?: typeof globalThis.fetch;
  /** Caching configuration */
  cache?: CacheOptions;
  /** Rate limiting configuration */
  rateLimit?: RateLimitOptions;
}

/**
 * Translation request payload
 */
export interface TranslationRequest {
  /** Data to translate */
  data: Record<string, any>;
  /** Target language code (e.g., 'es', 'fr', 'de') */
  targetLanguage: string;
  /** Keys to preserve without translation */
  preserveKeys?: string[];
  /** Additional context for better translation */
  context?: string;
  /** Source language (if known, otherwise auto-detected) */
  sourceLanguage?: string;
}

/**
 * Translation response
 */
export interface TranslationResponse<T = any> {
  /** Translated data */
  data: T;
  /** Usage information */
  usage?: {
    charactersUsed: number;
  };
  /** Response metadata */
  metadata: {
    sourceLanguage?: string;
    targetLanguage: string;
    requestId: string;
    processingTime?: number;
  };
}

/**
 * Batch translation request
 */
export interface BatchTranslationRequest {
  requests: TranslationRequest[];
  /** Process requests in parallel (default: true) */
  parallel?: boolean;
}

/**
 * Batch translation response
 */
export interface BatchTranslationResponse {
  results: TranslationResponse[];
  /** Overall batch metadata */
  batchMetadata: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    processingTime: number;
  };
}

/**
 * Language detection result
 */
export interface LanguageDetectionResult {
  /** Detected language code */
  language: string;
  /** Confidence score (0-1) */
  confidence: number;
  /** Alternative language suggestions */
  alternatives?: Array<{
    language: string;
    confidence: number;
  }>;
}

/**
 * Translation options
 */
export interface TranslationOptions {
  /**
   * Quality level for translation
   */
  quality?: 'fast' | 'balanced' | 'premium';
  
  /**
   * Additional context to help with translation
   */
  context?: string;
}

/**
 * Caching configuration
 */
export interface CacheOptions {
  /** Time to live in seconds */
  ttl?: number;
  /** Storage type */
  storage?: 'memory' | 'localStorage' | 'redis' | 'custom';
  /** Cache key prefix */
  keyPrefix?: string;
  /** Maximum cache size */
  maxSize?: number;
  /** Custom cache implementation */
  customCache?: CacheAdapter;
}

/**
 * Rate limiting configuration
 */
export interface RateLimitOptions {
  /** Characters per second limit */
  charactersPerSecond?: number;
  /** Requests per second limit */
  requestsPerSecond?: number;
  /** Buffer for rate limiting */
  buffer?: number;
}

/**
 * Custom cache adapter interface
 */
export interface CacheAdapter {
  get(key: string): Promise<any>;
  set(key: string, value: any, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * Error response from the API
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  requestId?: string;
}

/**
 * Streaming translation chunk
 */
export interface TranslationChunk {
  /** Partial translated data */
  data: any;
  /** Progress indicator (0-1) */
  progress: number;
  /** Whether this is the final chunk */
  complete: boolean;
  /** Chunk metadata */
  metadata?: {
    chunkId: string;
    totalChunks: number;
    currentChunk: number;
  };
}

/**
 * Client configuration for React hook
 */
export interface UseTransl8rConfig extends Omit<Transl8rOptions, 'apiKey'> {
  apiKey?: string;
}

/**
 * React hook return type
 */
export interface UseTransl8rReturn {
  /** Translate function */
  translate: <T = any>(data: Record<string, any>, targetLanguage: string, options?: TranslationOptions) => Promise<T>;
  /** Translation loading state */
  isLoading: boolean;
  /** Translation error */
  error: Error | null;
  /** Clear error state */
  clearError: () => void;
  /** Cancel ongoing translation */
  cancel: () => void;
}

/**
 * Express middleware options
 */
export interface ExpressMiddlewareOptions extends Omit<Transl8rOptions, 'cache'> {
  /** Path to mount the middleware */
  path?: string;
  /** Cache translations */
  cache?: boolean | CacheOptions;
  /** Cache TTL in seconds */
  cacheTTL?: number;
  /** Request size limit */
  limit?: string;
}

/**
 * Supported languages type
 */
export type SupportedLanguage = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh'
  | 'ar' | 'hi' | 'tr' | 'pl' | 'nl' | 'sv' | 'da' | 'no' | 'fi'
  | string; // Allow custom language codes

/**
 * Translation quality levels
 */
export type TranslationQuality = 'standard' | 'premium' | 'professional';

/**
 * Client event types
 */
export interface ClientEvents {
  'translation:start': { requestId: string };
  'translation:progress': { requestId: string; progress: number };
  'translation:complete': { requestId: string; result: TranslationResponse };
  'translation:error': { requestId: string; error: Error };
  'cache:hit': { key: string };
  'cache:miss': { key: string };
  'rate-limit:throttled': { delay: number };
}

/**
 * Usage statistics for the simplified API
 */
export interface UsageStats {
  charactersUsed: number;
  charactersRemaining: number;
  resetDate: Date;
} 