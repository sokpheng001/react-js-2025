import React, { useState } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import SubmitPopup from "../popup/SubmitPopup.jsx";

const MultipleChoiceQuiz = ({ exercises, ex_uuid }) => {
  const { t } = useTranslation("error");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Function to play sound
  const playSound = (soundName) => {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    // audio.play();
  };

  // Handle answer selection
  const handleAnswerSelection = (exerciseId, choiceId) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [exerciseId]: choiceId,
      }));
    }
  };

  // Check if all questions are answered
  const isAllAnswered = exercises.every(
    (exercise) => selectedAnswers[exercise.id]
  );

  // Prepare the answers object
  const prepareAnswers = () => {
    return {
      user_answer: exercises.map((exercise) => ({
        q_uuid: exercise.question_uuid,
        answers: selectedAnswers[exercise.id]
          ? [selectedAnswers[exercise.id]]
          : [],
      })),
    };
  };

  // Handle submission
  const handleSubmit = async () => {
    if (isAllAnswered) {
      setIsSubmitted(true);

      const answers = prepareAnswers();

      const result = await submitExercises(ex_uuid, answers);

      if (result.success) {
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
        setFeedbackMessage(`${t("multipleChoics")}`);
      }
    }
  };

  return (
    <div className="text-black p-6 bg-white border-2 border-gray-600 dark:bg-bg-dark-mode dark:text-white shadow-md rounded-lg">
      {exercises.map((exercise, index) => {
        const selectedAnswer = selectedAnswers[exercise.id];
        const isCorrect =
          exercise.choices.find(
            (choice) => choice.choice_uuid === selectedAnswer
          )?.is_correct || false;

        return (
          <div key={exercise.id} className="mb-6">
            <h2 className="font-bold text-heading-4 mb-2 text-primary-100">
              {index + 1}. {exercise.question_text}
            </h2>
            {exercise.choices.map((choice) => (
              <div key={choice.choice_uuid} className="mb-2">
                <label className="flex items-center gap-2 text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode">
                  <input
                    type="radio"
                    name={`exercise-${exercise.id}`}
                    value={choice.choice_uuid}
                    checked={selectedAnswer === choice.choice_uuid}
                    onChange={() =>
                      handleAnswerSelection(exercise.id, choice.choice_uuid)
                    }
                    disabled={isSubmitted}
                    className="cursor-pointer"
                  />
                  {choice.text}
                </label>
              </div>
            ))}
            {isSubmitted && (
              <p
                className={`mt-2 ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect
                  ? "Correct!"
                  : `Incorrect. Correct answer: ${
                      exercise.choices.find((c) => c.is_correct)?.text
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
            ? "bg-primary-500 hover:bg-primary-600"
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

export default MultipleChoiceQuiz;
