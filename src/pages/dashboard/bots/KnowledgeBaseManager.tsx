import { useState, useEffect, useRef } from 'react';
import { botService } from '@/services/botService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Bot, KnowledgeBaseStatus, KnowledgeBaseFile } from '@/types/bot';
import { BotType as BotTypeConstants } from '@/types/bot';

interface KnowledgeBaseManagerProps {
  bot: Bot;
  onBotUpdate: (updatedBot: Bot) => void;
}

const STATUS_COLORS = {
  empty: 'bg-gray-100 text-gray-800',
  processing: 'bg-yellow-100 text-yellow-800',
  ready: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
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
  const [files, setFiles] = useState<KnowledgeBaseFile[]>([]);
  const [isDeletingFile, setIsDeletingFile] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isQABot = bot.bot_type === BotTypeConstants.QA_KNOWLEDGE_BASE || bot.bot_type === BotTypeConstants.QA_FEEDBACK_BOT;

  useEffect(() => {
    if (isQABot) {
      loadStatus();
      loadFiles();
    }
  }, [isQABot, bot.id]);

  useEffect(() => {
    if (status?.knowledge_base_status === 'processing' && !pollingIntervalRef.current) {
      console.log('Starting polling for knowledge base processing...');
      
      pollingIntervalRef.current = setInterval(async () => {
        console.log('Polling knowledge base status...');
        try {
          const newStatus = await botService.getKnowledgeBaseStatus(bot.id);
          console.log('New status:', newStatus.knowledge_base_status);
          setStatus(newStatus);
          
          // Reload files to see updated status
          const filesData = await botService.getKnowledgeBaseFiles(bot.id);
          setFiles(filesData);
          
          if (newStatus.knowledge_base_status !== 'processing') {
            console.log('Processing completed! Status:', newStatus.knowledge_base_status);
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
            }
            // Update the bot object as well
            const updatedBot = await botService.getBotById(bot.id);
            onBotUpdate(updatedBot);
          }
        } catch (error) {
          console.error('Error during polling:', error);
        }
      }, 3000);
    } else if (status?.knowledge_base_status !== 'processing' && pollingIntervalRef.current) {
      console.log('Stopping polling - status is not processing');
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    return () => {
      if (pollingIntervalRef.current) {
        console.log('Cleaning up polling interval');
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [status?.knowledge_base_status, bot.id, onBotUpdate]);

  const loadStatus = async () => {
    try {
      const statusData = await botService.getKnowledgeBaseStatus(bot.id);
      setStatus(statusData);
    } catch (error) {
      console.error('Failed to load knowledge base status:', error);
    }
  };

  const loadFiles = async () => {
    try {
      const filesData = await botService.getKnowledgeBaseFiles(bot.id);
      setFiles(filesData);
    } catch (error) {
      console.error('Failed to load knowledge base files:', error);
    }
  };

  const deleteFile = async (fileId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this file?');
    if (!confirmed) return;

    try {
      setIsDeletingFile(fileId);
      await botService.deleteKnowledgeBaseFile(bot.id, fileId);
      await loadFiles();
      await loadStatus();
      const updatedBot = await botService.getBotById(bot.id);
      onBotUpdate(updatedBot);
    } catch (error) {
      console.error('Failed to delete file:', error);
      alert('Failed to delete file. Please try again.');
    } finally {
      setIsDeletingFile(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
      
      // Reload status and files to start polling
      await loadStatus();
      await loadFiles();
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
    <Card className="p-4 md:p-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">Knowledge Base</h3>
          {status && (
            <Badge className={`${STATUS_COLORS[status.knowledge_base_status]} text-xs md:text-sm`}>
              {STATUS_LABELS[status.knowledge_base_status]}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Upload PDF documents that your bot should use to answer questions. The bot will only answer questions based on the content of these documents.
        </p>

        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="knowledge_file" className="text-sm font-medium">Upload PDF File</Label>
            <Input 
              type="file" 
              id="knowledge_file" 
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isUploading || status?.knowledge_base_status === 'processing'}
              className="file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs md:file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
            />
            {selectedFile && (
              <p className="text-xs md:text-sm text-green-600 break-words">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isUploading || status?.knowledge_base_status === 'processing'}
            className="w-full text-sm md:text-base py-2 md:py-3"
            size="sm"
          >
            {isUploading ? 'Uploading...' : 'Upload Knowledge Base'}
          </Button>
        </div>

        {status?.knowledge_base_status === 'processing' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-xs md:text-sm text-yellow-700 leading-relaxed">
              📚 Processing your knowledge base... This may take a few minutes.
            </p>
          </div>
        )}

        {status?.knowledge_base_status === 'ready' && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-xs md:text-sm text-green-700 leading-relaxed">
              ✅ Knowledge base is ready! Your bot can now answer questions based on your uploaded documents.
            </p>
          </div>
        )}

        {status?.knowledge_base_status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-xs md:text-sm text-red-700 leading-relaxed">
              ❌ Failed to process knowledge base. Please try uploading again or contact support.
            </p>
          </div>
        )}

        {status?.knowledge_base_status === 'empty' && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
              💡 No knowledge base uploaded yet. Upload a PDF to get started!
            </p>
          </div>
        )}

        {/* Uploaded Files Section */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* PDF Icon */}
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"/>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z"/>
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.original_name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.file_size)} • {new Date(file.upload_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${STATUS_COLORS[file.status]} text-xs`}>
                      {STATUS_LABELS[file.status]}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteFile(file.id)}
                      disabled={isDeletingFile === file.id}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      {isDeletingFile === file.id ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
} 