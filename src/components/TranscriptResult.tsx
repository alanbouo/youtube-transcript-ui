import React, { useEffect, useState } from "react";

interface Props {
  videoId: string;
}

export const TranscriptResult = ({ videoId }: Props) => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      if (!videoId || videoId === "") {
        setError(""); // Réinitialiser l'erreur si l'ID est vide
        setLoading(false);
        return;
      }

      try {
        console.log("🔍 Fetching result for:", videoId);
        console.log("📺 videoId reçu :", videoId);

        const res = await fetch(`https://yt-summary.alanbouo.com/result?video_id=${videoId}`, {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY || "",
          },
        });

        console.log("🔁 Response status:", res.status);

        if (!res.ok) {
          console.error("❌ Status:", res.status);
          const text = await res.text();
          throw new Error(text || "Result not found.");
        }

        const data = await res.json();
        console.log("📦 Résultat AI :", data);

        setSummary(data.summary);
        setKeywords(data.keywords);
        setActions(data.actions);
      } catch (err: any) {
        console.error("❌ fetchResult error:", err);
        setError(err.message || "Failed to fetch result.");
      } finally {
        console.log("✅ Fin de fetchResult - désactivation du loading");
        setLoading(false); // Important de toujours désactiver le loading
      }
    };

    fetchResult();
  }, [videoId]);

  // 🔄 UI States
  if (loading) return <p className="text-gray-500 text-center">⏳ Loading result...</p>;
  if (error) return <p className="text-red-500 text-center">❌ {error}</p>;
  console.log("🔄 Rendu du composant avec loading:", loading);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-2">AI Summary</h2>
      <p className="mb-4">{summary || "No summary available."}</p>

      <h3 className="font-semibold">Keywords:</h3>
      <ul className="list-disc list-inside mb-4">
        {keywords.map((kw, i) => (
          <li key={i}>{kw}</li>
        ))}
      </ul>

      <h3 className="font-semibold">Actions:</h3>
      <ul className="list-decimal list-inside">
        {actions.map((act, i) => (
          <li key={i}>{act}</li>
        ))}
      </ul>
    </div>
  );
};
