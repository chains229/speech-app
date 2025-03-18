import React, { useState, useEffect } from "react";
import {AudioRecorder} from "../components/audio";
import "../App.css"; // Import the CSS file

const ASR = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [trans, setTrans] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAudioRecorded = (blob) => {
    setAudioBlob(blob);
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      alert("No audio recorded!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/asr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTrans(data["transcription"]);
    } catch (error) {
      console.error("Upload error:", error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="asr-container">
      <h1 className="asr-title">Automatic Speech Recognition</h1>
      
      <div className="recorder-section">
        <AudioRecorder onAudioRecorded={handleAudioRecorded} />
        
        <button 
          onClick={uploadAudio} 
          disabled={!audioBlob || isLoading}
          className={`transcribe-button ${audioBlob && !isLoading ? 'active' : 'disabled'}`}
        >
          {isLoading ? (
            <span className="loading-indicator">
              <svg className="spinner" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Transcribe Audio"
          )}
        </button>
      </div>
      
      {trans && (
        <div className="results-section">
          <h3 className="results-title">Transcription:</h3>
          <p className="transcription-text">
            {trans}
          </p>
        </div>
      )}
      
      <div className="footer-text">
        <p>Speak clearly for best results</p>
      </div>
    </div>
  );
};

export default ASR;