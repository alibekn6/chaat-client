import api from './api';
import type { Bot, CreateBotData, UpdateBotData, KnowledgeBaseStatus, KnowledgeBaseFile } from '../types/bot';

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

  async deployBot(botId: number): Promise<Bot> {
    const response = await api.post<Bot>(`/ai/bots/${botId}/deploy`);
    return response.data;
  },

  async stopBot(botId: number): Promise<Bot> {
    const response = await api.post<Bot>(`/ai/bots/${botId}/stop`);
    return response.data;
  },

  async uploadKnowledgeBase(botId: number, file: File): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<{ message: string }>(`/ai/bots/${botId}/knowledge/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getKnowledgeBaseStatus(botId: number): Promise<KnowledgeBaseStatus> {
    const response = await api.get<KnowledgeBaseStatus>(`/ai/bots/${botId}/knowledge/status`);
    return response.data;
  },

  async getKnowledgeBaseFiles(botId: number): Promise<KnowledgeBaseFile[]> {
    const response = await api.get<KnowledgeBaseFile[]>(`/ai/bots/${botId}/knowledge/files`);
    return response.data;
  },

  async deleteKnowledgeBaseFile(botId: number, fileId: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/ai/bots/${botId}/knowledge/files/${fileId}`);
    return response.data;
  },

  async getLink(token: string): Promise<string> {
    // Call Telegram API to get bot info and extract username
    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    if (!response.ok) {
      throw new Error('Failed to fetch bot info from Telegram');
    }
    const data = await response.json();
    if (!data.ok || !data.result || !data.result.username) {
      throw new Error('Invalid response from Telegram API');
    }
    return data.result.username;
  }
}; 