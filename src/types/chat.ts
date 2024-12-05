export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

export type ChatType = 'general' | 'room' | 'private';

export interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  unreadCount: number;
  avatar: string;
  type: ChatType;
  roomId?: string;
}