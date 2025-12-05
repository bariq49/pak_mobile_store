"use client";

import { useMutation } from '@tanstack/react-query';

export interface UpdateUserType {
  userName: string;
  addess: string;
  date: string;
  phoneNumber: string;
  email: string;
  gender: string;
  message: string;
  default: boolean;
}
async function updateUser(input: UpdateUserType) {
  return input;
}
export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (input: UpdateUserType) => updateUser(input),
    onSuccess: (data) => {
      console.log(data, 'UpdateUser success response');
    },
    onError: (data) => {
      console.log(data, 'UpdateUser error response');
    },
  });
};
