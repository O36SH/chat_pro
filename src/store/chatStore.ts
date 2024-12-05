import { create } from 'zustand';
import { Message } from '../types/chat';
import { socketService } from '../services/socket';

interface ChatState {
  messages: { [chatId: string]: Message[] };
  addMessage: (chatId: string, message: Message) => void;
  setMessages: (chatId: string, messages: Message[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  addMessage: (chatId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),
  setMessages: (chatId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: messages,
      },
    })),
}));

// Subscribe to socket events
socketService.on('message', (message: Message) => {
  useChatStore.getState().addMessage(message.chatId, message);
});