import { useState, useEffect, type FormEvent } from 'react';
import type { Bot, CreateBotData, UpdateBotData } from '@/types/bot';
import { BotType } from '@/types/bot';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BotFormProps {
  initialData: Bot | null;
  onSubmit: (data: CreateBotData | UpdateBotData, file?: File | null) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const BOT_TYPES = [
  {
    value: BotType.SIMPLE_CHAT,
    label: "Simple Chat Bot",
    description: "General purpose chatbot for customer interactions"
  },
  {
    value: BotType.QA_KNOWLEDGE_BASE,
    label: "Q&A Knowledge Base Bot",
    description: "Answer questions based on uploaded PDF documents"
  }
];

export function BotForm({ initialData, onSubmit, onCancel, isSubmitting }: BotFormProps) {
  const [formData, setFormData] = useState({
    bot_name: '',
    requirements: '',
    bot_token: '',
    bot_type: BotType.SIMPLE_CHAT as BotType,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        bot_name: initialData.bot_name,
        requirements: initialData.requirements,
        bot_token: initialData.bot_token,
        bot_type: initialData.bot_type,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData, selectedFile);
  };

  const formTitle = initialData ? 'Edit Bot' : 'Create New Bot';
  const submitButtonText = initialData ? 'Save Changes' : 'Create Bot';
  const isQABot = formData.bot_type === BotType.QA_KNOWLEDGE_BASE;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 p-4 md:p-0">
      <h2 className="text-lg md:text-xl font-semibold">{formTitle}</h2>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="bot_name" className="text-left text-sm md:text-base">Bot Name</Label>
        <Input 
          type="text" 
          name="bot_name" 
          id="bot_name" 
          value={formData.bot_name} 
          onChange={handleChange} 
          required 
          placeholder="A public name for your Telegram bot" 
          maxLength={35}
          className="text-sm md:text-base"
          autoComplete="off"
        />
        <p className="text-xs text-muted-foreground">
          {formData.bot_name.length}/35 characters
        </p>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="bot_type" className="text-left text-sm md:text-base">Bot Type</Label>
        <select 
          name="bot_type" 
          id="bot_type" 
          value={formData.bot_type} 
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs md:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          {BOT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {BOT_TYPES.find(type => type.value === formData.bot_type)?.description}
        </p>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="requirements" className="text-left text-sm md:text-base">Requirements</Label>
        <Textarea 
          name="requirements" 
          id="requirements" 
          value={formData.requirements} 
          onChange={handleChange} 
          required 
          placeholder={isQABot 
            ? "Describe how your bot should respond to questions about your documents. Be specific about the tone and style!"
            : "Describe what your bot should do. Be specific about personality, tone, and behavior!"
          } 
          rows={4}
          className="text-sm md:text-base resize-none"
          autoComplete="off"
        />
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="bot_token" className="text-left text-sm md:text-base">Telegram Token</Label>
        <Input 
          type="password" 
          name="bot_token" 
          id="bot_token" 
          value={formData.bot_token} 
          onChange={handleChange} 
          required 
          placeholder="Paste your token from BotFather" 
          className="text-sm md:text-base font-mono"
          autoComplete="new-password"
        />
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          Get your token by creating a bot with @BotFather on Telegram.{' '}
          <a 
            href="https://t.me/BotFather" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            get token
          </a>
          {' '}or{' '}
          <a
            href="https://youtu.be/tPVdosq1OUs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            watch tutorial
          </a>
        </p>
      </div>

      {isQABot && !initialData && (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="knowledge_file" className="text-left text-sm md:text-base">Knowledge Base File (Optional)</Label>
          <Input 
            type="file" 
            name="knowledge_file" 
            id="knowledge_file" 
            accept=".pdf"
            onChange={handleFileChange}
            className="file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs md:file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
          />
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Upload a PDF file that contains information your bot should know about. You can also upload this later.
          </p>
          {selectedFile && (
            <p className="text-xs md:text-sm text-gray-600 break-words">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-end gap-2 md:gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} size="sm" className="md:h-10">Cancel</Button>
        <Button type="submit" disabled={isSubmitting} size="sm" className="md:h-10">
          {isSubmitting ? 'Creating...' : submitButtonText}
        </Button>
      </div>
    </form>
  );
} 