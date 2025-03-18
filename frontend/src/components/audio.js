import React, { useState, useRef } from "react";

export const AudioRecorder = ({ onAudioRecorded }) => {
  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
        onAudioRecorded(recordedBlob); // Send blob to parent
      };

      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="audio-controls">
      <audio controls src={recordedUrl} />
      <div className="record-buttons">
        <button className="record-button" onClick={startRecording}>Start Recording</button>
        <button className="stop-button" onClick={stopRecording}>Stop Recording</button>
      </div>
    </div>
  );
};

export const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(audioUrl);

  const togglePlay = () => {
      if (isPlaying) {
          audio.pause();
      } else {
          audio.play();
      }
      setIsPlaying(!isPlaying);
  };

  return (
      <div className="audio-player">
          <button className="play-button" onClick={togglePlay}>
              {isPlaying ? "Pause" : "Play"}
          </button>
      </div>
  );
};