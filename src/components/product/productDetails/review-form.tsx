"use client";

import { useState } from "react";
import Input from "@/components/shared/form/input";
import Button from "@/components/shared/button";
import { useForm } from "react-hook-form";
import TextArea from "@/components/shared/form/text-area";
import Heading from "@/components/shared/heading";
import Text from "@/components/shared/text";
import cn from "classnames";
import Rate from "@/components/shared/rate";
import CloseButton from "@/components/shared/close-button";
import { useModal } from "@/hooks/use-modal";
import { useSubmitReviewMutation } from "@/services/customer/use-submit-review";
import { Loader } from "lucide-react";

interface ReviewFormProps {
  className?: string;
  productId: string;
}

interface ReviewFormValues {
  title: string;
  comment: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  className = "",
  productId,
}) => {
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormValues>();
  const [rating, setRating] = useState(5);

  // Use the mutation hook
  const { mutate: submitReview, isPending } = useSubmitReviewMutation({
    onSuccess: () => {
      reset();
    },
  });

  function onSubmit(values: ReviewFormValues) {
    submitReview({
      productId,
      rating,
      title: values.title,
      message: values.comment,
    });
  }

  return (
    <div className={cn("w-full md:w-[560px] relative", className)}>
      <CloseButton onClick={closeModal} />

      <div className="flex mx-auto overflow-hidden rounded-lg bg-white">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-16 flex flex-col justify-center">
          <div className="text-center mb-6">
            <Heading className="text-xl font-semibold sm:text-2xl">
              Write Your Review
            </Heading>
            <Text>
              Your email address won't be shared. Required fields are marked *
            </Text>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center w-full mx-auto"
            noValidate
          >
            <div className="flex flex-col space-y-5">
              {/* Rating */}
              <div className="pb-1.5 flex items-center">
                <label className="block text-sm leading-none cursor-pointer shrink-0 text-brand-dark md:text-15px pr-3">
                  Your Rating *
                </label>
                <Rate
                  size="lg"
                  defaultValue={5}
                  value={rating}
                  className="-mb-2"
                  onChange={(value) => setRating(value)}
                />
              </div>

              {/* Title */}
              <Input
                variant="solid"
                label="Review Title *"
                {...register("title", {
                  required: "You must provide a title for your review",
                })}
                error={errors.title?.message}
              />

              {/* Comment */}
              <TextArea
                variant="solid"
                label="Comment *"
                {...register("comment", {
                  required: "You must provide a comment",
                })}
                error={errors.comment?.message}
                rows={5}
              />

              {/* Submit Button */}
              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full h-12 text-sm lg:text-base sm:w-auto"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
