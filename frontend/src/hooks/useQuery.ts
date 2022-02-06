import { useMemo } from 'react';

const useQuery = (key: string): string | null => {
  const query = useMemo(() => Object.fromEntries(new URLSearchParams(window.location.search).entries()), [window.location.search]);

  if (key in query && Object.prototype.hasOwnProperty.call(query, key)) {
    return query[key];
  }

  return null;
};

export default useQuery;
