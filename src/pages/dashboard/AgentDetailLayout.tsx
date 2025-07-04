import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { botService } from '../../services/botService';
import type { Bot, UpdateBotData } from '../../types/bot';
import { BotType } from '../../types/bot';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Modal } from './bots/Modal';
import { BotForm } from './bots/BotForm';
import { KnowledgeBaseManager } from './bots/KnowledgeBaseManager';

// Lazy load SyntaxHighlighter только когда нужно
const SyntaxHighlighter = lazy(() => 
  import('react-syntax-highlighter').then(module => ({
    default: module.Prism
  }))
);

// Lazy load style для SyntaxHighlighter
const syntaxStyle = import('react-syntax-highlighter/dist/esm/styles/prism').then(module => module.vscDarkPlus);

// Loading компонент для кода
const CodeLoader = () => (
  <div className="bg-gray-900 rounded-lg p-4 text-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
    <p className="text-white text-sm">Loading code...</p>
  </div>
);

// Компонент для рендера кода
const CodeRenderer = ({ code }: { code: string }) => {
  const [style, setStyle] = useState<{ [key: string]: React.CSSProperties } | null>(null);

  useEffect(() => {
    syntaxStyle.then(setStyle);
  }, []);

  return (
    <SyntaxHighlighter 
      language="python" 
      style={style || {}} 
      showLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  );
};

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !bot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{bot.bot_name}</h1>
                <p className="text-gray-600 mt-1">{bot.requirements}</p>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge status={bot.status} is_running={bot.is_running} />
                <Badge className="bg-gray-100 text-gray-700">
                  {bot.bot_type === BotType.SIMPLE_CHAT ? 'Conversational' : 'Q&A Knowledge Base'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                <p className="text-gray-600 text-sm">{bot.requirements}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Bot Token</h3>
                <p className="text-gray-600 text-sm font-mono">
                  {bot.bot_token ? '••••••••' + bot.bot_token.slice(-6) : 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button onClick={() => setIsModalOpen(true)} disabled={isSubmitting}>
                Edit Bot
              </Button>
              <Button 
                onClick={handleGenerate} 
                disabled={isSubmitting || !bot.bot_token}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Generating...' : 'Generate Code'}
              </Button>
              <Button 
                onClick={handleToggleBot} 
                disabled={isSubmitting || bot.status !== 'generated'}
                className={bot.is_running ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
              >
                {isSubmitting ? 'Processing...' : bot.is_running ? 'Stop Bot' : 'Start Bot'}
              </Button>
              <Button 
                onClick={handleDeleteBot} 
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Bot
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Code</h2>
              {bot.generated_code && (
                <Button 
                  onClick={() => setIsCodeVisible(!isCodeVisible)}
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  {isCodeVisible ? 'Hide Code' : 'Show Code'}
                </Button>
              )}
            </div>

            {bot.generated_code ? (
              isCodeVisible ? (
                <Suspense fallback={<CodeLoader />}>
                  <CodeRenderer code={bot.generated_code} />
                </Suspense>
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
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <KnowledgeBaseManager bot={bot} onBotUpdate={setBot} />
          </div>
        )}
      </div>
    </>
  );
} 