// App.tsx
import React, { useState } from "react";
import axios from "axios";

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function App() {
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
      setError("All fields are required.");
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Invalid YouTube URL.");
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
      setError(err.response?.data?.detail || "An error occurred while calling the API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">YouTube Transcript Tool</h1>
          <p className="mt-2 text-gray-600">Paste a YouTube URL and your proxy info to retrieve the transcript.</p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">YouTube URL</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Proxy Host</label>
              <input
                type="text"
                value={proxyHost}
                onChange={(e) => setProxyHost(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proxy Port</label>
              <input
                type="number"
                value={proxyPort}
                onChange={(e) => setProxyPort(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={proxyUser}
                onChange={(e) => setProxyUser(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={proxyPass}
                onChange={(e) => setProxyPass(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Get Transcript
          </button>

          {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}
        </div>

        {loading && <p className="text-gray-500 text-center">Loading...</p>}

        {transcript && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Transcript</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-[500px] overflow-y-auto">
              {transcript}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}