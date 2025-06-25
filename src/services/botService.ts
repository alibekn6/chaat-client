import api from './api';
import type { Bot, CreateBotData, UpdateBotData } from '../types/bot';

export const botService = {
  async getBots(): Promise<Bot[]> {
    const response = await api.get<Bot[]>('/bots/');
    return response.data;
  },

  async getBotById(botId: number): Promise<Bot> {
    const response = await api.get<Bot>(`/bots/${botId}`);
    return response.data;
  },

  async createBot(data: CreateBotData): Promise<Bot> {
    const response = await api.post<Bot>('/bots/', data);
    return response.data;
  },

  async updateBot(botId: number, data: UpdateBotData): Promise<Bot> {
    const response = await api.put<Bot>(`/bots/${botId}`, data);
    return response.data;
  },

  async deleteBot(botId: number): Promise<void> {
    await api.delete(`/bots/${botId}`);
  },

  async generateBotCode(botId: number): Promise<Bot> {
    const response = await api.post<Bot>(`/ai/bots/${botId}/generate`);
    return response.data;
  },

  async deployBot(botId: number): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/ai/bots/${botId}/deploy`);
    return response.data;
  },

  async stopBot(botId: number): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/ai/bots/${botId}/stop`);
    return response.data;
  },
}; 