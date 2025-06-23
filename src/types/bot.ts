export interface Bot {
  id: string; // Using string to accommodate UUIDs
  name: string;
  description: string;
  bot_name: string;
  bot_greeting: string;
  bot_tonality: string;
}

// For creating a bot, the ID is not needed
export type CreateBotData = Omit<Bot, 'id'>;

// For updating a bot, all fields are optional
export type UpdateBotData = Partial<CreateBotData>; 