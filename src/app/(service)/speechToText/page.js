"use client";

import MicrophoneComponent from "@/components/record/RecordingView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";

export default function Voice() {
  const {isRecording, transcript, recordingComplete, handleToggleRecording} = MicrophoneComponent();
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
      <div className="flex flex-col w-full max-w-md p-4">
        {(isRecording || transcript) && (
          <div className="w-full rounded-lg border p-4 bg-white shadow-md">
            {transcript ? (
              <div className="border rounded-md p-4 mt-4 bg-gray-50 h-auto">
                <p className="text-gray-700 text-lg">{transcript}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">Listening...</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        {isRecording ? (
          <div className="cursor-pointer">
            <FontAwesomeIcon 
              icon={faMicrophone} 
              className="h-16 w-16 text-red-600 hover:text-red-800 transition duration-200 ease-in-out" 
              onClick={handleToggleRecording} 
              title="Stop Recording"
            />
          </div>
        ) : (
          <div className="cursor-pointer">
            <FontAwesomeIcon 
              icon={faMicrophoneSlash} 
              className="h-16 w-16 text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out" 
              onClick={handleToggleRecording} 
              title="Start Recording"
            />
          </div>
        )}
      </div>
  </div>
  );
}