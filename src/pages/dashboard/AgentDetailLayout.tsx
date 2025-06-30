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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBot = () => {
    if (!botId) return;
    botService.getBotById(parseInt(botId, 10))
      .then(setBot)
      .catch(err => {
        console.error(err);
        setError('Failed to fetch bot details.');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchBot();
  }, [botId]);

  const handleGenerate = async () => {
    if (!bot) return;
    setIsActionLoading(true);
    try {
      await botService.generateBotCode(bot.id);
      fetchBot();
    } catch (err) {
      console.error('Failed to generate code:', err);
      setError('Failed to generate code for the bot. Please try again.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!bot) return;
    setIsActionLoading(true);
    try {
      await botService.deployBot(bot.id);
      fetchBot();
    } catch (err) {
      console.error('Failed to deploy bot:', err);
      setError('Failed to deploy the bot. Please try again.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleStop = async () => {
    if (!bot) return;
    setIsActionLoading(true);
    try {
      await botService.stopBot(bot.id);
      fetchBot();
    } catch (err) {
      console.error('Failed to stop bot:', err);
      setError('Failed to stop the bot. Please try again.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdate = async (data: UpdateBotData) => {
    if (!bot) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await botService.updateBot(bot.id, data);
      setIsModalOpen(false);
      fetchBot();
    } catch (err) {
      console.error('Failed to update bot', err);
      setError('Failed to update bot. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!bot) return;
    if (window.confirm(`Are you sure you want to delete the bot "${bot.bot_name}"?`)) {
      try {
        await botService.deleteBot(bot.id);
        navigate('/dashboard');
      } catch (err) {
        console.error('Failed to delete bot:', err);
        setError('Failed to delete the bot. Please try again.');
      }
    }
  };

  if (isLoading) return <div className="p-8">Loading bot details...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!bot) return <div className="p-8">Bot not found.</div>;

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/dashboard" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border flex flex-col mb-6">
          <div className="p-6 mb-auto">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold flex-grow">{bot.bot_name}</h1>
              <div className="flex items-center gap-4">
                <StatusBadge status={bot.status} is_running={bot.is_running} />
                {bot.status === 'created' && (
                  <Button onClick={handleGenerate} disabled={isActionLoading}>
                    {isActionLoading ? 'Generating...' : 'Generate Code'}
                  </Button>
                )}
                {(bot.status === 'generated' || bot.status === 'stopped') && !bot.is_running && (
                  <Button onClick={handleDeploy} disabled={isActionLoading}>
                    {isActionLoading ? 'Deploying...' : 'Deploy'}
                  </Button>
                )}
                {bot.is_running && (
                  <Button variant="outline" onClick={handleStop} disabled={isActionLoading}>
                    {isActionLoading ? 'Stopping...' : 'Stop'}
                  </Button>
                )}
              </div>
            </div>
            {error && isActionLoading && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <p className="mb-2"><span className="font-semibold">Requirements:</span> {bot.requirements}</p>
            <p className="text-sm text-gray-500"><span className="font-semibold">Token:</span> {bot.bot_token.substring(0, 12)}...</p>
          </div>
          <div className="p-4 border-t bg-gray-50 flex justify-end gap-2 rounded-b-lg">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Edit</Button>
            <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Generated Code</h2>
          {bot.generated_code ? (
            <SyntaxHighlighter language="python" style={vscDarkPlus} showLineNumbers>
              {bot.generated_code}
            </SyntaxHighlighter>
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
        <div className="mt-6">
          <KnowledgeBaseManager bot={bot} onBotUpdate={setBot} />
        </div>
      )}
    </>
  );
} 