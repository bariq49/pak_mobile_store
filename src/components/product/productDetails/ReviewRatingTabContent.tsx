"use client";

import ReviewCard from "@/components/cards/review-card";
import cn from "classnames";
import Heading from "@/components/shared/heading";
import Cookies from "js-cookie";
import { useUI } from "@/hooks/use-UI";
import RatingSummary from "./rating-summary";
import { useModal } from "@/hooks/use-modal";
import toast from "react-hot-toast";
import { useState } from "react";
import Button from "@/components/shared/button";

interface ReviewRatingTabContentProps {
  data: any;
  useHeading?: boolean;
  className?: string;
}

export default function ReviewRatingTabContent({
  data,
  className,
  useHeading = false,
}: ReviewRatingTabContentProps) {
  const { isAuthorized } = useUI();
  const isLoggedIn = isAuthorized ?? !!Cookies.get("auth_token");
  const { openModal } = useModal();
  const [visibleReviews, setVisibleReviews] = useState(10);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 10);
  };

  const handleWriteReview = () => {
    if (isLoggedIn) {
      openModal("WRITE_REVIEW", { productId: data.id });
    } else {
      toast.error("Please log in first to write a review.");
      openModal("LOGIN_VIEW");
    }
  };

  const reviewsToShow = data?.reviews?.slice(0, visibleReviews) || [];

  return (
    <div className="w-full">
      {useHeading && (
        <Heading
          variant="titleLarge"
          className="mb-6 lg:mb-10 text-center p-3 px-4 bg-gray-100/80 rounded-lg"
        >
          Customer Reviews
        </Heading>
      )}

      <div
        className={cn(
          "flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12",
          className
        )}
      >
        {/* Rating Summary - Mobile First, Desktop Right */}
        <div className="order-1 lg:order-2 w-full lg:w-80 xl:w-96 lg:flex-shrink-0">
          <div className="sticky top-4">
            <RatingSummary data={data} onWriteReview={handleWriteReview} />
          </div>
        </div>

        {/* Reviews List - Mobile Second, Desktop Left */}
        <div className="order-2 lg:order-1 flex-1 min-w-0">
          {reviewsToShow.length > 0 ? (
            <div className="space-y-1">
              {/* Reviews Header for Mobile */}
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                  Reviews ({data?.reviews?.length || 0})
                </h3>

                {/* Sort/Filter could go here in the future */}
              </div>

              {/* Reviews Container */}
              <div className="space-y-2 sm:space-y-3">
                {reviewsToShow.map((review: any, index: number) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    index={index}
                    className="w-full"
                  />
                ))}
              </div>

              {/* Load More Button */}
              {data?.reviews && data.reviews.length > visibleReviews && (
                <div className="flex justify-center mt-8 lg:mt-10">
                  <Button
                    onClick={loadMoreReviews}
                    variant="border"
                    className="px-8 py-3 min-w-[160px] text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    Load More Reviews ({data.reviews.length - visibleReviews}{" "}
                    more)
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 lg:py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  No reviews yet
                </h4>
                <p className="text-gray-600 mb-6">
                  Be the first to share your thoughts about this product.
                </p>
                <Button
                  onClick={handleWriteReview}
                  className="px-6 py-2 bg-primary-500 text-white rounded-md transition-colors"
                >
                  Write the first review
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
