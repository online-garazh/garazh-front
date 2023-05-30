import { useState, useEffect } from 'react';

export const useWindowLocationOrigin = () => {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (window.location.origin) setOrigin(window.location.origin);
  }, []);

  return origin;
};
