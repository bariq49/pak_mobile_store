"use client";

import type { FC } from "react";
import StarIcon from "@/components/icons/star-icon";
import { formatDate } from "@/utils/formate-date";
import {
  useMarkHelpfulMutation,
  useMarkNotHelpfulMutation,
} from "@/services/customer/use-submit-review";
import { Loader2, ThumbsUp, ThumbsDown } from "lucide-react";

interface ReviewProps {
  review: any;
  index: number;
  className?: string;
}

const ReviewCard: FC<ReviewProps> = ({ review, index, className = "" }) => {
  const userInitial = review?.user?.name
    ? review.user.name.charAt(0).toUpperCase()
    : "U";

  const { mutate: markHelpful, isPending: isHelpfulLoading } =
    useMarkHelpfulMutation();
  const { mutate: markNotHelpful, isPending: isNotHelpfulLoading } =
    useMarkNotHelpfulMutation();

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };
console.log("review", review);
  return (
    <div className={`w-full ${className}`}>
      {index > 0 && (
        <div className="border-t border-gray-100 mb-4 sm:mb-6"></div>
      )}

      {/* Card Container */}
      <div className="bg-white transition-all duration-200 rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md p-4 sm:p-6">
        <div className="flex gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${getAvatarColor(
                review?.user?.name || "User"
              )} flex items-center justify-center shadow-sm ring-2 ring-white`}
            >
              <span className="text-white text-sm sm:text-base font-semibold">
                {userInitial}
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div className="flex-1 min-w-0">
            {/* Header - Responsive Layout */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
              <h4 className="text-gray-900 font-semibold text-base sm:text-lg truncate">
                {review?.user?.name || "Anonymous User"}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="hidden sm:inline text-gray-400">•</span>
                <time>{formatDate(review.createdAt)}</time>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <StarIcon
                    key={idx}
                    color={idx < review.rating ? "#F59E0B" : "#E5E7EB"}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                ))}
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-700">
                {review.rating}/5 stars
              </span>
            </div>

            {/* Title */}
            {review?.title && (
              <h5 className="text-gray-900 font-semibold text-base sm:text-lg mb-3 leading-tight break-words">
                {review.title}
              </h5>
            )}

            {/* Comment */}
            <div className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 break-words">
              {review.comment}
            </div>

            {/* Action Buttons - Responsive Layout */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                disabled={isHelpfulLoading || isNotHelpfulLoading}
                onClick={() => markHelpful(review._id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isHelpfulLoading || isNotHelpfulLoading
                    ? "opacity-50 cursor-not-allowed bg-gray-100"
                    : "hover:bg-green-50 hover:text-green-600 text-gray-600 active:scale-95"
                }`}
              >
                {isHelpfulLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ThumbsUp className="w-4 h-4" />
                )}
                <span className="font-semibold">{review.helpful || 0}</span>
                {/* Text only visible on desktop */}
                <span className="hidden sm:inline">Helpful</span>
              </button>

              <button
                disabled={isHelpfulLoading || isNotHelpfulLoading}
                onClick={() => markNotHelpful(review._id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isHelpfulLoading || isNotHelpfulLoading
                    ? "opacity-50 cursor-not-allowed bg-gray-100"
                    : "hover:bg-red-50 hover:text-red-600 text-gray-600 active:scale-95"
                }`}
              >
                {isNotHelpfulLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ThumbsDown className="w-4 h-4" />
                )}
                <span className="font-semibold">{review.not_helpful || 0}</span>
                {/* Text only visible on desktop */}
                <span className="hidden sm:inline">Not helpful</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
