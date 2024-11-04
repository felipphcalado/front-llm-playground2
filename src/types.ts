export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Collection {
  id: string;
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}