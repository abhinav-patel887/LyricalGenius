import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [lyric, setLyric] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);

  const fetchLyrics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/generate-lyric`);
      setLyric(response.data.lyrics);
      setSongTitle(response.data.title);
      setResult(null);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }
    setLoading(false);
  };

  const checkAnswer = async () => {
    if (!userGuess.trim()) return;
    try {
      const correctans = songTitle.toLowerCase();
      const userans = userGuess.toLowerCase();
      if (correctans === userans) {
        const answer = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/answers`, {
          title: songTitle,
          lyrics: lyric,
        });
        success("Correct Answer");
        setLyric("");
        setUserGuess("");
      } else {
        error("Incorrect Answer");
        setUserGuess("");
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-r from-[#1A1A40] to-[#2C2C6C] text-white p-6">  
      <header className="flex flex-col gap-y-3 mb-6 justify-center items-center text-4xl font-extrabold tracking-wide text-[#9A86FD]">
        Lyrical Genius 🎵
        <p className="text-lg font-light text-gray-300">
          Generate song lyrics and test your music knowledge by guessing the song title.
        </p>
      </header>

      <div className="flex flex-col items-center p-7 rounded-lg w-full max-w-2xl space-y-6 text-center bg-[#22224A] shadow-lg border border-[#3E3E77]">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-semibold text-[#C5A3FF]">Lyrics Generator</h2>
          <button
            onClick={fetchLyrics}
            className="px-6 py-3 bg-[#9A86FD] text-white font-semibold rounded-lg shadow-md hover:bg-[#C5A3FF] transition-all"
            disabled={loading}
          >
            {loading ? "Loading..." : "🎶 Generate Lyric"}
          </button>
        </div>

        <div className="bg-[#2E2E58] p-6 rounded-lg shadow-xl w-full text-center border border-[#4A4A88]">
          {lyric ? (
            <p className="text-xl italic font-light text-[#E1D9FF]">"{lyric}"</p>
          ) : (
            <p className="text-lg text-gray-400">Click 'Generate Lyric' to start!</p>
          )}
        </div>

        {lyric && (
          <div className="space-y-3 w-full">
            <p className="text-left font-semibold text-gray-300">Guess this song title:</p>
            <div className="flex justify-between items-center w-full">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter song title..."
                className="p-3 w-full max-w-md border border-[#6B6BAF] bg-[#1F1F46] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A86FD] text-center"
              />
              <button
                onClick={checkAnswer}
                className="px-6 py-3 bg-[#6A5ACD] text-white font-semibold rounded-lg shadow-md hover:bg-[#9A86FD] transition-all"
              >
                Check Answer
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className={`mt-4 p-3 text-lg font-semibold rounded-lg ${result.includes("✅") ? "bg-green-500" : "bg-red-500"}`}>
            {result}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default App;
