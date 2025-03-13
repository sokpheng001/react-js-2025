export const submitExercises = async (exercise_uuid, selectedAnswers) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const user_uuid = userData?.user_uuid;

  if (!user_uuid) {
    console.warn("No user found! Cannot submit.");
    return { success: false, message: "No user found!" };
  }

  // Ensure correct format for user_answer
  const user_answer = selectedAnswers.user_answer.map((answerObj) => ({
    q_uuid: answerObj.q_uuid, // Ensure the question UUID is included
    answers: answerObj.answers, // Ensure answers are properly structured
  }));

  console.log("Request Body:", {
    user_uuid,
    user_answer,
  });

  try {
    const response = await fetch(
      `https://english-club.istad.co/exercise/${exercise_uuid}/submit_answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_uuid,
          user_answer,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit exercise. Status: ${response.status}. Message: ${errorText}`
      );
    }

    const result = await response.json();
    console.log("Submission successful:", result);
    return { success: true, result };
  } catch (error) {
    console.error("Error submitting exercises:", error);
    return { success: false, message: "Submission failed" };
  }
};
