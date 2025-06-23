import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Bot, CreateBotData } from '../../types/bot';
import { botService } from '../../services/botService';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Modal } from './bots/Modal';
import { BotForm } from './bots/BotForm';

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

  const handleSubmit = async (data: CreateBotData | Bot) => {
    setIsSubmitting(true);
    try {
      if (editingBot && 'id' in data) {
        await botService.updateBot(data.id, data);
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

  const handleDelete = async (botId: string) => {
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bots.map((bot) => (
            <Card key={bot.id} className="flex flex-col">
              <Link to={`/dashboard/${bot.id}`} className="block hover:bg-gray-50 rounded-t-lg p-5">
                <div className="p-4">
                  <h2 className="text-lg font-bold">{bot.name}</h2>
                  <p className="text-sm text-gray-600 truncate">{bot.description}</p>
                </div>
              </Link>
                <div className="p-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => handleOpenEditModal(bot)}>Edit</Button>
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50" onClick={() => handleDelete(bot.id)}>Delete</Button>
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