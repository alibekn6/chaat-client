export interface Feedback {
  id: number;
  bot_id: number;
  user_telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  message_text: string;
  status: "new" | "read" | "resolved";
  images: FeedbackImage[];
  created_at: string;
}

export interface FeedbackImage {
  id: number;
  feedback_id: number;
  file_path: string;        // Доступный URL для просмотра
  storage_type: "local" | "azure";
  file_size: number;
  original_filename: string;
  created_at: string;
}

export interface FeedbackStats {
  total_feedbacks: number;
  new_feedbacks: number;
  read_feedbacks: number;
  resolved_feedbacks: number;
  average_rating: number;
  rating_distribution?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export type CreateFeedbackData = {
  rating: 1 | 2 | 3 | 4 | 5;
  message_text: string;
  images?: File[];  // Для загрузки новых изображений
};

export type UpdateFeedbackStatusData = {
  status: "new" | "read" | "resolved";
};

export type FeedbackFilterOptions = {
  status?: "new" | "read" | "resolved" | "all";
  rating?: 1 | 2 | 3 | 4 | 5 | "all";
  page?: number;
  limit?: number;
}; 