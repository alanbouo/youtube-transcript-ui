import React, { useState } from "react";
import axios from "axios";

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function App() {
  const [url, setUrl] = useState("");
  const [proxyHost, setProxyHost] = useState("");
  const [proxyPort, setProxyPort] = useState("");
  const [proxyUser, setProxyUser] = useState("");
  const [proxyPass, setProxyPass] = useState("");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setTranscript("");
    setLoading(false);
  
    if (!url || !proxyHost || !proxyPort || !proxyUser || !proxyPass) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
  
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("URL YouTube invalide.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("https://yt.alanbouo.com/transcript", {
        video_id: videoId,
        proxy_host: proxyHost,
        proxy_port: Number(proxyPort),
        proxy_username: proxyUser,
        proxy_password: proxyPass
      });
  
      setTranscript(response.data.transcript);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Erreur lors de l'appel à l'API.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 Transcripteur YouTube</h1>

      <div className="space-y-4">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL de la vidéo YouTube"
          className="w-full p-2 border rounded" />

        <input type="text" value={proxyHost} onChange={(e) => setProxyHost(e.target.value)} placeholder="Proxy host (IP publique)"
          className="w-full p-2 border rounded" />

        <input type="text" value={proxyPort} onChange={(e) => setProxyPort(e.target.value)} placeholder="Proxy port (ex: 3128)"
          className="w-full p-2 border rounded" />

        <input type="text" value={proxyUser} onChange={(e) => setProxyUser(e.target.value)} placeholder="Proxy username"
          className="w-full p-2 border rounded" />

        <input type="password" value={proxyPass} onChange={(e) => setProxyPass(e.target.value)} placeholder="Proxy password"
          className="w-full p-2 border rounded" />

        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Obtenir le transcript
        </button>
      </div>

      {loading && <p className="text-gray-600 mt-4">⏳ Chargement...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {transcript && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Transcript</h2>
          <pre className="bg-white p-4 border rounded max-h-[500px] overflow-y-auto whitespace-pre-wrap text-sm">
            {transcript}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
