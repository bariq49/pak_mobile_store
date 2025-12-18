"use client";

import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { ContactFormData, ContactSubmitResponse } from "./contact-types";

/* -------------------------------------------------------------------------- */
/*                          🔹 SUBMIT CONTACT FORM                            */
/* -------------------------------------------------------------------------- */
const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactSubmitResponse> => {
  try {
    const { data } = await http.post<ContactSubmitResponse>(
      API_RESOURCES.CONTACT_SUBMIT,
      formData
    );
    return data;
  } catch (error: any) {
    // Handle different error response structures
    if (error.response?.data) {
      // Backend returned an error response
      return error.response.data as ContactSubmitResponse;
    }
    // Network or other error
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                      🔹 CONTACT FORM MUTATION HOOK                         */
/* -------------------------------------------------------------------------- */
export const useContactFormMutation = () => {
  return useMutation({
    mutationFn: submitContactForm,
  });
};

