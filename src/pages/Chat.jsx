import { useEmotionAnalysis } from "@hooks/useEmotionAnalysis";
import BgChatGradient from "@components/BgChatGradient";

export default function Chat() {
  const { text, setText, result, loading, handleSubmit } = useEmotionAnalysis();
  
  return (
    <BgChatGradient aggregated={result?.aggregated}>
      <div className="max-w-[1200px] mx-auto p-4 rounded transition-all duration-500">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-32 p-2 border rounded resize-none"
            placeholder="Введите сообщение..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") handleSubmit(e);
            }}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Анализ..." : "Отправить"}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-4 p-4 border rounded bg-white/70 backdrop-blur-md">
            {result.error ? (
              <p className="text-red-600">{result.error}</p>
            ) : (
              <>
                <p>
                  <strong>Эмоция:</strong> {result.dominant_emotion}{" "}
                  {result.emoji}
                </p>
                <p>{result.toxicity}</p>
                <pre className="text-sm text-gray-700 mt-2">
                  {JSON.stringify(result.aggregated, null, 2)}
                </pre>
              </>
            )}
          </div>
        )}
      </div>
    </BgChatGradient>
  );
}
