import React, { useState } from "react";

type Props = {
  summary: string;
  keywords: string[];
  actions: string[];
  transcript: string;
};

export function TranscriptResult({ summary, keywords, actions, transcript }: Props) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-6">
      {/* AI Summary Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">AI Summary</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {summary}
          </p>

          {/* Keywords Section */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <h3 className="font-semibold text-gray-900">Keywords:</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Suggested Actions Section */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Suggested Actions:</h3>
            </div>
            <ul className="space-y-2">
              {actions.map((action, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm leading-relaxed">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Transcript Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Transcript</h2>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transform transition-transform ${showTranscript ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.59L12,13.17L16.59,8.59L18,10L12,16L6,10L7.41,8.59Z"/>
          </svg>
        </button>

        {showTranscript && (
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {transcript}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(transcript);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  } catch (err) {
                    console.error('Failed to copy:', err);
                  }
                }}
                className={`px-4 py-2 text-white text-sm rounded-lg transition-colors ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {copied ? 'Transcript copied!' : 'Copy Transcript'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
