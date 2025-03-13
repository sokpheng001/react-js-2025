import React from "react";
import { useParams } from "react-router";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import MultipleChoiceQuiz from "../../../../components/exercises/MultipleChoiceQuiz";
import { useAllVocabulariesQuery } from "../../../../redux/features/vocabularies/VocabulariesSlice";
import FillInTheBlankQuiz from "../../../../components/exercises/FillInTheBlankQuiz";
import TrueFalseQuiz from "../../../../components/exercises/TrueFalseQuiz";
import fillInTheBlankData from "../../../../components/quiz/00895195-49a4-4943-ba46-5128b21ca67d";

export default function VocabulariesExercises() {
  const { lessonId } = useParams(); // Get lesson ID from URL
  const { data } = useAllVocabulariesQuery();

  console.log("Data query in vocabulary  : ", data);
  const allData = data?.payload;

  // Find the lesson with the matching ID
  const lesson = allData
    ?.flatMap((item) => item.lessons)
    .find((l) => l.lesson_uuid === lessonId);

  console.log("Lesson : ", lesson);

  if (!lesson) return <p>Lesson not found</p>;

  // Get exercises directly from the found lesson instead of all exercises
  const lessonExercises = lesson?.exercises || [];
  console.log("Lesson exercises: ", lessonExercises);

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
              {/* This is for voice and video :  */}
              <div className="w-full aspect-video">
                {/* {section.voice?.[0]?.voice_url ? (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{
                      __html: section.voice[0].voice_url.replace(
                        "<iframe",
                        '<iframe style="width:100%; height:100%;"'
                      ),
                    }}
                  />
                ) : (
                  // Fallback Video

                  section.section_uuid ===
                    "00a52469-946d-4cc3-9952-205c6e82b39b" && (
                    <iframe
                      src="https://www.youtube.com/embed/ugsRzHMIF2o"
                      title="Fallback Video"
                      frameBorder="0"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  )
                )} */}

                <div className="w-full aspect-video">
                  {section.voice?.[0]?.voice_url ? (
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{
                        __html: section.voice[0].voice_url.replace(
                          "<iframe",
                          '<iframe style="width:100%; height:100%;"'
                        ),
                      }}
                    />
                  ) : section.section_uuid ===
                    "00a52469-946d-4cc3-9952-205c6e82b39b" ? (
                    // Fallback Video for specific ID
                    <iframe
                      src="https://www.youtube.com/embed/ugsRzHMIF2o"
                      title="Fallback Video"
                      frameBorder="0"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  ) : section.section_uuid ===
                    "f8e6c2c3-6fa4-4a9a-af19-5d7f52a33823" ? (
                    // Fallback Video for another specific ID
                    <iframe
                      src="https://www.youtube.com/embed/D0Ajq682yrA?si=_pinAr-gHI1hAGGx"
                      title="Fallback Video"
                      frameBorder="0"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    // Default fallback if no conditions match
                    <div className="text-center">Video not available</div>
                  )}
                </div>
              </div>
              {/* f8e6c2c3-6fa4-4a9a-af19-5d7f52a33823 */}
              {/* This is for example :  */}
              <p className="font-semibold text-heading-4 text-primary-600 dark:text-whites py-5">
                Example :{" "}
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
          Reading :
        </h3>
        <div className="ml-5">
          {lessonExercises.map((exercise, index) => {
            // Get questions for this specific exercise
            const exerciseData =
              exercise?.questions?.map((item, index) => ({
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
              })) || [];

            // Get question type from the current exercise, with proper optional chaining
            // From console output, we can see type is directly in the question object
            const questionType = exercise?.questions?.[0]?.type || "";
            console.log("Question Type for exercise", index, ":", questionType);

            return (
              <div key={index}>
                <p
                  className="text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode leading-8"
                  dangerouslySetInnerHTML={{
                    __html: exercise.transcript,
                  }}
                ></p>
                <h3 className="font-semibold text-heading-4 text-primary-600 dark:text-white py-5">
                  Tip :
                </h3>
                <p
                  className="text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode leading-8"
                  dangerouslySetInnerHTML={{
                    __html: exercise.tip,
                  }}
                ></p>
                <div className="flex flex-col gap-10">
                  {questionType === "MULTIPLE_CHOICES" && (
                    <MultipleChoiceQuiz
                      exercises={exerciseData}
                      ex_uuid={exercise.ex_uuid}
                    />
                  )}

                  {questionType === "FILL_IN_THE_BLANK" && (
                    <FillInTheBlankQuiz
                      exercises={exerciseData}
                      ex_uuid={exercise.ex_uuid}
                    />
                  )}
                  {questionType === "TRUE_OR_FALSE" && (
                    <TrueFalseQuiz
                      exercises={exerciseData}
                      ex_uuid={exercise.ex_uuid}
                    />
                  )}
                  {exercise.ex_uuid ===
                    "00895195-49a4-4943-ba46-5128b21ca67d" && (
                    <FillInTheBlankQuiz
                      exercises={fillInTheBlankData}
                      ex_uuid={"00895195-49a4-4943-ba46-5128b21ca67d"}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
