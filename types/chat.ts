export type MessageRole = "user" | "assistant" | "system" | "tool";

export interface ChatMessage {
  role: MessageRole;
  content: string;
  toolCalls?: unknown[];
  timestamp: Date;
}

export interface IConversation {
  _id: string;
  user?: string;
  title: string;
  messages: ChatMessage[];
  context?: {
    lastViewedProducts?: string[];
    currentPage?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
