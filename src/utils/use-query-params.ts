'use client';

import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function createQueryString(queryObj: Record<string, string | number | boolean>) {
  return Object.entries(queryObj)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&');
}

const queryAtom = atom<string>('');

export default function useQueryParam(pathname: string = '/') {
  const [query, setQuery] = useAtom(queryAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [query]);
  
  const clearQueryParam = (keys: string[]) => {
    const url = new URL(window.location.href);
    keys.forEach((key) => url.searchParams.delete(key));
    setQuery(url.search);
    router.push(`${pathname}${url.search}`);
  };
  
  const setQueryparams = (data: Record<string, string | number | boolean> | string) => {
    const queryString = typeof data === 'string' ? data : createQueryString(data);
    setQuery(queryString);
    router.push(`${pathname}?${queryString}`);
  };
  
  const getParams = (url: string | URL = window.location.href) => {
    const params: Record<string, string | string[]> = {};
    new URL(url).searchParams.forEach((val, key) => {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key] as string];
        }
        (params[key] as string[]).push(val);
      } else {
        params[key] = val;
      }
    });
    return params;
  };
  
  const updateQueryparams = (key: string, value: string | number | boolean) => {
    if (value === '' || value === null || value === undefined) {
      clearQueryParam([key]);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set(key, value.toString());
    setQuery(url.search);
    router.push(`${pathname}${url.search}`);
  };
  
  return {
    query,
    loading,
    getParams,
    setQueryparams,
    updateQueryparams,
    clearQueryParam,
  };
}
