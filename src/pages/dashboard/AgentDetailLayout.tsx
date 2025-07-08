import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { botService } from '../../services/botService';
import type { Bot, UpdateBotData } from '../../types/bot';
import { BotType } from '../../types/bot';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Modal } from './bots/Modal';
import { BotForm } from './bots/BotForm';
import { KnowledgeBaseManager } from './bots/KnowledgeBaseManager';

// Helper for status badge, consistent with dashboard
const StatusBadge = ({ status, is_running }: { status: Bot['status'], is_running: boolean }) => {
  let color = 'bg-gray-500';
  let text = status.charAt(0).toUpperCase() + status.slice(1);
  if (is_running) {
    color = 'bg-green-500';
    text = 'Running';
  } else if (status === 'generated' || status === 'stopped') {
    color = 'bg-blue-500';
  } else if (status === 'error') {
    color = 'bg-red-500';
  }
  return <Badge className={`${color} text-white`}>{text}</Badge>;
};

export function AgentDetailLayout() {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  useEffect(() => {
    const fetchBot = async () => {
      if (!botId) return;
      
      try {
        setLoading(true);
        const fetchedBot = await botService.getBotById(parseInt(botId));
        setBot(fetchedBot);
      } catch (err) {
        console.error('Error fetching bot:', err);
        setError('Failed to load bot details');
      } finally {
        setLoading(false);
      }
    };

    fetchBot();
  }, [botId]);

  const handleUpdate = async (data: UpdateBotData) => {
    if (!bot) return;
    
    try {
      setIsSubmitting(true);
      const updatedBot = await botService.updateBot(bot.id, data);
      setBot(updatedBot);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error updating bot:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    if (!bot) return;
    
    try {
      setIsSubmitting(true);
      await botService.generateBotCode(bot.id);
      const updatedBot = await botService.getBotById(bot.id);
      setBot(updatedBot);
    } catch (err) {
      console.error('Error generating bot:', err);
      alert('Failed to generate bot. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleBot = async () => {
    if (!bot) return;
    
    try {
      setIsSubmitting(true);
      if (bot.is_running) {
        await botService.stopBot(bot.id);
      } else {
        await botService.deployBot(bot.id);
      }
      const updatedBot = await botService.getBotById(bot.id);
      setBot(updatedBot);
    } catch (err) {
      console.error('Error toggling bot:', err);
      alert('Failed to toggle bot. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBot = async () => {
    if (!bot) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this bot? This action cannot be undone.');
    if (!confirmed) return;
    
    try {
      setIsSubmitting(true);
      await botService.deleteBot(bot.id);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error deleting bot:', err);
      alert('Failed to delete bot. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !bot) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Bot not found'}</p>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/dashboard" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border flex flex-col mb-6">
          <div className="p-4 md:p-6 mb-auto">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-xl md:text-3xl font-bold flex-grow break-words">{bot.bot_name}</h1>
              <div className="flex items-center gap-2">
                <StatusBadge status={bot.status} is_running={bot.is_running} />
                {bot.status === 'created' && (
                  <Button onClick={handleGenerate} disabled={isSubmitting} className="hidden md:inline-flex px-4 py-2">
                    {isSubmitting ? 'Generating...' : 'Generate Code'}
                  </Button>
                )}
                {(bot.status === 'generated' || bot.status === 'stopped') && !bot.is_running && (
                  <Button onClick={handleToggleBot} disabled={isSubmitting} className="hidden md:inline-flex px-4 py-2">
                    {isSubmitting ? 'Deploying...' : 'Deploy'}
                  </Button>
                )}
                {bot.is_running && (
                  <Button variant="outline" onClick={handleToggleBot} disabled={isSubmitting} className="hidden md:inline-flex px-4 py-2">
                    {isSubmitting ? 'Stopping...' : 'Stop'}
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4 md:hidden">
              {bot.status === 'created' && (
                <Button onClick={handleGenerate} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Generating...' : 'Generate Code'}
                </Button>
              )}
              {(bot.status === 'generated' || bot.status === 'stopped') && !bot.is_running && (
                <Button onClick={handleToggleBot} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Deploying...' : 'Deploy'}
                </Button>
              )}
              {bot.is_running && (
                <Button variant="outline" onClick={handleToggleBot} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Stopping...' : 'Stop'}
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm md:text-base break-words"><span className="font-semibold">Requirements:</span> {bot.requirements}</p>
              <p className="text-xs md:text-sm text-gray-500 break-all"><span className="font-semibold">Token:</span> {bot.bot_token.substring(0, 12)}...</p>
            </div>
          </div>
          <div className="p-3 md:p-4 border-t bg-gray-50 flex justify-end gap-2 rounded-b-lg">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Edit</Button>
            <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50" onClick={handleDeleteBot}>Delete</Button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
            <h2 className="text-xl md:text-2xl font-semibold">Generated Code</h2>
            {bot.generated_code && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsCodeVisible(!isCodeVisible)}
                className="flex items-center gap-2 self-start md:self-auto"
              >
                {isCodeVisible ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Hide Code
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Show Code
                  </>
                )}
              </Button>
            )}
          </div>
          
          {bot.generated_code ? (
            isCodeVisible ? (
              <SyntaxHighlighter language="python" style={vscDarkPlus} showLineNumbers>
                {bot.generated_code}
              </SyntaxHighlighter>
            ) : (
              <div className="bg-gray-100 border rounded-lg p-6 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p>Click "Show Code" to view the generated code</p>
              </div>
            )
          ) : (
            <p className="text-gray-500">Code has not been generated for this bot yet.</p>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BotForm 
          initialData={bot}
          onSubmit={handleUpdate}
          onCancel={() => setIsModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {bot.bot_type === BotType.QA_KNOWLEDGE_BASE && (
        <div className="px-4 md:px-0">
          <KnowledgeBaseManager bot={bot} onBotUpdate={setBot} />
        </div>
      )}
    </>
  );
} 