import React, { useState } from "react";
import { submitExercises } from "../../services/submitExercises.js";

const MultipleChoice = ({ exercise }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleAnswerSelection = (choice) => {
    if (!isSubmitted) {
      setSelectedAnswer(choice.choice_uuid);
    }
  };

  // const handleSubmit = () => {
  //   setIsSubmitted(true);
  // };

  const handleSubmit = async () => {
    setIsSubmitted(true);

    // Preparing the selected answer for submission
    const selectedAnswers = {
      [exercise.question_uuid]: selectedAnswer,
    };

    // Call submitExercises to send the answers
    const result = await submitExercises(
      exercise.exercise_uuid,
      selectedAnswers
    );

    // Display feedback based on the result of the submission
    if (result.success) {
      setFeedbackMessage("Exercise submitted successfully!");
    } else {
      setFeedbackMessage(`Error: ${result.message}`);
    }
  };

  const isCorrect =
    exercise.choices.find((choice) => choice.choice_uuid === selectedAnswer)
      ?.is_correct || false;

  //  Handle Submit exercises :

  return (
    <div>
      <h2>{exercise.question_text}</h2>
      {exercise.choices.map((choice) => (
        <div key={choice.choice_uuid}>
          <label>
            <input
              type="radio"
              name="answer"
              value={choice.choice_uuid}
              checked={selectedAnswer === choice.choice_uuid}
              onChange={() => handleAnswerSelection(choice)}
              disabled={isSubmitted}
            />
            {choice.text}
          </label>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={isSubmitted}>
        Submit
      </button>
      {isSubmitted && (
        <div>
          {isCorrect ? (
            <p style={{ color: "green" }}>Correct!</p>
          ) : (
            <p style={{ color: "red" }}>
              Incorrect. The correct answer is:{" "}
              {exercise.choices.find((choice) => choice.is_correct)?.text}
            </p>
          )}
        </div>
      )}
      {feedbackMessage && <p>{feedbackMessage} Hello</p>}
    </div>
  );
};

export default MultipleChoice;
