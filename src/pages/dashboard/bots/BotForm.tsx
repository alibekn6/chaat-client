import { useState, useEffect, type FormEvent } from 'react';
import type { Bot, CreateBotData, UpdateBotData } from '@/types/bot';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BotFormProps {
  initialData: Bot | null;
  onSubmit: (data: CreateBotData | UpdateBotData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function BotForm({ initialData, onSubmit, onCancel, isSubmitting }: BotFormProps) {
  const [formData, setFormData] = useState({
    bot_name: '',
    requirements: '',
    bot_token: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        bot_name: initialData.bot_name,
        requirements: initialData.requirements,
        bot_token: initialData.bot_token,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formTitle = initialData ? 'Edit Bot' : 'Create New Bot';
  const submitButtonText = initialData ? 'Save Changes' : 'Create Bot';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">{formTitle}</h2>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="bot_name" className="text-left">Bot Name</Label>
        <Input type="text" name="bot_name" id="bot_name"  value={formData.bot_name} onChange={handleChange} required placeholder="A public name for your Telegram bot" />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="requirements" className="text-left">Requirements</Label>
        <Textarea name="requirements" id="requirements" value={formData.requirements} onChange={handleChange} required placeholder="Describe what your bot should do. Be specific!" rows={5} />
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="bot_token" className="text-left mb-5">Telegram Token</Label>
        <Input type="password" name="bot_token" id="bot_token" value={formData.bot_token} onChange={handleChange} required placeholder="Paste your token from BotFather" />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : submitButtonText}
        </Button>
      </div>
    </form>
  );
} 