import { useCallback, useEffect, useState } from 'react';

export type RequestError<E> = {
  status: number;
  statusText: string;
  body: E;
}

export interface RequestOptions<Body> {
  startWith?: Body;
  method?: RequestInit['method'];
}

const useRequest = <Body extends any, D = any, E = any>(url: string, option: RequestOptions<Body> = {}) => {
  const [isMount, setIsMount] = useState(false);

  const [error, setError] = useState<RequestError<E> | null>(null);
  const [data, setData] = useState<D | null>(null);
  const [isValidating, setIsValidating] = useState(!!option.startWith);
  
  const fetcher = useCallback(async (body: Body) => {
    setData(null);
    setError(null);
    setIsValidating(true);

    console.log('check', option);
    try {
      const response = await fetch(url, {
        method: option.method ?? 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (200 <= response.status && response.status < 300) {
        setData(await response.json());
      } else {
        setError({
          status: response.status,
          statusText: response.statusText,
          body: await response.json(),
        });
      }
    } catch (err) {
      setError({
        status: 500,
        statusText: 'cannot resolve request',
        body: err as unknown as E,
      });
    } finally {
      setIsValidating(false);
    }
  }, [url, option]);

  useEffect(() => {
    if (!isMount) {
      if (option.startWith) {
        fetcher(option.startWith);
      }

      setIsMount(true);
    }
  }, [isMount, option]);

  return { fetcher, data, error, isValidating };
};

export default useRequest;
