import api from './api';
import type {
  Feedback,
  FeedbackStats,
  CreateFeedbackData,
  UpdateFeedbackStatusData,
  FeedbackFilterOptions
} from '../types/feedback';

class FeedbackService {
  // Получить список отзывов для бота с фильтрацией
  async getFeedbacks(
    botId: number,
    filters: FeedbackFilterOptions = {}
  ): Promise<{ feedbacks: Feedback[]; total: number }> {
    const params = new URLSearchParams();

    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    if (filters.rating && filters.rating !== 'all') {
      params.append('rating', filters.rating.toString());
    }
    if (filters.page) {
      params.append('skip', ((filters.page - 1) * (filters.limit || 100)).toString());
    }
    if (filters.limit) {
      params.append('limit', filters.limit.toString());
    }

    const response = await api.get<{ feedbacks: Feedback[]; total: number } | Feedback[]>(
      `/bots/${botId}/feedbacks?${params.toString()}`
    );
    
    // Адаптируем разные форматы ответа API
    if (Array.isArray(response.data)) {
      // Если API возвращает просто массив
      return {
        feedbacks: response.data,
        total: response.data.length
      };
    } else {
      // Если API возвращает объект с feedbacks и total
      return response.data;
    }
  }

  // Получить конкретный отзыв
  async getFeedback(botId: number, feedbackId: number): Promise<Feedback> {
    const response = await api.get<Feedback>(
      `/bots/${botId}/feedbacks/${feedbackId}`
    );
    return response.data;
  }

  // Обновить статус отзыва
  async updateFeedbackStatus(
    botId: number,
    feedbackId: number,
    status: UpdateFeedbackStatusData
  ): Promise<Feedback> {
    const response = await api.patch<Feedback>(
      `/bots/${botId}/feedbacks/${feedbackId}/status`,
      status
    );
    return response.data;
  }

  // Удалить отзыв
  async deleteFeedback(botId: number, feedbackId: number): Promise<void> {
    await api.delete(`/bots/${botId}/feedbacks/${feedbackId}`);
  }

  // Получить статистику отзывов
  async getFeedbackStats(botId: number): Promise<FeedbackStats> {
    const response = await api.get<any>(
      `/bots/${botId}/feedbacks/stats`
    );
    
    // Адаптируем формат API к нашему интерфейсу
    const apiData = response.data;
    
    return {
      total_feedbacks: apiData.total_count || 0,
      new_feedbacks: apiData.new_count || 0,
      read_feedbacks: apiData.read_count || 0,
      resolved_feedbacks: apiData.replied_count || 0, // replied_count = resolved
      average_rating: apiData.average_rating || 0,
      rating_distribution: apiData.rating_distribution || {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    };
  }

  // Пометить все отзывы как прочитанные
  async markAllAsRead(botId: number): Promise<{ updated_count: number }> {
    const response = await api.patch<{ updated_count: number }>(
      `/bots/${botId}/feedbacks/mark-all-read`
    );
    return response.data;
  }

  // Создать отзыв (используется ботом)
  async createFeedback(
    botId: number,
    data: CreateFeedbackData & {
      user_telegram_id: number;
      username?: string;
      first_name?: string;
      last_name?: string;
    }
  ): Promise<Feedback> {
    const formData = new FormData();
    
    formData.append('rating', data.rating.toString());
    formData.append('message_text', data.message_text);
    formData.append('user_telegram_id', data.user_telegram_id.toString());
    
    if (data.username) formData.append('username', data.username);
    if (data.first_name) formData.append('first_name', data.first_name);
    if (data.last_name) formData.append('last_name', data.last_name);
    
    if (data.images) {
      data.images.forEach(image => formData.append('images', image));
    }

    const response = await api.post<Feedback>(
      `/bots/${botId}/feedbacks`,
      formData
    );
    return response.data;
  }
}

export const feedbackService = new FeedbackService();