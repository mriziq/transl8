# @transl8r/client

Simple JavaScript/TypeScript client library for the Transl8r AI Translation API.

## Installation

```bash
npm install @transl8r/client
```

## Quick Start

```javascript
const { transl8r } = require('@transl8r/client');

const translator = new transl8r('tr8_your_api_key');
const result = await translator.translate({ message: "Hello world" }, 'es');
console.log(result); // { message: "Hola mundo" }
```

## API Reference

### Constructor

```javascript
const translator = new transl8r(apiKey)
```

- `apiKey` (string): Your Transl8r API key (format: `tr8_...`)

### translate(data, targetLanguage, options?)

Translates the provided data to the target language.

```javascript
const result = await translator.translate(data, targetLanguage, options);
```

**Parameters:**
- `data` (object): The data object to translate
- `targetLanguage` (string): Target language (e.g., 'es', 'Spanish', 'fr', 'French')
- `options` (object, optional): Translation options
  - `quality` ('fast' | 'balanced' | 'premium'): Translation quality level
  - `context` (string): Additional context to help with translation

**Returns:** Promise that resolves to the translated data object.

## Examples

### Basic Translation

```javascript
const { transl8r } = require('@transl8r/client');

const translator = new transl8r('tr8_your_api_key');

const data = {
  title: "Welcome to our app",
  description: "This is a simple example"
};

const spanish = await translator.translate(data, 'es');
console.log(spanish);
// { title: "Bienvenido a nuestra aplicación", description: "Este es un ejemplo simple" }
```

### High-Quality Translation with Context

```javascript
const productInfo = {
  name: "Premium Wireless Headphones",
  description: "Crystal clear sound with active noise cancellation"
};

const result = await translator.translate(productInfo, 'French', {
  quality: 'premium',
  context: 'E-commerce product description'
});
```

### TypeScript Usage

```typescript
import { transl8r, TranslationOptions } from '@transl8r/client';

const translator = new transl8r('tr8_your_api_key');

interface UserProfile {
  name: string;
  bio: string;
}

const profile: UserProfile = {
  name: "John Doe",
  bio: "Software developer"
};

const options: TranslationOptions = {
  quality: 'balanced',
  context: 'User profile information'
};

const translated = await translator.translate(profile, 'es', options);
```

## Error Handling

```javascript
try {
  const result = await translator.translate(data, 'es');
  console.log(result);
} catch (error) {
  console.error('Translation failed:', error.message);
}
```

Common error scenarios:
- Invalid API key format
- API key authentication failed
- Network connection issues
- Quota exceeded
- Invalid target language

## License

MIT 