import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant.');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || loading) {
      return;
    }

    // Add user message immediately
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Add AI response after a simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        role: 'assistant',
        content: `I'm using ${selectedModel} model with the ${selectedCollection || 'default'} collection.\n\nThis is a simulated response. In production, this would be integrated with LlamaIndex and Neo4j.`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Add error message if something goes wrong
      const errorMessage: Message = {
        role: 'system',
        content: 'An error occurred while processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        systemPrompt={systemPrompt}
        selectedModel={selectedModel}
        selectedCollection={selectedCollection}
        showSettings={showSettings}
        onSystemPromptChange={setSystemPrompt}
        onModelChange={setSelectedModel}
        onCollectionChange={setSelectedCollection}
        onSettingsToggle={() => setShowSettings(!showSettings)}
        onClearChat={() => setMessages([])}
      />

      <div className="flex-1 flex flex-col max-h-screen">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <ChatInput
          input={input}
          loading={loading}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;