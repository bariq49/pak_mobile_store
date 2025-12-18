/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  // Optional fields for future expansion
  subject?: string;
  inquiryType?: 'general' | 'support' | 'sales' | 'complaint' | 'feedback' | 'partnership';
  orderNumber?: string;
}

/**
 * Contact form submission response interface
 */
export interface ContactSubmitResponse {
  success: boolean;
  message: string;
  data?: {
    contactId: string;
    submittedAt: string;
    estimatedResponseTime: string;
  };
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Contact status check response interface
 */
export interface ContactStatusResponse {
  success: boolean;
  message: string;
  data?: {
    contactId: string;
    status: 'pending' | 'in_progress' | 'resolved' | 'closed';
    submittedAt: string;
    resolvedAt?: string | null;
  };
}

