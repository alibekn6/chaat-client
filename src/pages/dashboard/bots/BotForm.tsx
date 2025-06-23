import { useState, useEffect, type FormEvent } from 'react';
import type { Bot, CreateBotData } from '@/types/bot';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BotFormProps {
  initialData: Bot | null;
  onSubmit: (data: CreateBotData | Bot) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function BotForm({ initialData, onSubmit, onCancel, isSubmitting }: BotFormProps) {
  const [formData, setFormData] = useState<CreateBotData>({
    name: '',
    description: '',
    bot_name: '',
    bot_greeting: '',
    bot_tonality: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...formData, id: initialData.id } : formData);
  };

  const formTitle = initialData ? 'Edit bot' : 'Create new bot';
  const submitButtonText = initialData ? 'Save Changes' : 'Create Bot';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">{formTitle}</h2>
      
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
        <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Internal name for your bot" />
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</Label>
        <Textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="What does this bot do?"></Textarea>
      </div>

      <div>
        <Label htmlFor="bot_name" className="block text-sm font-medium text-gray-700">Bot Name</Label>
        <Input type="text" name="bot_name" id="bot_name" value={formData.bot_name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Public name of the chatbot" />
      </div>

      <div>
        <Label htmlFor="bot_greeting" className="block text-sm font-medium text-gray-700">Bot Greeting</Label>
        <Input type="text" name="bot_greeting" id="bot_greeting" value={formData.bot_greeting} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="How does your bot welcome users?" />
      </div>

      <div>
        <Label htmlFor="bot_tonality" className="block text-sm font-medium text-gray-700">Bot Tonality</Label>
        <Input type="text" name="bot_tonality" id="bot_tonality" value={formData.bot_tonality} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Friendly, Formal, Witty" />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : submitButtonText}
        </Button>
      </div>
    </form>
  );
} 