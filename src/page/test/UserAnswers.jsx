import { useEffect, useState } from "react";

const UserAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [levelCounts, setLevelCounts] = useState({
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
    C2: 0,
  });

  useEffect(() => {
    const fetchUserAnswers = async () => {
      const token = localStorage.getItem("access_token");
      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData?.user_uuid;

      if (!token || !userId) {
        setError("User not authenticated");
        setLoading(false);
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
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("User Answers:", data);

        // Set the answers
        setAnswers(data.payload || []);

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

        setLevelCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user answers:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserAnswers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Completed Exercises Summary</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(levelCounts).map(([level, count]) => (
          <div key={level} className="p-3 bg-gray-50 rounded shadow-sm">
            <h3 className="font-bold text-lg">{level}</h3>
            <p className="text-2xl">
              {count} <span className="text-sm text-gray-500">exercises</span>
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        Total Unique Exercises:{" "}
        {Object.values(levelCounts).reduce((sum, count) => sum + count, 0)}
      </h3>

      <h2 className="text-xl font-bold mt-6 mb-4">Exercise Details</h2>
      {answers.length === 0 ? (
        <p>No answers submitted yet</p>
      ) : (
        <ul className="space-y-4">
          {answers.map((item, index) => (
            <li key={index} className="p-3 border border-gray-200 rounded">
              <div className="flex justify-between">
                <h3 className="font-medium">{item.ex_title}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Level {item.ex_level}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {item.ex_description?.substring(0, 100)}...
              </p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Score: {item.scores}</span>
                <span>
                  Completed: {new Date(item.complete_date).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAnswers;
