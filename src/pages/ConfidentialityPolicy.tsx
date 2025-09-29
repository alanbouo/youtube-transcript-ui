import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.png';

const ConfidentialityPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.1),_transparent_55%)]">
      {/* Header with Logo and Back Navigation */}
      <header className="border-b border-gray-100 bg-white/90 px-6 py-4 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logoUrl} alt="TubeChat AI" className="w-8 h-8 rounded" />
            <h1 className="text-lg font-bold text-gray-900">TubeChat AI</h1>
          </Link>
          <Link
            to="/"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto w-full max-w-4xl">
          <div className="bg-white/85 rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Confidentiality Policy</h1>
              <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-gray max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  At TubeChat AI, we are committed to protecting your privacy and ensuring the confidentiality of the
                  information you provide when using our YouTube transcript analysis service. This Confidentiality Policy
                  explains how we handle your data, what information we collect, and the measures we take to safeguard it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. What Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you use TubeChat AI, we collect and process the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>YouTube URLs:</strong> The video URLs you enter for analysis. We extract and use only
                    the video ID for processing.
                  </li>
                  <li>
                    <strong>Transcript Data:</strong> We retrieve publicly available transcripts from YouTube videos
                    through their official API or transcription services.
                  </li>
                  <li>
                    <strong>Analysis Results:</strong> AI-generated summaries, keywords, and action items derived
                    from the processed transcripts.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> Basic usage information, error logs, and performance metrics
                    to improve our service.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We do not collect or store personal information such as your name, email address, IP address,
                  or any identifying information for individual users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Process Your Data</h2>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li>
                    <strong>Transcript Retrieval:</strong> When you submit a YouTube URL, we extract the video ID
                    and request the transcript from YouTube's services or our backend infrastructure.
                  </li>
                  <li>
                    <strong>AI Analysis:</strong> The transcript is sent to our AI processing servers for summarization,
                    keyword extraction, and action item identification. This processing happens in real-time and
                    results are sent back to your browser.
                  </li>
                  <li>
                    <strong>Data Transmission:</strong> All data transmission between your browser and our servers
                    occurs over secure HTTPS connections.
                  </li>
                  <li>
                    <strong>Local Processing:</strong> AI analysis results are displayed directly in your browser
                    without being permanently stored on our servers.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Retention</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Temporary Processing:</strong> Transcript data is processed in memory and is not stored
                    permanently on our servers after analysis.
                  </li>
                  <li>
                    <strong>Session Data:</strong> YouTube URLs entered are processed immediately and not retained.
                  </li>
                  <li>
                    <strong>Analytics and Logs:</strong> Basic anonymized usage statistics may be kept for service
                    improvement purposes, but no identifiable user data is logged.
                  </li>
                  <li>
                    <strong>Data Deletion:</strong> Any temporary data created during processing is automatically
                    deleted within a short time frame (typically within minutes to hours).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  TubeChat AI uses the following third-party services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>YouTube API:</strong> For retrieving video transcripts. We only access publicly
                    available information and comply with YouTube's Terms of Service.
                  </li>
                  <li>
                    <strong>AI Processing Services:</strong> Cloud-based AI models for text analysis. Input data
                    is processed securely and not used for training new models.
                  </li>
                  <li>
                    <strong>Hosting Infrastructure:</strong> Our service is hosted on secure cloud infrastructure
                    with industry-standard security measures.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to ensure a level of security
                  appropriate to the risk:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Encryption:</strong> All data in transit is encrypted using HTTPS/TLS protocols.</li>
                  <li><strong>Access Controls:</strong> Server access is restricted to authorized personnel only.</li>
                  <li><strong>Regular Audits:</strong> Our systems undergo regular security assessments.</li>
                  <li><strong>Data Minimization:</strong> We only collect and process data necessary for the service.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. User Rights and Choices</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As TubeChat AI processes your data in real-time and does not retain personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>No Data Storage:</strong> We do not store personal or transcript data after processing.</li>
                  <li><strong>Local Control:</strong> All processing results are displayed locally in your browser.</li>
                  <li><strong>No Tracking:</strong> We do not use cookies or tracking mechanisms.</li>
                  <li><strong>Open Source:</strong> Our code is publicly available for transparency.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Confidentiality Policy from time to time. Any changes will be reflected with
                  an updated "Last updated" date at the top of this page. We encourage you to review this policy
                  periodically to stay informed about how we protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Confidentiality Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Website:</strong> <a href="https://alanbouo.com" className="text-blue-600 hover:text-blue-700">alanbouo.com</a><br />
                    <strong>Email:</strong> privacy@alanbouo.com<br />
                    <strong>Github:</strong> <a href="https://github.com/al-bou/youtube-transcript-ui" className="text-blue-600 hover:text-blue-700">youtube-transcript-ui</a>
                  </p>
                </div>
              </section>
            </div>
          </div>
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
    </div>
  );
};

export default ConfidentialityPolicy;
