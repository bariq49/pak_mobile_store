"use client";
import { Star } from "lucide-react";
import cn from "classnames";
import Button from "@/components/shared/button";

interface RatingSummaryProps {
  data: any;
  className?: string;
  onWriteReview?: () => void;
}

export default function RatingSummary({
  data,
  className,
  onWriteReview,
}: RatingSummaryProps) {
  // Calculate rating distribution from reviews
  const calculateRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const total = data?.reviews?.length || 0;

    data?.reviews?.forEach((review: any) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });

    // Convert to percentages
    const percentages = Object.entries(distribution).map(([star, count]) => ({
      star: Number.parseInt(star),
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }));

    return percentages.reverse(); // Show 5-star first
  };

  const ratingDistribution = calculateRatingDistribution();
  const averageRating = data?.ratingsAverage || 0;
  const totalRatings = data?.ratingsQuantity || data?.reviews?.length || 0;

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star
            key={i}
            className={cn(
              "fill-orange-400 text-orange-400",
              size === "lg" ? "w-5 h-5" : "w-4 h-4"
            )}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star
              className={cn(
                "text-gray-300",
                size === "lg" ? "w-5 h-5" : "w-4 h-4"
              )}
            />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                className={cn(
                  "fill-orange-400 text-orange-400",
                  size === "lg" ? "w-5 h-5" : "w-4 h-4"
                )}
              />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={cn(
              "text-gray-300",
              size === "lg" ? "w-5 h-5" : "w-4 h-4"
            )}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      {/* Mobile: Horizontal layout, Desktop: Vertical layout */}
      <div className="p-4 sm:p-6">
        {/* Overall Rating */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
            Customer reviews
          </h3>

          {/* Rating Display - Responsive Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {renderStars(averageRating, "lg")}
              </div>
              <span className="text-lg sm:text-xl font-semibold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm sm:text-base text-gray-500">
              out of 5 stars
            </span>
          </div>

          <p className="text-gray-600 text-sm">
            {totalRatings.toLocaleString()} global rating
            {totalRatings !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="mb-6 space-y-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <div
              key={star}
              className="flex items-center gap-2 sm:gap-3 text-sm"
            >
              <button className="w-12 sm:w-14 text-left text-primary-600 hover:text-primary-700 cursor-pointer font-medium transition-colors">
                {star} star
              </button>

              <div className="flex-1 bg-gray-200 rounded-full h-3 sm:h-4 relative overflow-hidden">
                <div
                  className="bg-primary-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="w-8 sm:w-10 text-primary-600 text-right font-medium">
                {percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Write Review Section */}
        <div className="border-t border-gray-100 pt-6">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
              Review this product
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              Share your thoughts with other customers
            </p>
            <Button variant="border" onClick={onWriteReview} className="w-full">
              Write a customer review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
