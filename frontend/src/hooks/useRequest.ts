import { useCallback, useState } from 'react';

const useRequest = <Body extends any, D = any, E = Error>(url: string) => {
  const [error, setError] = useState<E | null>(null);
  const [data, setData] = useState<D | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const fetcher = useCallback(async (body: Body) => {
    setData(null);
    setError(null);
    setIsValidating(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setData(await response.json());
    } catch (err) {
      setError(err as unknown as E);
    } finally {
      setIsValidating(false);
    }
  }, [url]);

  return { fetcher, data, error, isValidating };
};

export default useRequest;
