'use client';
import React, { useState } from 'react';

const TextToSpeech = () => {
  const [transcribedText, setTranscribedText] = useState('');  // Holds the transcribed text
  const [error, setError] = useState('');  // Holds any errors during the process
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  // Function to handle Speech-to-Text (STT)
  const handleSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set the language to English

    recognition.onresult = function (event) {
      const speechToText = event.results[0][0].transcript; // Get the transcribed text
      setTranscribedText(speechToText); // Update state with the transcribed text
    };

    recognition.onerror = function (event) {
      setError('Error recognizing speech: ' + event.error); // Capture and display error
    };

    recognition.start(); // Start listening for speech
  };

  // Function to handle Text-to-Speech (TTS)
  const handleTextToSpeech = async () => {
    if (!transcribedText) {
      setError('Please provide text to convert to speech.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Send the transcribed text to your TTS API (Next.js API route)
      const response = await fetch('/api/textToSpeech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voice_id: 'en-US-MaleVoice-D', // Use an English voice ID from your TTS API
          transcribe_text: transcribedText, // Pass the transcribed text
          engine: 'neural', // You can adjust the engine type (e.g., 'neural' or 'standard')
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching TTS data');
      }

      const data = await response.json();
      const audioUrl = data.audio_url; // Assuming the API returns an audio URL

      const audio = new Audio(audioUrl);
      audio.play(); // Play the audio response
      audio.onended = () => setIsLoading(false); // Stop loading when the audio finishes
    } catch (err) {
      setError('Error converting text to speech: ' + err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="text-to-speech-container">
      <h1>Text to Speech Example</h1>

      {/* Speech Recognition */}
      <button onClick={handleSpeechRecognition}>
        Start Speech Recognition
      </button>

      {/* Display Transcribed Text */}
      <textarea
        value={transcribedText}
        onChange={(e) => setTranscribedText(e.target.value)}
        placeholder="Say something or type text here..."
        rows={5}
      />

      {/* Text-to-Speech */}
      <button onClick={handleTextToSpeech} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Convert to Speech'}
      </button>

      {/* Display Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextToSpeech;
