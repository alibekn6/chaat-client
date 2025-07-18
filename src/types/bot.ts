export const BotType = {
  SIMPLE_CHAT: "simple_chat",
  QA_KNOWLEDGE_BASE: "qa_knowledge_base",
  QA_FEEDBACK_BOT: "qa_feedback",
} as const;

export type BotType = typeof BotType[keyof typeof BotType];

export interface Bot {
  id: number; // The API uses number IDs
  owner_id: number;
  bot_name: string;
  requirements: string;
  bot_token: string;
  bot_type: BotType;
  generated_code: string | null;
  status: 'created' | 'generating' | 'ready' | 'deployed' | 'stopped' | 'error';
  is_running: boolean;
  created_at: string;
  pid: number | null;
  knowledge_base_status: 'empty' | 'processing' | 'ready' | 'failed';
}


export type CreateBotData = {
  bot_name: string;
  requirements: string;
  bot_token: string;
  bot_type: BotType;
};

export type UpdateBotData = Partial<Pick<Bot, 'bot_name' | 'requirements' | 'bot_token' | 'bot_type'>>;

export interface KnowledgeBaseStatus {
  bot_id: number;
  knowledge_base_status: 'empty' | 'processing' | 'ready' | 'failed';
  bot_type: BotType;
}

export interface KnowledgeBaseFile {
  id: string;
  filename: string;
  original_name: string;
  file_size: number;
  upload_date: string;
  status: 'ready' | 'processing' | 'failed';
} 