import { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

export default function TTSinput() {
  const [text, setText] = useState("");

  const speak = () => {
    if (text.trim() !== "") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="rounded-lg shadow-lg p-6 ">
      <div className="flex flex-col md:flex-row items-center text-primary-500 dark:text-white max-w-screen-xl mx-auto justify-center gap-10 mb-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="w-full p-2  rounded-lg bg-white dark:bg-bg-dark-mode"
          rows="10"
        ></textarea>
        <div className="w-full p-2 rounded-lg  border-2 h-[260px] border-gray-400 dark:border-gray-800">
          {text || ""}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => speak()}
          className="bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-4 rounded-[16px] mt-4 gap-2"
        >
          <div className="flex items-center gap-2">
            <FaVolumeUp />
            <p>Play Sound</p>
          </div>
        </button>
      </div>
    </div>
  );
}
