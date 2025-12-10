"use client";

import { useQuery } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "../utils/api-endpoints";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  address?: string;
}

async function fetchCurrentUser(): Promise<CurrentUser> {
  const { data } = await http.get(API_RESOURCES.USER);
  return data.data.user;
}

export const useCurrentUserQuery = () => {
  return useQuery<CurrentUser>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });
};
