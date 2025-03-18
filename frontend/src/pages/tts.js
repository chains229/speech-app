import React, {useState} from "react";
import {AudioPlayer} from "../components/audio";
import "../App.css";

const TTS = () => {
    const [audio, setAudio] = useState(null);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submitText = async () => {
        if (!text) {
            alert("Please enter text!");
            return;
        }
        setIsLoading(true);
        
        try {
            const response = await fetch("http://127.0.0.1:5000/api/tts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Tell the server it's JSON
                },
                body:JSON.stringify({ text: text }) ,
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
            const data = await response.blob();
            setAudio(URL.createObjectURL(data));
        } catch (error) {
            console.error("Upload error:", error);
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Text to Speech</h1>
            <p>Vietnamese is not supported yet here</p>

            <div className = "text-section">
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to convert to speech"
                />
                <button onClick={submitText} disabled={!text || isLoading}>
                {isLoading ? (
                    <span className="loading-indicator">
                        <svg className="spinner" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
          ) : (
            "Generate Audio"
          )}
                </button>
            </div>

            {
                audio && (
                    <div className="audio-section">
                        <AudioPlayer audioUrl={audio} />
                    </div> )
            }
        </div>
    );
}

export default TTS;