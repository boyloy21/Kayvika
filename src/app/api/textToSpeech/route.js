// app/api/textToSpeech/route.js

import fetch from 'node-fetch';  // You might need to install node-fetch

export async function POST(request) {
  try {
    const { voice_id, transcribe_text, engine } = await request.json();

    // Ensure the API key is replaced with your actual key
    const apiKey = '261d3d24-9f60-429a-99e6-1fc1212eb441';  // Replace this with your actual API key

    // Make the request to the external Text-to-Speech API (e.g., AiVOOV)
    const response = await fetch('https://aivoov.com/api/v1/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        voice_id: voice_id || 'en-US-Wavenet-D',  // Default to English voice if not provided
        transcribe_text: transcribe_text,  // The text you want to convert to speech
        engine: engine || 'neural',  // Use 'neural' by default if no engine is provided
      }),
    });

    if (!response.ok) {
      return new Response('Failed to generate speech', { status: 500 });
    }

    const data = await response.json();
    const audioUrl = data.audio_url;  // Assuming the API returns the audio URL

    return new Response(JSON.stringify({ audio_url: audioUrl }), { status: 200 });
  } catch (error) {
    return new Response('Error generating speech: ' + error.message, { status: 500 });
  }
}
