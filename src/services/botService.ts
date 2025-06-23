import api from './api';
import type { Bot, CreateBotData, UpdateBotData } from '../types/bot';

export const botService = {
  async getBots(): Promise<Bot[]> {
    const response = await api.get<Bot[]>('/bots/');
    return response.data;
  },

  async getBotById(botId: string): Promise<Bot> {
    const response = await api.get<Bot>(`/bots/${botId}`);
    return response.data;
  },


  async createBot(data: CreateBotData): Promise<Bot> {
    const response = await api.post<Bot>('/bots/', data);
    return response.data;
  },

  async updateBot(botId: string, data: UpdateBotData): Promise<Bot> {
    const response = await api.put<Bot>(`/bots/${botId}`, data);
    return response.data;
  },

  async deleteBot(botId: string): Promise<void> {
    await api.delete(`/bots/${botId}`);
  },
}; 