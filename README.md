# YouTube Transcript UI

A modern web application that allows users to retrieve transcripts from YouTube videos using a proxy server. Built with React and TypeScript, this tool provides a clean and intuitive interface for accessing video transcripts.

## Features

- Extract transcripts from any YouTube video using its URL
- Support for proxy server configuration
- Clean and responsive user interface
- Real-time error handling and loading states
- Secure proxy authentication

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A proxy server with authentication

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/youtube-transcript-ui.git
cd youtube-transcript-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Usage

1. Open the application in your web browser
2. Enter a YouTube video URL in the format: `https://www.youtube.com/watch?v=VIDEO_ID`
3. Configure your proxy settings:
   - Proxy Host
   - Proxy Port
   - Username
   - Password
4. Click "Get Transcript" to retrieve the video transcript
5. The transcript will be displayed below the form

## API Integration

The application makes requests to the YouTube transcript API endpoint at `https://yt.alanbouo.com/transcript` with the following parameters:

- `video_id`: The YouTube video ID
- `proxy_host`: Proxy server hostname
- `proxy_port`: Proxy server port number
- `proxy_username`: Proxy authentication username
- `proxy_password`: Proxy authentication password

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Axios for API requests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
