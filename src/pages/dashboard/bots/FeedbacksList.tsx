import { useState, useEffect } from 'react';
import type { Feedback, FeedbackFilterOptions } from '@/types/feedback';
import { FeedbackCard } from './FeedbackCard';
import { Button } from '@/components/ui/button';

interface FeedbacksListProps {
  feedbacks: Feedback[];
  total: number;
  isLoading?: boolean;
  onStatusUpdate?: (feedbackId: number, status: Feedback['status']) => void;
  onDelete?: (feedbackId: number) => void;
  onFiltersChange?: (filters: FeedbackFilterOptions) => void;
  isUpdating?: boolean;
}

export function FeedbacksList({ 
  feedbacks, 
  total, 
  isLoading = false, 
  onStatusUpdate, 
  onDelete, 
  onFiltersChange,
  isUpdating = false 
}: FeedbacksListProps) {
  const [filters, setFilters] = useState<FeedbackFilterOptions>({
    status: 'all',
    rating: 'all',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof FeedbackFilterOptions, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      ...(key !== 'page' && { page: 1 }) // Reset page when other filters change
    }));
  };

  const totalPages = Math.ceil(total / (filters.limit || 10));

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Filters Skeleton */}
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg animate-pulse">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
        
        {/* List Skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 bg-white border rounded-lg animate-pulse">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-16 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Rating</label>
          <select
            value={filters.rating || 'all'}
            onChange={(e) => handleFilterChange('rating', e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Per Page</label>
          <select
            value={filters.limit || 10}
            onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(filters.status !== 'all' || filters.rating !== 'all') && (
          <div className="flex flex-col justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, status: 'all', rating: 'all', page: 1 }))}
              className="text-sm"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {feedbacks.length} of {total} feedbacks
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Page {filters.page || 1} of {totalPages}
            </span>
          </div>
        )}
      </div>

      {/* Feedbacks List */}
      {feedbacks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No feedbacks found</h3>
          <p className="text-gray-500">
            {filters.status !== 'all' || filters.rating !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'No feedbacks have been submitted yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              onStatusUpdate={onStatusUpdate}
              onDelete={onDelete}
              isUpdating={isUpdating}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('page', (filters.page || 1) - 1)}
            disabled={(filters.page || 1) <= 1}
          >
            Previous
          </Button>
          
          {/* Page Numbers */}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const currentPage = filters.page || 1;
              let pageNumber;
              
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('page', pageNumber)}
                  className="w-10"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('page', (filters.page || 1) + 1)}
            disabled={(filters.page || 1) >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
} 