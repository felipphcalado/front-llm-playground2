import React from 'react';
import { Settings, Database, Brain, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { ModelSelector } from './ModelSelector';
import { CollectionSelector } from './CollectionSelector';

interface SidebarProps {
  systemPrompt: string;
  selectedModel: string;
  selectedCollection: string;
  showSettings: boolean;
  onSystemPromptChange: (prompt: string) => void;
  onModelChange: (modelId: string) => void;
  onCollectionChange: (collectionId: string) => void;
  onSettingsToggle: () => void;
  onClearChat: () => void;
}

export function Sidebar({
  systemPrompt,
  selectedModel,
  selectedCollection,
  showSettings,
  onSystemPromptChange,
  onModelChange,
  onCollectionChange,
  onSettingsToggle,
  onClearChat,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-indigo-600" />
        <h1 className="text-xl font-bold text-gray-800">AI Playground</h1>
      </div>
      
      <button
        onClick={onSettingsToggle}
        className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
      >
        <Settings className="w-5 h-5" />
        <span>Settings</span>
        {showSettings ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
      </button>
      
      {showSettings && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={onModelChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collection
            </label>
            <CollectionSelector
              selectedCollection={selectedCollection}
              onCollectionChange={onCollectionChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Prompt
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => onSystemPromptChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Database className="w-4 h-4" />
            <span>Neo4j Connected</span>
          </div>
        </div>
      )}

      <button
        onClick={onClearChat}
        className="mt-auto flex items-center space-x-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
      >
        <Trash2 className="w-5 h-5" />
        <span>Clear Chat</span>
      </button>
    </div>
  );
}