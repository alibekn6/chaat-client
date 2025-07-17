import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { botService } from '../../services/botService';
import type { Bot, UpdateBotData } from '../../types/bot';
import { BotType } from '../../types/bot';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs } from '../../components/ui/tabs';
import { Modal } from './bots/Modal';
import { BotForm } from './bots/BotForm';
import { KnowledgeBaseManager } from './bots/KnowledgeBaseManager';
import { FeedbackManagementPage } from './bots/FeedbackManagementPage';

const StatusBadge = ({ status, is_running }: { status: Bot['status'], is_running: boolean }) => {
  let color = 'bg-gray-500';
  let text = status.charAt(0).toUpperCase() + status.slice(1);
  if (is_running) {
    color = 'bg-green-500';
    text = 'Running';
  } else if (status === 'ready' || status === 'stopped') {
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
  const [copied, setCopied] = useState(false);
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSubmitting) {
      interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);
    } else {
      setDots('');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSubmitting]);

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

  const [botLink, setBotLink] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      if (!bot) return;
      const link = await botService.getLink(bot.bot_token);
      setBotLink(link);
    };
    fetchLink();
  }, [bot]);

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
              <h1 className="text-xl md:text-3xl font-bold flex-grow break-words"><a href={`https://t.me/${botLink}`} target='_blank' rel="noopener noreferrer">{bot.bot_name}</a></h1>
              <div className="flex items-center gap-2">
                <StatusBadge status={bot.status} is_running={bot.is_running} />
                {bot.status === 'created' && (
                  <Button onClick={handleGenerate} disabled={isSubmitting} className="hidden md:inline-flex px-4 py-2">
                    {isSubmitting ? `Generating${dots}` : 'Generate'}
                  </Button>
                )}
                {(['ready', 'generated', 'stopped'].includes(bot.status) && !bot.is_running) && (
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
                  {isSubmitting ? `Generating${dots}` : 'Generate'}
                </Button>
              )}
              {(['ready', 'generated', 'stopped'].includes(bot.status) && !bot.is_running) && (
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
              <p className="text-xs md:text-sm text-gray-500 break-all">
                <span className="font-semibold">Token:</span> ...{bot.bot_token.slice(-6)}
              </p>

              <div className="flex justify-center my-4">
                <button
                  type="button"
                  className="font-mono bg-gray-100 px-3 py-1 rounded text-blue-700 hover:bg-blue-50 border border-gray-200 transition flex items-center gap-2"
                  style={{ cursor: 'pointer' }}
                  onClick={async () => {
                    await navigator.clipboard.writeText(`https://t.me/${botLink}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  <span>{`https://t.me/${botLink}`}</span>
                  {copied ? (
                    <span className="text-green-600 text-xs ml-2">Copied!</span>
                  ) : (
                    <svg className="w-4 h-4 ml-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" stroke="currentColor" fill="none"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" stroke="currentColor" fill="none"/></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="p-3 md:p-4 border-t bg-gray-50 flex justify-end gap-2 rounded-b-lg">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Edit</Button>
            <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50" onClick={handleDeleteBot}>Delete</Button>
          </div>
        </div>
        
        <Tabs
          defaultTab="code"
          tabs={[
            {
              id: 'code',
              label: 'Code',
              content: (
                <div className="space-y-4">
                  {bot.generated_code ? (
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <h3 className="text-lg font-semibold">Generated Code</h3>
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
          </div>
          
                      {isCodeVisible ? (
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
                      )}
                    </div>
          ) : (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <p className="text-gray-500 text-lg">Code has not been generated for this bot yet.</p>
                    </div>
          )}
        </div>
              )
            },
            {
              id: 'knowledge-base',
              label: 'Knowledge Base',
              content: ['qa_knowledge_base', 'qa_feedback'].includes(bot.bot_type) ? (
                <KnowledgeBaseManager bot={bot} onBotUpdate={setBot} />
              ) : (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <p className="text-gray-500 text-lg">Knowledge base is only available for Q&A bots.</p>
                </div>
              )
            },
            {
              id: 'feedback',
              label: 'Feedback',
              content: bot.bot_type === BotType.QA_FEEDBACK_BOT ? (
                <FeedbackManagementPage bot={bot} />
              ) : (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-500 text-lg">Feedback management is only available for Q&A + Feedback bots.</p>
                </div>
              )
            }
          ]}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BotForm 
          initialData={bot}
          onSubmit={handleUpdate}
          onCancel={() => setIsModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </>
  );
} 