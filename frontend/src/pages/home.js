import React, { useEffect, useState } from "react";

function HomePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/home")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-title">Voice Assistant App</h1>
      <p className="home-description">
        A powerful application built with React and Flask that enables text-to-speech conversion and automatic speech recognition.
      </p>
    </div>
  );
}

export default HomePage;