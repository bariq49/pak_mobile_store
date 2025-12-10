// "use client";

// import { atom, useAtom } from "jotai";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export function createQueryString(
//   queryObj: Record<string, string | number | boolean>
// ) {
//   return Object.entries(queryObj)
//     .map(
//       ([key, value]) =>
//         `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
//     )
//     .join("&");
// }

// const queryAtom = atom<string>("");

// export default function useQueryParam(pathname: string = "/") {
//   const [query, setQuery] = useAtom(queryAtom);
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timeout = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timeout);
//   }, [query]);

//   const clearQueryParam = (keys: string[]) => {
//     if (typeof window === "undefined") return;

//     const url = new URL(window.location.href);
//     keys.forEach((key) => url.searchParams.delete(key));
//     setQuery(url.search);
//     router.push(`${pathname}${url.search}`);
//   };

//   const setQueryparams = (
//     data: Record<string, string | number | boolean> | string
//   ) => {
//     const queryString =
//       typeof data === "string" ? data : createQueryString(data);
//     setQuery(queryString);
//     router.push(`${pathname}?${queryString}`);
//   };

//   const getParams = (url?: string | URL) => {
//     if (typeof window === "undefined") return {};

//     const targetUrl = url ?? window.location.href;
//     const params: Record<string, string | string[]> = {};
//     new URL(targetUrl).searchParams.forEach((val, key) => {
//       if (params[key] !== undefined) {
//         if (!Array.isArray(params[key])) {
//           params[key] = [params[key] as string];
//         }
//         (params[key] as string[]).push(val);
//       } else {
//         params[key] = val;
//       }
//     });
//     return params;
//   };

//   const updateQueryparams = (key: string, value: string | number | boolean) => {
//     if (typeof window === "undefined") return;

//     if (value === "" || value === null || value === undefined) {
//       clearQueryParam([key]);
//       return;
//     }

//     const url = new URL(window.location.href);
//     url.searchParams.set(key, value.toString());
//     setQuery(url.search);
//     router.push(`${pathname}${url.search}`);
//   };

//   return {
//     query,
//     loading,
//     getParams,
//     setQueryparams,
//     updateQueryparams,
//     clearQueryParam,
//   };
// }

"use client";

import { atom, useAtom } from "jotai";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// Helper to create a query string
export function createQueryString(
  queryObj: Record<string, string | number | boolean>
) {
  return Object.entries(queryObj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}

// Shared atom to store query string
const queryAtom = atom<string>("");

// Hook
export default function useQueryParam(p0: string) {
  const [query, setQuery] = useAtom(queryAtom);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  //  Sync query atom with actual URL on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentQuery = window.location.search;
      setQuery(currentQuery);
    }
  }, [setQuery]);

  //  Simulated loading state (optional)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  //  Memoized getParams using searchParams
  const getParams = useMemo(() => {
    const params: Record<string, string | string[]> = {};

    if (searchParams) {
      for (const [key, value] of searchParams.entries()) {
        if (params[key]) {
          if (!Array.isArray(params[key])) {
            params[key] = [params[key] as string];
          }
          (params[key] as string[]).push(value);
        } else {
          params[key] = value;
        }
      }
    }

    return params;
  }, [searchParams]);

  //  Set full query string or object
  const setQueryparams = (
    data: Record<string, string | number | boolean> | string
  ) => {
    const queryString =
      typeof data === "string" ? data : createQueryString(data);
    setQuery(queryString);
    router.push(`${pathname}?${queryString}`);
  };

  //  Update or remove specific param
  const updateQueryparams = (key: string, value: string | number | boolean) => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    if (value === "" || value === null || value === undefined) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value.toString());
    }

    const newQuery = url.search;
    setQuery(newQuery);
    router.push(`${pathname}${newQuery}`);
  };

  //  Clear one or more keys
  const clearQueryParam = (keys: string[]) => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    keys.forEach((key) => url.searchParams.delete(key));

    const newQuery = url.search;
    setQuery(newQuery);
    router.push(`${pathname}${newQuery}`);
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
