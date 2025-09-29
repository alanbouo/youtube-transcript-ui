// App.tsx
import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { TranscriptResult } from "./components/TranscriptResult";
import ConfidentialityPolicy from "./pages/ConfidentialityPolicy";

import logoUrl from "./assets/logo.png";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function HomePage() {
  const [url, setUrl] = useState("");

  const [transcript, setTranscript] = useState("");
  const [token, setToken] = useState("");
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [hasResults, setHasResults] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async () => {
    setError("");
    setTranscript("");
    setSummary("");
    setKeywords([]);
    setActions([]);
    setHasResults(false);

    if (!url) {
      setError("Please enter a YouTube URL.");
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Invalid YouTube URL.");
      return;
    }

    setLoading(true);

    const API_BASE = "https://yt-summary.alanbouo.com";

    try {
      // 1. Récupérer le transcript
      const transcriptRes = await axios.post("https://yt.alanbouo.com/transcript", {
        video_id: videoId
      });

      const transcript = transcriptRes.data.transcript;
      setTranscript(transcript);

      // 2. Appel à /analyze (plus besoin de clé API dans ce scénario, si la sécurité est assurée par IP ou auth serveur)
      const analyzeRes = await axios.post(`${API_BASE}/analyze`, {
        video_id: videoId,
        transcript: transcript
      });
      setToken(analyzeRes.data.token);
      const token = analyzeRes.data.token;
      if (!token) {
        throw new Error("Aucun token reçu depuis /analyze");
      }

      // 3. Attente (tu peux améliorer avec polling ensuite)
      await delay(20000);

      // 4. Récupération du résultat par token
      const resultRes = await axios.get(`${API_BASE}/result`, {
        params: { token }
      });

      setSummary(resultRes.data.summary || "");
      setKeywords(resultRes.data.keywords || []);
      setActions(resultRes.data.actions || []);
      setHasResults(true);
    } catch (err: any) {
      console.error("API Error:", err);

      if (err.response) {
        const status = err.response.status;
        const detail = err.response.data?.detail || JSON.stringify(err.response.data);

        setError(`Erreur API (${status}) : ${detail}`);
      } else {
        setError("Erreur inconnue lors de l'appel API.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.1),_transparent_55%)]">
      {/* Header with Logo and Navigation */}
      <header className="border-b border-gray-100 bg-white/90 px-6 py-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
          <div className="flex items-center space-x-3 md:flex-shrink-0">
            <img src={logoUrl} alt="TubeChat AI" className="w-16 h-16 rounded" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">TubeChat AI</h1>
              <p className="text-sm text-gray-600">Paste a YouTube URL to get transcript and AI summary</p>
            </div>
          </div>

          {/* Header Navigation */}
          <nav className="flex flex-wrap items-center gap-3 md:ml-auto md:gap-8">
            <button onClick={() => setPopupMessage("This functionality will come later")} className="flex flex-col items-center space-y-1 text-blue-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4.5-1 13.5 1V4c0-1.1-.9-2-2-2zm-2 15l-5-1V6l5 11z"/>
              </svg>
              <span className="text-xs">Chat</span>
            </button>

            <button onClick={() => setPopupMessage("This functionality will come later")} className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-blue-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.95-2.05l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
              </svg>
              <span className="text-xs">History</span>
            </button>

            <button onClick={() => setPopupMessage("This functionality will come later")} className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-blue-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-xs">Settings</span>
            </button>

            <button onClick={() => setPopupMessage("This functionality will come later")} className="flex flex-col items-center space-y-1 text-gray-500 transition-colors hover:text-blue-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
              <span className="text-xs">Help</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          {/* URL Input Section */}
          <div className="space-y-4 rounded-2xl bg-white/85 p-6 shadow-sm ring-1 ring-gray-100">
            <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-24 text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                placeholder="Enter YouTube URL here"
              />
              <button
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    setUrl(text);
                  } catch (err) {
                    console.error('Failed to read clipboard:', err);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                Paste
              </button>
            </div>
            {url && (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>URL valide</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 animate-spin text-white/80"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
                  />
                </svg>
                <span>Processing...</span>
              </span>
            ) : (
              "Get Transcript & Summary"
            )}
          </button>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Results */}
          {hasResults && summary && (
            <TranscriptResult
              summary={summary}
              keywords={keywords}
              actions={actions}
              transcript={transcript}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white/90 py-6">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="flex flex-col items-center gap-3 text-sm text-gray-500 md:flex-row md:justify-between">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-gray-600">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href="https://alanbouo.com"
                  className="font-semibold text-gray-700 transition-colors hover:text-blue-600"
                >
                  TubeChat AI
                </a>
                <span className="hidden text-gray-300 md:inline">|</span>
                <span className="flex items-center gap-1">
                  © 2025
                  <a
                    href="https://alanbouo.com"
                    className="text-blue-600 transition-colors hover:text-blue-700"
                  >
                    alanbouo.com
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <span className="text-gray-300">|</span>
                <a
                  href="https://www.buymeacoffee.com/alanbouo"
                  className="transition-colors hover:text-yellow-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ☕ Buy me a coffee
                </a>
              </div>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
              <a
                href="https://alanbouo.com/about"
                className="transition-colors hover:text-blue-600"
              >
                About
              </a>
              <a
                href="https://alanbouo.com/contact"
                className="transition-colors hover:text-blue-600"
              >
                Contact
              </a>
              <Link
                to="/privacy"
                className="transition-colors hover:text-blue-600"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      {/* Popup Modal */}
      {popupMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
            <p className="text-sm">{popupMessage}</p>
            <button
              onClick={() => setPopupMessage("")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<ConfidentialityPolicy />} />
    </Routes>
  );
}
