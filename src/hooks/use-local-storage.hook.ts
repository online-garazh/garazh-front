import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState<T>(fallbackValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);

    setValue(stored ? (JSON.parse(stored) as T) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
