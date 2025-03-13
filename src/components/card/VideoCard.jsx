import React, { useEffect, useState } from "react";

const VideoCard = ({ video }) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [profileImage, setProfileImage] = useState(""); // Store profile image URL

  useEffect(() => {
    if (!video.snippet.channelId) return;

    const fetchChannelImage = async () => {
      try {
        const channelProfileUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=${API_KEY}`;
        const response = await fetch(channelProfileUrl);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setProfileImage(data.items[0].snippet.thumbnails.default.url); // or .high.url
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelImage();
  }, [video.snippet.channelId, API_KEY]); // Fetch only when channelId changes

  return (
    <div className="rounded-tl-[50px] rounded-br-[50px] bg-white/10 backdrop-blur-md border-2 border-white dark:border-none border-white/20 w-full dark: p-3 rounded-lg bg-white">
      {/* Video Thumbnail */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video.id?.videoId || video.id}`}
          title={video.snippet.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Details */}
      <div className="flex mt-5">
        {/* Channel Profile Image */}
        <img
          src={profileImage || "/default-avatar.png"} // Fallback image
          alt={video.snippet.channelTitle}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />

        {/* Video Info */}
        <div>
          <h3 className="dark:text-text-des-dark-mode text-text-des-light-mode font-semibold text-sm line-clamp-2">
            {video.snippet.title}
          </h3>
          <p className="text-gray-400 text-xs mt-2">{video.snippet.channelTitle}</p>
          <p className="text-gray-500 text-xs py-2">
            {Number(video.statistics?.viewCount || 0).toLocaleString()} views •{" "}
            {video.snippet.publishedAt
              ? new Date(video.snippet.publishedAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
