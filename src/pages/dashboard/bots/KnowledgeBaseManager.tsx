import { useState, useEffect } from 'react';
import { botService } from '@/services/botService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Bot, KnowledgeBaseStatus } from '@/types/bot';
import { BotType as BotTypeConstants } from '@/types/bot';

interface KnowledgeBaseManagerProps {
  bot: Bot;
  onBotUpdate: (updatedBot: Bot) => void;
}

const STATUS_COLORS = {
  empty: 'bg-gray-500',
  processing: 'bg-yellow-500',
  ready: 'bg-green-500',
  failed: 'bg-red-500',
};

const STATUS_LABELS = {
  empty: 'No Knowledge Base',
  processing: 'Processing',
  ready: 'Ready',
  failed: 'Failed',
};

export function KnowledgeBaseManager({ bot, onBotUpdate }: KnowledgeBaseManagerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<KnowledgeBaseStatus | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const isQABot = bot.bot_type === BotTypeConstants.QA_KNOWLEDGE_BASE;

  useEffect(() => {
    if (isQABot) {
      loadStatus();
    }
  }, [isQABot, bot.id]);

  useEffect(() => {
    if (status?.knowledge_base_status === 'processing' && !isPolling) {
      setIsPolling(true);
      const interval = setInterval(async () => {
        const newStatus = await botService.getKnowledgeBaseStatus(bot.id);
        setStatus(newStatus);
        
        if (newStatus.knowledge_base_status !== 'processing') {
          setIsPolling(false);
          clearInterval(interval);
          // Update the bot object as well
          const updatedBot = await botService.getBotById(bot.id);
          onBotUpdate(updatedBot);
        }
      }, 3000);

      return () => {
        clearInterval(interval);
        setIsPolling(false);
      };
    }
  }, [status?.knowledge_base_status, isPolling, bot.id, onBotUpdate]);

  const loadStatus = async () => {
    try {
      const statusData = await botService.getKnowledgeBaseStatus(bot.id);
      setStatus(statusData);
    } catch (error) {
      console.error('Failed to load knowledge base status:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF file');
      e.target.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await botService.uploadKnowledgeBase(bot.id, selectedFile);
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('knowledge_file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // Reload status to start polling
      await loadStatus();
    } catch (error) {
      console.error('Failed to upload knowledge base:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isQABot) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Knowledge Base</h3>
          {status && (
            <Badge className={STATUS_COLORS[status.knowledge_base_status]}>
              {STATUS_LABELS[status.knowledge_base_status]}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Upload PDF documents that your bot should use to answer questions. The bot will only answer questions based on the content of these documents.
        </p>

        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="knowledge_file">Upload PDF File</Label>
            <Input 
              type="file" 
              id="knowledge_file" 
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isUploading || status?.knowledge_base_status === 'processing'}
              className="file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
            />
            {selectedFile && (
              <p className="text-sm text-green-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isUploading || status?.knowledge_base_status === 'processing'}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Knowledge Base'}
          </Button>
        </div>

        {status?.knowledge_base_status === 'processing' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-700">
              📚 Processing your knowledge base... This may take a few minutes.
            </p>
          </div>
        )}

        {status?.knowledge_base_status === 'ready' && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-sm text-green-700">
              ✅ Knowledge base is ready! Your bot can now answer questions based on your uploaded documents.
            </p>
          </div>
        )}

        {status?.knowledge_base_status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-700">
              ❌ Failed to process knowledge base. Please try uploading again or contact support.
            </p>
          </div>
        )}

        {status?.knowledge_base_status === 'empty' && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-700">
              💡 No knowledge base uploaded yet. Upload a PDF to get started!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
} 