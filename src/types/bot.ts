export interface Bot {
  id: number; // The API uses number IDs
  owner_id: number;
  bot_name: string;
  requirements: string;
  bot_token: string;
  generated_code: string | null;
  status: 'created' | 'generated' | 'running' | 'stopped' | 'error';
  is_running: boolean;
  created_at: string;
}

// For creating a bot, we only need these three fields
export type CreateBotData = {
  bot_name: string;
  requirements: string;
  bot_token: string;
};

// For updating a bot, these fields are optional
export type UpdateBotData = Partial<Pick<Bot, 'bot_name' | 'requirements' | 'bot_token'>>; 