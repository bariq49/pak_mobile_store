import { useUI } from '@/hooks/use-UI';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}

interface LoginResponse {
  token: string;
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoginError';
  }
}

async function login(input: LoginInputType): Promise<LoginResponse> {
  // Simulate credential validation
  const validCredentials = {
    email: 'guest@demo.com',
    password: 'admin',
  };
  
  if (
      input.email !== validCredentials.email ||
      input.password !== validCredentials.password
  ) {
    throw new LoginError('Login failed. Please check your credentials');
  }
  
  return {
    token: `${input.email}.${input.remember_me}`.split('').reverse().join(''),
  };
}

export const useLoginMutation = () => {
  const { authorize } = useUI();
  return useMutation<LoginResponse, LoginError, LoginInputType>({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });
      authorize();
    },
    onError: (error) => {
      if (error instanceof LoginError) {
        console.log('Login error :', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    },
  });
};
