import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoSend } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaRobot } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatBot = ({ isBackToTopVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
 const { t } = useTranslation("chatbot");
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const result = await model.generateContent(input);
      const aiResponse = await result.response.text();
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: t("sorry! I couldn't process that.") },
      ]);
    }
  };

  return (
    <div className="fixed right-5 flex flex-col items-end z-50">
      {isOpen && (
        <div
          className={`w-96 bg-white shadow-lg rounded-lg p-4 mb-2 dark:bg-gray-800 fixed right-5 ${
            isBackToTopVisible ? "bottom-32" : "bottom-16"
          }`}
        >
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("chat with AI")}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 dark:text-gray-400"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>
          <div ref={chatRef} className="h-40 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-primary-500 text-white self-end"
                    : "bg-primary-100 dark:bg-gray-700 dark:text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex items-center border-t pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(); // Trigger sending message when Enter is pressed
                }
              }}
              className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary-200 
             focus:border-secondary-500"
              placeholder={t("ask something...")}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-primary-500 text-white p-2.5 rounded-md"
            >
              <IoSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-5 bg-primary-500 p-1 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 ${
          isBackToTopVisible ? "bottom-20" : "bottom-5"
        }`}
      >
        <img
          src="../../../img/dashboard/AI.png"
          alt="Chatbot"
          className="w-10"
        />
        {/* <FaRobot className="w-5 h-5 text-white" /> */}
      </button>
    </div>
  );
};

export default ChatBot;
