import {useEffect, useState} from "react";
import NavBar from "./components/navbar";
import HomePage from "./pages/home";
import ASR from "./pages/asr";
import TTS from "./pages/tts";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  useEffect(() => {}, []);
  const [currentPage, SetCurrentPage] = useState("Home");
  return (
    <BrowserRouter>
      <div className="overflow-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="asr" element={<ASR />} />
          <Route path="tts" element={<TTS/>} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App