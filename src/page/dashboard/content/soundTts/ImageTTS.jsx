import React from "react";
import { useTranslation } from "react-i18next";
import { FaVolumeUp } from "react-icons/fa";
import soundtts from "../../../../data/vocabularies/soundtts.json";
import TTSinput from "../../../../components/soundtts/TTSinput";

const items = [
  {
    word: "Dog",
    image: "https://images.pexels.com/photos/4608106/pexels-photo-4608106.jpeg",
  },
  {
    word: "Cat",
    image: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
  },
  {
    word: "Bird",
    image:
      "https://images.pexels.com/photos/45853/bird-blue-cristata-cyanocitta-45853.jpeg",
  },
];

const ImageTTS = () => {
  const { t } = useTranslation("dashboard");

  const speak = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 sm:ml-64  mt-[88px]">
      <div>
        <TTSinput />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {soundtts.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-tl-[50px] rounded-br-[50px] bg-white/10 backdrop-blur-md shadow-lg text-white"
          >
            <img
              src={item.image}
              alt={item.word}
              className="w-full h-48 object-cover rounded-tl-[50px]"
            />
            <button
              onClick={() => speak(item.word)}
              className="bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-4 rounded-[16px] mt-4 flex items-center gap-2"
            >
              <FaVolumeUp />
              <p>Play Sound</p>
            </button>
            <p className="text-heading-4 font-semibold mt-2 text-primary-500 py-1">
              {item.word}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTTS;
