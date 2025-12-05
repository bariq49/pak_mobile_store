import { useMutation } from '@tanstack/react-query';

export interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

async function changePassword(): Promise<ChangePasswordResponse> {
  // Simulated API response
  return {
    success: true,
    message: 'Password changed successfully!',
  };
}

export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordInputType>({
    mutationFn: changePassword,
    onSuccess: (data) => {
      console.log('ChangePassword success response:', data);
    },
    onError: (error) => {
      console.error('ChangePassword error response:', error.message);
    },
  });
};
