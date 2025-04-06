import { useState } from "react";

export function useEmotionAnalysis() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!text.trim()) return;
  
      setLoading(true);
      setResult(null);
  
      try {
        const response = await fetch("http://127.0.0.1:8000/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
  
        const data = await response.json();
        setResult(data);
      } catch (error) {
        setResult({ error: "Ошибка при запросе к серверу." });
        return error;
      } finally {
        setLoading(false);
      }
    };
    return {
        text,
        setText,
        result,
        loading,
        handleSubmit
    }
}