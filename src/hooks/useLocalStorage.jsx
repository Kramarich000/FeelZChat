import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    let stored;
    try {
      stored = localStorage.getItem(key);
      if (stored === null) return initialValue;

      return JSON.parse(stored);
    } catch (e) {
      console.warn('localStorage parse failed, returning raw:', e);
      return stored ?? initialValue; // если stored undefined — возвращаем initialValue
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const serialized =
          typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, serialized);
      } catch (e) {
        console.error('Ошибка при записи в localStorage:', e);
      }
    }
  }, [key, value]);

  return [value, setValue];
}
