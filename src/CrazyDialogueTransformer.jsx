import { useState } from 'react';

const CrazyDialogueTransformer = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // This would normally connect to the DeepSeek API
  // For demonstration purposes, we'll use a mock transformation function
  const transformText = (text) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // More accurate transformation logic based on your examples
      const brackets = [
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '[[*', close: '*]]' },
        { open: '"', close: '"' },
        { open: '∆∆§', close: '' },
        { open: '--', close: '--' }
      ];
      
      const phrases = [
        'WHO?',
        'COOL COOL COOL!!!',
        'I hate this life.',
        'Could you please get off my asphalt?',
        'my little pony, my little pony!',
        'I can\'t hear the where am I?',
        'HELLO BESTIE!',
        'Friendship is magic!',
        'Sorry! Miss clicked!',
        'SOMEBODY\'S POISONED? OH NO! NO NO NO!',
        'Just me and you right, with your blaster your--',
        'IS THAT HOW YOU DO IT? COOL COOL COOL!!!',
        'May you get off my asphalt?',
        'FREE DOM!',
        'SHIT\'S GOING DOWN!!! RUN!!!'
      ];
      
      // Start with triple braces
      let result = '{{{ ';
      
      // Original text (generally shouted)
      const originalText = text.toUpperCase();
      
      // Create array of text chunks to process
      const chunks = originalText.split(/[.!?]+/);
      
      // Process each chunk with nested brackets and interjections
      chunks.forEach((chunk, index) => {
        if (chunk.trim() === '') return;
        
        // Add original chunk (sometimes with interjections)
        result += chunk;
        
        // Add ellipsis, random punctuation
        if (Math.random() > 0.7) {
          result += ' ....... ';
        }
        
        // Add 1-3 random nested bracket sections
        const numNested = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numNested; i++) {
          // Select random bracket style
          const bracketStyle = brackets[Math.floor(Math.random() * brackets.length)];
          
          // Select random phrase
          const phrase = phrases[Math.floor(Math.random() * phrases.length)];
          
          // Add bracketed phrase
          result += ` ${bracketStyle.open} ${phrase} ${bracketStyle.close} `;
        }
      });
      
      // End with triple braces
      result += '}}}';
      
      setOutputText(result);
      setIsLoading(false);
      
      // Add to history
      if (text.trim() !== '') {
        setHistory(prev => [{input: text, output: result}, ...prev.slice(0, 4)]);
      }
    }, 1000);
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      transformText(inputText);
    }
  };

  // Example prompts that users can try
  const examplePrompts = [
    "My favorite song! Let's rock!",
    "Who are you? Oh! Hi Justin!",
    "Geno! Things aren't going according to plan!",
    "I can't believe it's already Friday!",
    "Did you see that amazing sunset yesterday?"
  ];

  // Function to set an example prompt
  const setExample = (example) => {
    setInputText(example);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-gradient-to-b from-purple-50 to-blue-50 min-h-screen">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-center my-6 text-purple-800 drop-shadow-sm">Crazy Dialogue Transformer</h1>
        
        <p className="text-center text-gray-600 mb-4">
          Enter normal dialogue and transform it into the style of our chaotic character!
        </p>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col space-y-4">
            <label className="font-medium text-purple-700">Try these examples:</label>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setExample(example)}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                >
                  {example.length > 25 ? example.substring(0, 22) + '...' : example}
                </button>
              ))}
            </div>
            
            <textarea 
              className="w-full p-4 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 min-h-32 bg-purple-50"
              placeholder="Enter your dialogue here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
            />
            
            <div className="flex justify-end">
              <button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⚙️</span>
                    <span>Transforming...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Transform!</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {outputText && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-3 text-purple-700 flex items-center gap-2">
              <span>Transformed Dialogue</span>
              <span className="text-2xl">🤪</span>
            </h2>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300 rounded-lg p-6 shadow-inner">
              <div className="font-mono text-lg whitespace-pre-wrap leading-relaxed relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-50 opacity-50 animate-pulse"></div>
                <div className="relative z-10">
                  {/* Split and apply random styling to each part of the output */}
                  {outputText.split(/(\{\{\{|\}\}\}|\[|\]|\(|\)|\*|\"|--|\s)/).map((part, index) => {
                    // Apply specific styling based on content
                    let className = "";
                    
                    if (part === "{{{" || part === "}}}") {
                      className = "text-purple-800 font-bold text-2xl";
                    } else if (part === "[" || part === "]") {
                      className = "text-green-600 font-bold";
                    } else if (part === "(" || part === ")") {
                      className = "text-blue-600 font-bold";
                    } else if (part === "*") {
                      className = "text-red-500 font-bold text-xl";
                    } else if (part === "\"") {
                      className = "text-yellow-600 font-bold";
                    } else if (part === "--") {
                      className = "text-gray-500 font-bold";
                    } else if (part === " ") {
                      className = "";
                    } else if (part.toUpperCase() === part && part.length > 1) {
                      // For shouted text (all caps)
                      className = "text-purple-900 font-bold";
                    }
                    
                    return (
                      <span key={index} className={className}>
                        {part}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {history.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-purple-700">History:</h2>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="font-semibold text-gray-700">Input:</p>
                  <p className="mb-2 text-gray-600">{item.input}</p>
                  <p className="font-semibold text-gray-700">Output:</p>
                  <p className="font-mono text-gray-800 bg-gray-50 p-2 rounded">{item.output}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-purple-700">About This Implementation</h2>
          <p className="text-gray-700 mb-4">
            This is a demonstration of the UI. In a production environment, this would connect to the DeepSeek API for text transformation.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Implementation Notes:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                In a real implementation, the <code className="bg-gray-100 px-1 rounded">transformText</code> function would make an API call to DeepSeek's endpoints.
              </li>
              <li>
                The request would include the input text and parameters for the crazy character style.
              </li>
              <li>
                API configuration would require proper authentication with API keys stored securely in environment variables.
              </li>
              <li>
                Response handling would include error management for API rate limits, timeouts, and other potential issues.
              </li>
            </ul>
          </div>
          
          <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-medium text-purple-800 mb-2">Sample API Code:</h3>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
{`// Example DeepSeek API integration
const transformTextWithAPI = async (text) => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.DEEPSEEK_API_KEY}\`
      },
      body: JSON.stringify({
        prompt: \`Transform this dialogue into crazy character style: "\${text}"\`,
        max_tokens: 150,
        temperature: 0.8,
        style_params: {
          chaotic: true,
          brackets_nesting: 3,
          capitalization_variance: true
        }
      })
    });
    
    const data = await response.json();
    return data.choices[0].text;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw new Error('Failed to transform text');
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrazyDialogueTransformer;