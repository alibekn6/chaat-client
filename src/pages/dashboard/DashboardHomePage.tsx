import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Bot, CreateBotData, UpdateBotData } from '../../types/bot';
import { botService } from '../../services/botService';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Modal } from './bots/Modal';
import { BotForm } from './bots/BotForm';

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

export function DashboardHomePage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadBots();
  }, []);

  async function loadBots() {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedBots = await botService.getBots();
      setBots(fetchedBots);
    } catch (err) {
      setError('Failed to fetch bots. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenCreateModal = () => {
    setEditingBot(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (bot: Bot) => {
    setEditingBot(bot);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBot(null);
  };

  const handleSubmit = async (data: CreateBotData | UpdateBotData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingBot) {
        await botService.updateBot(editingBot.id, data as UpdateBotData);
      } else {
        await botService.createBot(data as CreateBotData);
      }
      handleCloseModal();
      await loadBots();
    } catch (err) {
      setError('Failed to save the bot.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerate = async (botId: number) => {
    try {
      await botService.generateBotCode(botId);
      await loadBots();
    } catch (err) {
      setError(`Failed to generate code for bot ${botId}.`);
      console.error(err);
    }
  };

  const handleDeploy = async (botId: number) => {
    try {
      await botService.deployBot(botId);
      await loadBots();
    } catch (err) {
      setError(`Failed to deploy bot ${botId}.`);
      console.error(err);
    }
  };

  const handleStop = async (botId: number) => {
    try {
      await botService.stopBot(botId);
      await loadBots();
    } catch (err) {
      setError(`Failed to stop bot ${botId}.`);
      console.error(err);
    }
  };

  const handleDelete = async (botId: number) => {
    if (window.confirm('Are you sure you want to delete this bot?')) {
      try {
        await botService.deleteBot(botId);
        setBots(bots.filter(bot => bot.id !== botId));
      } catch (err) {
        setError('Failed to delete the bot.');
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading your bots...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My bots</h1>
        <Button onClick={handleOpenCreateModal}>Create New Bot</Button>
      </div>
      
      {error && <div className="p-4 mb-4 text-red-600 bg-red-100 rounded-md">{error}</div>}

      {bots.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't created any bots yet.</p>
          <Button onClick={handleOpenCreateModal} className="mt-4">Create Your First Bot</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bots.map((bot) => (
            <Card key={bot.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
              <Link to={`/dashboard/${bot.id}`} className="flex-grow">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold">{bot.bot_name}</h2>
                    <StatusBadge status={bot.status} is_running={bot.is_running} />
                  </div>
                  <p className="text-sm text-left text-gray-600 truncate mt-1">{bot.requirements}</p>
                </div>
                <CardContent className="pt-4">
                  <div className="flex flex-col gap-2 text-sm">
                    {bot.status === 'created' && (
                      <Button onClick={(e) => { e.preventDefault(); handleGenerate(bot.id); }}>Generate Code</Button>
                    )}
                    {(bot.status === 'generated' || bot.status === 'stopped') && !bot.is_running && (
                      <Button onClick={(e) => { e.preventDefault(); handleDeploy(bot.id); }}>Deploy</Button>
                    )}
                    {bot.is_running && (
                      <Button variant="outline" onClick={(e) => { e.preventDefault(); handleStop(bot.id); }}>Stop</Button>
                    )}
                  </div>
                </CardContent>
              </Link>
              <div className="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
                <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(bot)}>Edit</Button>
                <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50" onClick={() => handleDelete(bot.id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BotForm 
          initialData={editingBot}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
} 