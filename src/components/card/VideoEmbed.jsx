import { useState, useEffect } from "react";

const VideoEmbed = () => {
  const [videoHtml, setVideoHtml] = useState("");

  useEffect(() => {
    // Simulating API call
    const fetchVideoEmbed = async () => {
      try {
        const response = await fetch("https://api.example.com/video"); // Replace with your actual API
        const data = await response.json();
        setVideoHtml(data.embedCode); // Assuming API returns { embedCode: "<iframe ...></iframe>" }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideoEmbed();
  }, []);

  return (
    <div className="w-full h-[300px]">
      {videoHtml ? (
        <div dangerouslySetInnerHTML={{ __html: videoHtml }} />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoEmbed;
