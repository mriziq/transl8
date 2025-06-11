// Simple usage example for the @transl8r/client package
const { transl8r } = require('../dist/index.js');

async function main() {
  console.log('🌍 @transl8r/client Simple Usage Example\n');

  // Initialize the translator with your API key
  const translator = new transl8r('tr8_R3bbIgAfBXMfYILuYpeJX1IskxqLY1nG');

  try {
    // Example 1: Translate a simple object
    console.log('📝 Example 1: Simple Object Translation');
    const data = {
      message: "Hello world",
      greeting: "Welcome to our app"
    };

    console.log('Original:', JSON.stringify(data, null, 2));
    
    const result = await translator.translate(data, 'es');
    console.log('Spanish:', JSON.stringify(result, null, 2));
    
    // Example 2: Translate with quality option
    console.log('\n📊 Example 2: High Quality Translation');
    const productData = {
      title: 'Premium Wireless Headphones',
      description: 'High-quality sound with noise cancellation'
    };

    console.log('Original:', JSON.stringify(productData, null, 2));
    
    const frenchProduct = await translator.translate(productData, 'French', {
      quality: 'premium',
      context: 'E-commerce product description'
    });
    console.log('French:', JSON.stringify(frenchProduct, null, 2));

  } catch (error) {
    console.error('❌ Translation Error:', error.message);
    
    // Common error scenarios:
    if (error.message.includes('API key')) {
      console.log('💡 Tip: Make sure to set a valid API key');
    } else if (error.message.includes('quota')) {
      console.log('💡 Tip: You may have exceeded your translation quota');
    } else if (error.message.includes('network')) {
      console.log('💡 Tip: Check your internet connection');
    }
  }
}

// Run the example
main().catch(console.error); 