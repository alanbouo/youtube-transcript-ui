import React, { useEffect, useState } from "react";

type Props = {
  token: string;
};

export function TranscriptResult({ token }: Props) {
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`https://yt-summary.alanbouo.com/result?token=${token}`);
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setSummary(data.summary || "");
        setKeywords(data.keywords || []);
        setActions(data.actions || []);
      } catch (err) {
        console.error("❌ Erreur API:", err);
        setError("Impossible de récupérer les résultats.");
      }
    };

    fetchResult();
  }, [token]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Résumé IA</h2>
      <p className="mb-4">{summary || "No summary available."}</p>

      <h3 className="font-bold">Mots-clés :</h3>
      <ul className="list-disc list-inside">
        {keywords.map((kw, i) => <li key={i}>{kw}</li>)}
      </ul>

      <h3 className="font-bold mt-4">Actions suggérées :</h3>
      <ul className="list-disc list-inside">
        {actions.map((act, i) => <li key={i}>{act}</li>)}
      </ul>
    </div>
  );
}
