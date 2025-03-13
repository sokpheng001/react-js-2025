import React, { useState } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import SubmitPopup from "../popup/SubmitPopup.jsx";

const TrueFalseQuiz = ({ exercises, ex_uuid }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const { t } = useTranslation("error");

  console.log("Data In True False : ", exercises);

  // Prepare answers for API submission in the correct format
  const prepareAnswers = () => {
    // Make sure we return an object with the proper structure
    if (!exercises || exercises.length === 0) {
      console.warn("No exercises found to prepare answers");
      return { user_answer: [] };
    }

    // Create the user_answer array with proper structure
    const user_answer = exercises
      .filter((exercise) => selectedAnswers[exercise.id]) // Only include answered questions
      .map((exercise) => {
        return {
          q_uuid: exercise.question_uuid, // Use q_uuid instead of question_id
          answers: [selectedAnswers[exercise.id]], // Put the choice_id in an array as answers
        };
      });

    return { user_answer };
  };

  // Function to play sound
  const playSound = (soundId) => {
    const sound = document.getElementById(soundId);
    if (sound) {
      sound.play().catch((error) => {
        console.error(`Error playing sound: ${error}`);
      });
    } else {
      console.warn(`Sound element with id '${soundId}' not found`);
    }
  };

  // Handle selection
  const handleAnswerSelection = (questionId, choiceId) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: choiceId,
      }));
    }
  };

  // Check if all questions are answered
  const isAllAnswered =
    exercises &&
    exercises.length > 0 &&
    exercises.every((exercise) => selectedAnswers.hasOwnProperty(exercise.id));

  // Handle submission
  const handleSubmit = async () => {
    if (isAllAnswered) {
      setIsSubmitted(true);

      try {
        // Prepare the answers in the format expected by the API
        const answers = prepareAnswers();

        console.log("Submitting answers:", answers);

        // Only call the API if we have answers to submit
        if (answers && answers.user_answer && answers.user_answer.length > 0) {
          const result = await submitExercises(ex_uuid, answers);

          console.log("This is result : ", result);

          if (result && result.success) {
            setFeedbackMessage("Exercise submitted successfully!");

            // Play the correct sound for each correct answer
            exercises.forEach((exercise, index) => {
              const selectedAnswer = selectedAnswers[exercise.id];
              const isCorrect =
                exercise.choices.find(
                  (choice) => choice.choice_uuid === selectedAnswer
                )?.is_correct || false;

              if (isCorrect) {
                playSound(`correct${index + 1}`);
              }
            });
          } else {
            setFeedbackMessage(t("trueFalse") || "Submission failed");
          }
        } else {
          console.error("No answers to submit");
          setFeedbackMessage("Error: No answers to submit");
        }
      } catch (error) {
        console.error("Error submitting exercises:", error);
        setFeedbackMessage(
          `Error: ${error.message || "Failed to submit exercises"}`
        );
      }
    }
  };

  // Find the correct choice for a question
  const getCorrectChoice = (question) => {
    return question.choices.find((choice) => choice.is_correct === true);
  };

  // Check if selected choice is correct
  const isChoiceCorrect = (question, selectedChoiceId) => {
    const selectedChoice = question.choices.find(
      (choice) => choice.choice_uuid === selectedChoiceId
    );
    return selectedChoice && selectedChoice.is_correct === true;
  };

  // If no exercises are provided, show a message
  if (!exercises || exercises.length === 0) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        No exercises available
      </div>
    );
  }

  return (
    <div className="p-6 dark:bg-bg-dark-mode dark:text-text-des-dark-mode dark:border-text-des-dark-mode dark:border-2 bg-white shadow-md rounded-lg">
      {/* Hidden audio elements for sounds */}
      {exercises.map((_, index) => (
        <audio
          key={`sound-${index}`}
          id={`correct${index + 1}`}
          src="/sounds/correct-answer.mp3"
          preload="auto"
        />
      ))}

      {exercises.map((exercise, index) => {
        const selectedChoiceId = selectedAnswers[exercise.id];
        const isAnswerCorrect =
          selectedChoiceId && isChoiceCorrect(exercise, selectedChoiceId);
        const correctChoice = getCorrectChoice(exercise);

        return (
          <div key={exercise.id} className="mb-6">
            <h2 className="font-bold text-lg mb-2">
              {index + 1}. {exercise.question_text}
            </h2>
            <div className="flex gap-4">
              {exercise.choices && exercise.choices.length > 0 ? (
                exercise.choices.map((choice) => (
                  <label
                    key={choice.choice_uuid}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name={`exercise-${exercise.id}`}
                      value={choice.choice_uuid}
                      checked={selectedChoiceId === choice.choice_uuid}
                      onChange={() =>
                        handleAnswerSelection(exercise.id, choice.choice_uuid)
                      }
                      disabled={isSubmitted}
                      className="cursor-pointer"
                    />
                    {choice.text}
                  </label>
                ))
              ) : (
                <p>No choices available for this question</p>
              )}
            </div>
            {isSubmitted && (
              <p
                className={`mt-2 ${
                  isAnswerCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAnswerCorrect
                  ? "Correct!"
                  : `Incorrect. The correct answer is: ${
                      correctChoice ? correctChoice.text : "Not available"
                    }`}
              </p>
            )}
          </div>
        );
      })}

      <button
        onClick={handleSubmit}
        disabled={!isAllAnswered || isSubmitted}
        className={`px-4 py-2 rounded-lg text-white ${
          isAllAnswered && !isSubmitted
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
      {/* Feedback message after submission */}
      {feedbackMessage && (
        <SubmitPopup
          message={feedbackMessage}
          type={feedbackMessage.includes("Error") ? "error" : "success"}
          onClose={() => setFeedbackMessage("")}
        />
      )}
    </div>
  );
};

export default TrueFalseQuiz;
