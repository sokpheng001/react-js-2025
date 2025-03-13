import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFetchExercisesQuery } from "../../redux/features/exercises/exerciseApi";
import { BeatLoader } from "react-spinners";

// Helper function to get level image
const getLevelImage = (level) => {
  switch (level) {
    case "A1":
      return "https://cdn3d.iconscout.com/3d/premium/thumb/e-learning-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--online-study-education-teaching-internomo-v1-pack-seo-web-illustrations-3049732.png";
    case "A2":
      return "https://cdn3d.iconscout.com/3d/premium/thumb/live-3d-icon-download-in-png-blend-fbx-gltf-file-formats--streaming-video-online-broadcast-podcast-day-pack-network-communication-icons-7794707.png?f=webp";
    case "B1":
      return "https://project-english-club.vercel.app/assets/speaking10-DeXVtclm.png";
    case "B2":
      return "https://project-english-club.vercel.app/assets/writing-Bv33aIX_.png";
    case "C1":
      return "https://project-english-club.vercel.app/assets/vocabulary-C_LuEoE2.png";
    case "C2":
      return "https://project-english-club.vercel.app/assets/vocabulary-C_LuEoE2.png";
    default:
      return "";
  }
};

const StatsSummary = () => {
  const { t } = useTranslation("userProfile");
  const [isLoading, setIsLoading] = useState(true);
  const [levelsData, setLevelsData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [levelCounts, setLevelCounts] = useState({
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
    C2: 0,
  });

  // Fetch all exercises
  const { data: allExercises, isLoading: isExercisesLoading } =
    useFetchExercisesQuery();

  // Fetch user answers directly from API
  useEffect(() => {
    const fetchUserAnswers = async () => {
      const token = localStorage.getItem("access_token");
      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData?.user_uuid;

      if (!token || !userId) {
        // Instead of setting an error for new users, just leave the answers empty
        setUserAnswers([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://english-club.istad.co/exercise/submit_answer/user?id=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // Handle API errors but don't show to user
          console.error(`API error: ${response.status}`);
          // Still set empty answers for new users
          setUserAnswers([]);
          setIsLoading(false);
          return;
        }

        const data = await response.json();

        // Set the answers (use empty array if payload is null/undefined)
        setUserAnswers(data.payload || []);

        // Count unique exercises by level
        const uniqueExercises = new Set();
        const counts = {
          A1: 0,
          A2: 0,
          B1: 0,
          B2: 0,
          C1: 0,
          C2: 0,
        };

        // Only process if we have data
        if (data.payload && data.payload.length > 0) {
          // First pass: collect unique exercise IDs
          data.payload.forEach((item) => {
            uniqueExercises.add(item.ex_uuid);
          });

          // Second pass: count by level for unique exercises only
          const processedIds = new Set();
          data.payload.forEach((item) => {
            // Only count if we haven't processed this exercise ID yet
            if (!processedIds.has(item.ex_uuid)) {
              // Add to processed set
              processedIds.add(item.ex_uuid);

              // Increment the count for this level
              if (counts.hasOwnProperty(item.ex_level)) {
                counts[item.ex_level]++;
              }
            }
          });
        }

        setLevelCounts(counts);
      } catch (error) {
        console.error("Error fetching user answers:", error);
        // For errors, still show the UI with zero completed exercises
        setUserAnswers([]);
      }
    };

    fetchUserAnswers();
  }, []);

  // Calculate total and completed exercises for each level
  useEffect(() => {
    if (!isExercisesLoading && allExercises) {
      const groupedExercises = allExercises.reduce((acc, exercise) => {
        const level = exercise.exercise_level;
        if (!acc[level]) acc[level] = [];
        acc[level].push(exercise);
        return acc;
      }, {});

      const levelsData = [
        {
          name: "A1",
          image: getLevelImage("A1"),
          completed: levelCounts.A1,
          total: groupedExercises["A1"]?.length || 0,
        },
        {
          name: "A2",
          image: getLevelImage("A2"),
          completed: levelCounts.A2,
          total: groupedExercises["A2"]?.length || 0,
        },
        {
          name: "B1",
          image: getLevelImage("B1"),
          completed: levelCounts.B1,
          total: groupedExercises["B1"]?.length || 0,
        },
        {
          name: "B2",
          image: getLevelImage("B2"),
          completed: levelCounts.B2,
          total: groupedExercises["B2"]?.length || 0,
        },
        {
          name: "C1",
          image: getLevelImage("C1"),
          completed: levelCounts.C1,
          total: groupedExercises["C1"]?.length || 0,
        },
        {
          name: "C2",
          image: getLevelImage("C2"),
          completed: levelCounts.C2,
          total: groupedExercises["C2"]?.length || 0,
        },
      ];

      setLevelsData(levelsData);
      setIsLoading(false);
    }
  }, [isExercisesLoading, allExercises, levelCounts]);

  // Show loading state while waiting for data
  if (isLoading) {
    return (
      <div className="bg-bg-light-mode dark:bg-gray-900 rounded-xl p-6 sm:ml-64 max-w-screen-xl mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {t("details about the")}{" "}
          <span className="text-secondary-500">{t("exercises")}</span>
        </h2>
        <div className="flex justify-center items-center h-64">
          <BeatLoader color="#fba518" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-light-mode dark:bg-gray-900 rounded-xl p-6 sm:ml-64 mt-[88px] max-w-screen-xl mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        {t("details about the")}{" "}
        <span className="text-secondary-500">{t("exercises")}</span>
      </h2>

      {/* Grid Layout for Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levelsData.map((level, index) => {
          const progress =
            level.total > 0
              ? ((level.completed / level.total) * 100).toFixed(2)
              : 0; // Prevent division by zero

          return (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6">
                {/* Level Image */}
                <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img
                    className="w-12 h-12 object-cover"
                    src={level.image}
                    alt={level.name}
                  />
                </div>

                {/* Level Name */}
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">
                  {level.name}
                </h3>

                {/* Completion Text */}
                <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
                  <span className="font-medium text-secondary-500">
                    {level.completed}
                  </span>{" "}
                  / {level.total} {t("done")}
                </p>

                {/* Progress Bar with Animation */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-secondary-500 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Progress Percentage */}
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {progress}% {t("completed")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exercise Details Section - Only show if there are answers */}
      {userAnswers.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {t("exercise details")}
          </h2>
          <ul className="space-y-4">
            {userAnswers.map((item, index) => (
              <li
                key={index}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {item.ex_title}
                  </h3>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-xs font-medium">
                    Level {item.ex_level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.ex_description?.substring(0, 100)}...
                </p>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-secondary-500 dark:text-secondary-400">
                    Score: {item.scores}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {t("completed")}:{" "}
                    {new Date(item.complete_date).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-12 text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
            {t("no exercises completed yet")}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t("start taking exercises to see your progress history here")}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsSummary;
