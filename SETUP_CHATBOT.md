# Chatbot Setup Guide

## 1. Get Your API Keys

### Gemini API Key (for Chat Intelligence)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API key"
3. Copy the key

### Google Cloud API Key (for High-Quality Voice)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable **"Cloud Text-to-Speech API"**
   - Search for "Text-to-Speech" in the search bar
   - Click "Enable"
4. Go to **Credentials** > **Create Credentials** > **API Key**
5. Copy the key
   * *Recommended: Restrict this key to "Cloud Text-to-Speech API" only for security*

## 2. Configure Environment

1. Create a file named `.env` in the root folder (`d:\CodeProjects\ComportaDesign\ComportaDesign2026`)
2. Add the following lines (replace with your actual keys):

```env
VITE_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key_here
```

## 3. Restart the Server

In your terminal:
1. Press `Ctrl+C` to stop the current server
2. Run: `npm run dev`

## 4. Test It!

1. Open http://localhost:3001
2. Click the chat button (bottom-right)
3. Click the microphone button to use voice
4. Try asking: "What is Comporta Design 2026?"

## Voice Features

- **Voice Input**: Click microphone button, speak your question (Portuguese only)
- **Voice Output**: Bot responses are spoken aloud automatically using **Google Cloud Neural2 Voice** (High Quality)
- **Language**: Always responds in European Portuguese

## Troubleshooting

- **Chatbot not responding**: Check your `VITE_API_KEY` in `.env`
- **No voice output**: Check your `VITE_GOOGLE_CLOUD_API_KEY` in `.env` and ensure "Cloud Text-to-Speech API" is enabled in Google Cloud Console.
- **Microphone error**: Ensure you have granted microphone permissions to the browser.
