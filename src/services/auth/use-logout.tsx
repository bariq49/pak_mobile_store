import { useUI } from '@/hooks/use-UI';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

interface LogoutResponse {
  ok: boolean;
  message: string;
}

async function logout(): Promise<LogoutResponse> {
  return {
    ok: true,
    message: 'Logout Successful!',
  };
}

export const useLogoutMutation = () => {
  const { unauthorize } = useUI(); // Ensure this function is defined in useUI
  return useMutation<LogoutResponse, Error>({
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove('auth_token');
      unauthorize();
      
    },
    onError: (error) => {
      console.error('Logout error response:', error.message);
    },
  });
};
