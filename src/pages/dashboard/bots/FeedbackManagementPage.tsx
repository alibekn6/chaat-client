import { useState, useEffect, useCallback } from 'react';
import type { Bot } from '@/types/bot';
import type { Feedback, FeedbackStats, FeedbackFilterOptions } from '@/types/feedback';
import { feedbackService } from '@/services/feedbackService';
import { FeedbacksList } from './FeedbacksList';
import { FeedbackStatsComponent } from './FeedbackStats';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FeedbackManagementPageProps {
  bot: Bot;
}

export function FeedbackManagementPage({ bot }: FeedbackManagementPageProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [filters, setFilters] = useState<FeedbackFilterOptions>({
    status: 'all',
    rating: 'all',
    page: 1,
    limit: 10
  });
  const [error, setError] = useState<string | null>(null);

  // Load feedbacks with current filters
  const loadFeedbacks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Loading feedbacks for bot:', bot.id, 'with filters:', filters);
      const result = await feedbackService.getFeedbacks(bot.id, filters);
      console.log('Feedback API response:', result);
      console.log('First feedback item:', result.feedbacks[0]);
      setFeedbacks(result.feedbacks);
      setTotal(result.total);
    } catch (err) {
      console.error('Error loading feedbacks:', err);
      setError(err instanceof Error ? err.message : 'Failed to load feedbacks');
    } finally {
      setIsLoading(false);
    }
  }, [bot.id, filters]);

  // Load statistics
  const loadStats = useCallback(async () => {
    try {
      console.log('Loading feedback stats for bot:', bot.id);
      const statsData = await feedbackService.getFeedbackStats(bot.id);
      console.log('Feedback stats response:', statsData);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading feedback stats:', err);
    }
  }, [bot.id]);

  // Initial load
  useEffect(() => {
    loadFeedbacks();
    loadStats();
  }, [loadFeedbacks, loadStats]);

  // Handle status update
  const handleStatusUpdate = async (feedbackId: number, status: Feedback['status']) => {
    try {
      setIsUpdating(true);
      await feedbackService.updateFeedbackStatus(bot.id, feedbackId, { status });
      
      // Update local state
      setFeedbacks(prev => 
        prev.map(feedback => 
          feedback.id === feedbackId ? { ...feedback, status } : feedback
        )
      );
      
      // Reload stats to reflect changes
      await loadStats();
    } catch (err) {
      console.error('Error updating feedback status:', err);
      alert('Failed to update feedback status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete
  const handleDelete = async (feedbackId: number) => {
    try {
      setIsUpdating(true);
      await feedbackService.deleteFeedback(bot.id, feedbackId);
      
      // Remove from local state
      setFeedbacks(prev => prev.filter(feedback => feedback.id !== feedbackId));
      setTotal(prev => prev - 1);
      
      // Reload stats to reflect changes
      await loadStats();
    } catch (err) {
      console.error('Error deleting feedback:', err);
      alert('Failed to delete feedback. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle filters change
  const handleFiltersChange = (newFilters: FeedbackFilterOptions) => {
    setFilters(newFilters);
  };

  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      setIsUpdating(true);
      const result = await feedbackService.markAllAsRead(bot.id);
      
      if (result.updated_count > 0) {
        // Update local state
        setFeedbacks(prev => 
          prev.map(feedback => 
            feedback.status === 'new' ? { ...feedback, status: 'read' as const } : feedback
          )
        );
        
        // Reload stats
        await loadStats();
        
        alert(`Marked ${result.updated_count} feedbacks as read.`);
      } else {
        alert('No new feedbacks to mark as read.');
      }
    } catch (err) {
      console.error('Error marking all as read:', err);
      alert('Failed to mark feedbacks as read. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    loadFeedbacks();
    loadStats();
  };

  if (error) {
    return (
      <Card className="p-8 text-center">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-medium mb-2">Error Loading Feedbacks</h3>
          <p className="text-sm">{error}</p>
        </div>
        <Button onClick={handleRefresh} variant="outline">
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Feedback</h2>
          <p className="text-gray-600">Manage and respond to customer feedback for {bot.bot_name}</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </Button>
          
          {stats && stats.new_feedbacks > 0 && (
            <Button onClick={handleMarkAllAsRead} disabled={isUpdating}>
              Mark All as Read ({stats.new_feedbacks})
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <FeedbackStatsComponent stats={stats} isLoading={isLoading && !stats} />

      {/* Feedbacks List */}
      <div>
        <FeedbacksList
          feedbacks={feedbacks}
          total={total}
          isLoading={isLoading}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDelete}
          onFiltersChange={handleFiltersChange}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
} 