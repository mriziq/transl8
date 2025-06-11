import { transl8r } from '../src/transl8r';

// Mock fetch globally
global.fetch = jest.fn();

describe('transl8r', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create instance with valid API key', () => {
      const translator = new transl8r('tr8_test_key');
      expect(translator).toBeInstanceOf(transl8r);
    });

    it('should throw error with empty API key', () => {
      expect(() => new transl8r('')).toThrow('API key is required');
    });

    it('should throw error with invalid API key format', () => {
      expect(() => new transl8r('invalid_key')).toThrow('Invalid API key format');
    });
  });

  describe('translate', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('should make successful translation request', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: { message: 'Hola mundo' }
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const translator = new transl8r('tr8_test_key');
      const result = await translator.translate({ message: 'Hello world' }, 'es');

      expect(result).toEqual({ message: 'Hola mundo' });
      expect(mockFetch).toHaveBeenCalledWith(
        'https://transl8r.vercel.app/api/v1/translate',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer tr8_test_key',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: { message: 'Hello world' },
            targetLanguage: 'es'
          })
        }
      );
    });

    it('should handle API errors', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: jest.fn().mockResolvedValue(JSON.stringify({ error: 'Invalid API key' }))
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const translator = new transl8r('tr8_test_key');
      
      await expect(translator.translate({ message: 'Hello' }, 'es'))
        .rejects.toThrow('Invalid API key');
    });

    it('should include options in request', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: { message: 'Hola mundo' }
        })
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const translator = new transl8r('tr8_test_key');
      await translator.translate(
        { message: 'Hello world' }, 
        'es', 
        { quality: 'premium', context: 'greeting' }
      );

      expect(mockFetch).toHaveBeenCalledWith(
        'https://transl8r.vercel.app/api/v1/translate',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer tr8_test_key',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: { message: 'Hello world' },
            targetLanguage: 'es',
            quality: 'premium',
            context: 'greeting'
          })
        }
      );
    });
  });
}); 