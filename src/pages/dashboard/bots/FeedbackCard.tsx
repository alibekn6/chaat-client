import { useState } from "react";
import type { Feedback } from "@/types/feedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_CONFIG } from "../../../config";

interface FeedbackCardProps {
  feedback: Feedback;
  onStatusUpdate?: (feedbackId: number, status: Feedback["status"]) => void;
  onDelete?: (feedbackId: number) => void;
  isUpdating?: boolean;
}

const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-800",
  read: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
};

const STATUS_LABELS = {
  new: "New",
  read: "Read",
  resolved: "Resolved",
};

export function FeedbackCard({
  feedback,
  onStatusUpdate,
  onDelete,
  isUpdating = false,
}: FeedbackCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusChange = (newStatus: Feedback["status"]) => {
    if (onStatusUpdate) {
      onStatusUpdate(feedback.id, newStatus);
    }
  };

  const handleDelete = () => {
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this feedback?")
    ) {
      onDelete(feedback.id);
    }
  };

  return (
    <>
      <Card className="p-4 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge className={STATUS_COLORS[feedback.status]}>
              {STATUS_LABELS[feedback.status]}
            </Badge>
            {renderStars(feedback.rating)}
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(feedback.created_at)}
          </span>
        </div>

        {/* User Info */}
        <div className="text-sm text-gray-600">
          <a
            className="text-gray-500 underline"
            href={`https://t.me/${feedback.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-medium">
              {feedback.first_name || feedback.last_name
                ? `${feedback.first_name || ""} ${feedback.last_name || ""}`.trim()
                : feedback.username
                  ? `@${feedback.username}`
                  : `User ${feedback.user_telegram_id}`}
            </span>
            <span className="text-gray-400 ml-2">
              ID: {feedback.user_telegram_id}
            </span>
          </a>
        </div>

        {/* Message */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {feedback.message_text}
          </p>
        </div>

        {/* Images */}
        {feedback.images && feedback.images.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Attached Images ({feedback.images.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {feedback.images.map((image) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg border"
                  onClick={() =>
                    setSelectedImage(`${API_CONFIG.BASE_URL}${image.file_path}`)
                  }
                >
                  <img
                    src={`${API_CONFIG.BASE_URL}${image.file_path}`}
                    alt={image.original_filename}
                    className="w-full h-full max-h-screen object-cover transition-transform group-hover:scale-105"
                  />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" /> */}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {feedback.status === "new" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange("read")}
              disabled={isUpdating}
            >
              Mark as Read
            </Button>
          )}
          {feedback.status !== "resolved" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange("resolved")}
              disabled={isUpdating}
            >
              Mark as Resolved
            </Button>
          )}
          {feedback.status === "resolved" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange("new")}
              disabled={isUpdating}
            >
              Reopen
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50 ml-auto"
            onClick={handleDelete}
            disabled={isUpdating}
          >
            Delete
          </Button>
        </div>
      </Card>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Feedback attachment"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
