import { useCallback, useState } from 'react';

const useRequest = <Body extends any, D = any, E = Error>(url: string) => {
  const [error, setError] = useState<E | null>(null);
  const [data, setData] = useState<D | null>(null);
  
  const fetcher = useCallback(async (body: Body) => {
    setData(null);
    setError(null);

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
    }
  }, [url]);

  return { fetcher, data, error }
};

export default useRequest;
