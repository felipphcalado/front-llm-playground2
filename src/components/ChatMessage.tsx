import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[70%] p-4 rounded-lg ${
          message.role === 'user'
            ? 'bg-indigo-600 text-white'
            : 'bg-white border border-gray-200'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 mt-2 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}