import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'llama-2', name: 'Llama 2' },
  { id: 'mistral-7b', name: 'Mistral 7B' },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedModelName = models.find(m => m.id === selectedModel)?.name || selectedModel;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span>{selectedModelName}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-1">
            {models.map((model) => (
              <li key={model.id}>
                <button
                  type="button"
                  onClick={() => {
                    onModelChange(model.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 ${
                    selectedModel === model.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                  }`}
                >
                  {model.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}