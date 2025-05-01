import { useState, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
export function useEmotionAnalysis() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const batchMessagesRef = useRef([]);

  const handleSubmit = useCallback(
    debounce(async (text) => {
      if (!text.trim()) return;

      batchMessagesRef.current.push(text);

      if (batchMessagesRef.current.length >= 5) {
        setLoading(true);
        const batch = batchMessagesRef.current.join(' ');
        batchMessagesRef.current = [];

        try {
          const response = await axios.post('http://127.0.0.1:8000/analyze', {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: batch }),
          });

          const data = await response;
          setResult(data);
        } catch (err) {
          setResult({ error: 'Ошибка при запросе к серверу.' });
        } finally {
          setLoading(false);
        }
      }
    }, 500),
    [],
  );

  return {
    text,
    setText,
    result,
    loading,
    handleSubmit,
  };
}
