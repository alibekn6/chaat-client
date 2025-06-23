import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { botService } from '../../services/botService';
import type { Bot } from '../../types/bot';

export function AgentDetailLayout() {
  const { botId } = useParams<{ botId: string }>();
  const [bot, setBot] = useState<Bot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (botId) {
      botService.getBotById(botId)
        .then(data => {
          setBot(data);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to fetch bot details.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [botId]);

  if (isLoading) {
    return <div className="p-8">Loading bot details...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!bot) {
    return <div className="p-8">Bot not found.</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-4">
        <Link to="/dashboard" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">{bot.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <p className="mb-2"><span className="font-semibold">Description:</span> {bot.description}</p>
        <p className="mb-2"><span className="font-semibold">Bot Name:</span> {bot.bot_name}</p>
        <p className="mb-2"><span className="font-semibold">Greeting:</span> {bot.bot_greeting}</p>
        <p><span className="font-semibold">Tonality:</span> {bot.bot_tonality}</p>
      </div>
      {/* Future sections like knowledge base management can be added here */}
    </div>
  );
} 