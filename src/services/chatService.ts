import api from './api';
import { Message, Chat } from '../types/chat';

export const chatService = {
  async getChats(): Promise<Chat[]> {
    const response = await api.get('/chats');
    return response.data;
  },

  async getChatMessages(chatId: string): Promise<Message[]> {
    const response = await api.get(`/chats/${chatId}/messages`);
    return response.data;
  },

  async sendMessage(chatId: string, content: string): Promise<Message> {
    const response = await api.post(`/chats/${chatId}/messages`, { content });
    return response.data;
  }
};