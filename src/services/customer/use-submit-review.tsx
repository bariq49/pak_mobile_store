"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";

export interface ReviewInputType {
  productId: string;
  rating: number;
  title: string;
  message: string;
}

export interface ReviewResponse {
  message: string;
  data: any;
}

export interface HelpfulResponse {
  message: string;
  data: {
    helpful: number;
    notHelpful: number;
    userVote: "helpful" | "notHelpful" | null;
  };
}

// API Call for submitting review
async function submitReviewApi(
  input: ReviewInputType
): Promise<ReviewResponse> {
  const { data } = await http.post<ReviewResponse>(
    `${API_RESOURCES.REVIEWS}/${input.productId}/reviews`,
    {
      rating: input.rating,
      title: input.title,
      comment: input.message,
    }
  );
  return data;
}

// API Call for marking review as helpful
async function markHelpfulApi(reviewId: string): Promise<HelpfulResponse> {
  const { data } = await http.patch<HelpfulResponse>(
    `${API_RESOURCES.VOTE}/${reviewId}/helpful`
  );
  return data;
}

// API Call for marking review as not helpful
async function markNotHelpfulApi(reviewId: string): Promise<HelpfulResponse> {
  const { data } = await http.patch<HelpfulResponse>(
    `${API_RESOURCES.VOTE}/${reviewId}/not-helpful`
  );
  return data;
}

// Custom Mutation Hook - Updated to accept config object
export const useSubmitReviewMutation = (config?: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation<ReviewResponse, any, ReviewInputType>({
    mutationFn: submitReviewApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Review submitted successfully!");
      config?.onSuccess?.();
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to submit review.";
      toast.error(message);
    },
  });
};

// Custom Mutation Hook for marking review as helpful
export const useMarkHelpfulMutation = (config?: {
  onSuccess?: (data: HelpfulResponse) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<HelpfulResponse, any, string>({
    mutationFn: markHelpfulApi,
    onSuccess: (data) => {
      toast.success("Thank you for your feedback!");
      config?.onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to submit feedback.";
      toast.error(message);
    },
  });
};

// Custom Mutation Hook for marking review as not helpful
export const useMarkNotHelpfulMutation = (config?: {
  onSuccess?: (data: HelpfulResponse) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<HelpfulResponse, any, string>({
    mutationFn: markNotHelpfulApi,
    onSuccess: (data) => {
      toast.success("Thank you for your feedback!");
      config?.onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to submit feedback.";
      toast.error(message);
    },
  });
};
