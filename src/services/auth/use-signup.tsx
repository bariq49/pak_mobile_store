import { useUI } from '@/hooks/use-UI';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

export interface SignUpInputType {
  email: string;
  password: string;
  name: string;
  remember_me: boolean;
}

interface SignUpResponse {
  token: string;
}

async function signUp(input: SignUpInputType): Promise<SignUpResponse> {
  return {
    token: `${input.email}.${input.name}`.split('').reverse().join(''),
  };
}

export const useSignUpMutation = () => {
  const { authorize } = useUI(); // Ensure useUI provides an authorize function

  return useMutation<SignUpResponse, Error, SignUpInputType>({
    mutationFn: signUp,
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
    },
    onError: (error) => {
      console.error('Sign-up error response:', error.message);
    },
  });
};
