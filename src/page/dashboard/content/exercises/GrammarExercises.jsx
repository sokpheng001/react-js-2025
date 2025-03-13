import React from "react";
import { useParams } from "react-router-dom";
import { useAllGrammarQuery } from "../../../../redux/features/grammar/grammarSlice";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import MultipleChoiceQuiz from "../../../../components/exercises/MultipleChoiceQuiz";
import FillInTheBlankQuiz from "../../../../components/exercises/FillInTheBlankQuiz";
import TrueFalseQuiz from "../../../../components/exercises/TrueFalseQuiz";

export default function GrammarExercises() {
  const { lessonId } = useParams(); // Get lesson ID from URL
  const { data, isLoading, error } = useAllGrammarQuery();

  // Exit early if data is not available
  if (isLoading) {
    return (
      <div className="mt-[88px] sm:pl-64">
        <HeroSkeleton />
        <CoursesSkeleton />
      </div>
    ); // Show loading while fetching data
  }

  if (error) {
    return (
      <div>
        <ServerErrorPage />
      </div>
    ); // Show error if there's a problem fetching the data
  }

  // Find the current lesson
  const lesson = data
    .flatMap((item) => item.lessons)
    .find((l) => l.lesson_uuid === lessonId);

  if (!lesson) return <p>Lesson not found</p>;

  // Get exercises for the current lesson
  const exercises = lesson.exercises || [];

  // Exit if no exercises available
  if (!exercises.length) return <p>No exercises available for this lesson</p>;

  const firstExercise = exercises[0];
  const exerciseQuestions = firstExercise?.questions || [];
  const ex_uuid = firstExercise?.ex_uuid;

  // Check if we're dealing with multiple choice or fill-in-the-blank
  const questionType =
    exerciseQuestions.length > 0
      ? exerciseQuestions[0].type?.toUpperCase()
      : null;

  // Map question data to the required format for exercise components
  const exercisesData = exerciseQuestions.map((item, index) => ({
    id: index + 1,
    question_text: item.question_text,
    question_uuid: item.q_uuid,
    correct_answer: item.correct_answer?.[0]?.answer || "",
    choices:
      item.choices?.map((choice) => ({
        choice_uuid: choice.choice_uuid,
        is_correct: choice.is_correct,
        text: choice.text,
      })) || [],
  }));

  return (
    <div className="p-4 sm:ml-64 mt-[88px]">
      <HeroLevel
        title={lesson.lesson_title}
        thumnail={lesson.thumbnail}
        description={lesson.description}
      />
      <div className="max-w-screen-lg m-auto">
        <ul className="w-full">
          {lesson.sections?.map((section, index) => (
            <li key={index}>
              <h3 className="font-semibold text-heading-4 text-primary-600 dark:text-white">
                {section.title}
              </h3>
              <p className="text-des-3 leading-10 text-text-des-light-mode dark:text-text-des-dark-mode">
                {section.description}
              </p>
              {/* This is for voice and video */}
              {section.voice && section.voice[0] && (
                <div className="w-full aspect-video">
                  {section.section_uuid ===
                    "9a131970-a467-48bf-bc38-e2c00057efc3" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/950458364?h=a06c6f907a"
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "cde35434-7e3c-46e6-8928-b0d1e08151cc" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/578764044?h=e5b16850b\"
                      className="w-full h-full"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "5d816c0c-365f-48ab-b5a9-cf441a90e043" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/950450492?h=a671b93a60"
                      className="w-full h-full"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "49773e7e-7d96-4958-b86e-483a4961d9eb" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/1013755225?h=02dcf36321"
                      className="w-full h-full"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "c53c0d91-88fa-40aa-8f54-787b32b569ed" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/950476834?h=e776fbe834"
                      className="w-full h-full"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "0619cd12-7e6e-4052-9013-2403c2eed67a" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/1013756783?h=6307ebb6a0"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "6b0dc470-4c43-4eff-9034-c04a3afb82b4" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/1002224317?badge=0&autopause=0&player_id=0&app_id=58479"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "8c452a34-addc-45fc-927f-5609862d1757" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/1002217261?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "144ee728-672a-43a8-b32d-30da9ab2a69e" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/1002224936?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "2ab5d582-99c5-428a-b5a4-42607bc1335f" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/580175225"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "ba761987-d91d-48a2-9c56-ba28bc50cbda" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/579307802"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "ed8309f6-be82-4fc6-b4e6-a39a0d7fd62c" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/927016194?h=52edb5c72d"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "3efdecae-85c7-4468-a6f7-a71a7d1701ff" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/580128992?h=98b8e50d7a"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                  {section.section_uuid ===
                    "cb4fa1d8-c90d-42c5-978c-fb863d443f4d" && (
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/1002233425?badge=0&autopause=0&transparent=0&player_id=0&app_id=58479"
                      frameborder="0"
                      className="w-full h-full"
                      allowfullscreen
                    ></iframe>
                  )}
                </div>
              )}
              {/* This is for example */}
              <p className="font-semibold text-heading-4 text-primary-600 dark:text-whites py-5">
                Example:{" "}
              </p>
              {section.examples && section.examples[0] && (
                <div
                  className="text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode leading-8"
                  dangerouslySetInnerHTML={{
                    __html: section.examples[0].example,
                  }}
                />
              )}
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-heading-4 text-primary-600 dark:text-white py-5">
          Reading:
        </h3>
        <div className="ml-5">
          {lesson.exercises?.map((exercise, index) => (
            <div key={index}>
              <p
                className="text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode leading-8"
                dangerouslySetInnerHTML={{
                  __html: exercise.transcript,
                }}
              ></p>
              <h3 className="font-semibold text-heading-4 text-primary-600 dark:text-white py-5">
                Tip:
              </h3>
              <p
                className="text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode leading-8"
                dangerouslySetInnerHTML={{
                  __html: exercise.tip,
                }}
              ></p>
            </div>
          ))}

          {questionType === "MULTIPLE_CHOICES" && (
            <MultipleChoiceQuiz exercises={exercisesData} ex_uuid={ex_uuid} />
          )}

          {questionType === "FILL_IN_THE_BLANK" && (
            <FillInTheBlankQuiz exercises={exercisesData} ex_uuid={ex_uuid} />
          )}
          {questionType === "TRUE_OR_FALSE" && (
            <TrueFalseQuiz exercises={exercisesData} ex_uuid={ex_uuid} />
          )}
        </div>
      </div>
    </div>
  );
}
