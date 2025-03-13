import { useParams } from "react-router-dom"; // To access the URL params
import FillInTheBlankQuiz from "../../../../components/exercises/FillInTheBlankQuiz";
import DOMPurify from "dompurify";

import MultipleChoiceQuiz from "../../../../components/exercises/MultipleChoiceQuiz";
import TrueFalseQuiz from "../../../../components/exercises/TrueFalseQuiz";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import { useFetchExerciseByIdQuery } from "../../../../redux/features/exercises/exercisesSlice"; // Import the custom hook
import AmeesageYourAreLate from "../../../../components/transcript/reading/AmeesageYourAreLate";

const ExerciseDetail = () => {
  const { ex_uuid } = useParams(); // Extract the ex_uuid from the URL using useParams
  const { data, isLoading, error } = useFetchExerciseByIdQuery(ex_uuid); // Use the query with ex_uuid as the argument

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

  // Retrieving the object from localStorage and converting it back

  const transcript = data?.transcript || "";
  const tip = data?.tip || "";

  console.log(data.ex_uuid);

  // TODO Multiple Choies
  if (data?.questions[0].type?.toUpperCase() === "MULTIPLE_CHOICES") {
    const exercisesData = data?.questions.map((item, index) => ({
      id: index + 1,
      question_text: item.question_text,
      question_uuid: item.q_uuid, // this is an question uuid
      correct_answer: item.correct_answer[0].answer || "", // Ensure correct_answer is a string
      choices: item.choices.map((choice) => ({
        choice_uuid: choice.text,
        is_correct: choice.is_correct,
        text: choice.text,
      })),
    }));

    return (
      <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
        <div className="max-w-full">
          <div className="container mx-auto px-4">
            <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
              <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
                {data.title}
              </h1>
            </div>
            {/* Hero Section */}
            <div className="mb-10">
              <div className="relative">
                {/* Image */}
                <img
                  src={data.thumbnail}
                  alt="People collaborating at work"
                  className="w-full h-[400px] object-cover"
                />

                {/* Text Below Image */}
                <div className="bg-white relative -mt-20 z-10 mx-auto max-w-screen-lg rounded-tl-[50px] rounded-br-[50px] shadow-lg dark:bg-bg-dark-mode dark:text-text-des-dark-mode dark:border-2 p-6 border-white/20 text-des-2">
                  <p className="text-justify leading-10">{data.description}</p>
                </div>
              </div>
            </div>
            {/*  Section To learn */}
            <div className="max-w-screen-lg m-auto">
              {/* Reading */}
              <h3 className="text-heading-3 text-primary-500">Reading :</h3>

              <div className="text-black text-des-2 text-justify dark:text-text-des-dark-mode m-auto leading-10">
                {data.ex_uuid == "2a0b7199-3bbf-4fb1-a0ae-c5816e56da29" ? (
                  <AmeesageYourAreLate />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(transcript),
                    }}
                  />
                )}
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(transcript),
                  }}
                /> */}
              </div>
              <div className="dark:text-text-des-dark-mode text-des-2 text-justify leading-10 py-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(tip),
                  }}
                />
              </div>
              <MultipleChoiceQuiz exercises={exercisesData} ex_uuid={ex_uuid} />
            </div>
          </div>
        </div>
      </div>
    );
    // TODO Fill in The blank
  } else if (data?.questions[0].type?.toUpperCase() === "FILL_IN_THE_BLANK") {
    // Assuming 'data' contains your original data shown in the console
    const exercisesData = data.questions.map((question, index) => {
      console.log("Question : ", question);

      return {
        id: index + 1,
        question_text: question.question_text,
        question_uuid: question.q_uuid,
        correct_answer: Array.isArray(question.correct_answer)
          ? question.correct_answer[0]
          : question.correct_answer,
      };
    });

    console.log(exercisesData);
    return (
      <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
        <div className="max-w-full">
          <div className="container mx-auto px-4">
            <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
              <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
                {data.title}
              </h1>
            </div>
            {/* Hero Section */}
            <div className="mb-10">
              <div className="relative">
                {/* Image */}
                <img
                  src={data.thumbnail}
                  alt="People collaborating at work"
                  className="w-full h-[400px] object-cover"
                />

                {/* Text Below Image */}
                <div className="bg-white relative -mt-20 z-10 mx-auto max-w-screen-md rounded-tl-[50px] rounded-br-[50px] shadow-lg dark:bg-bg-dark-mode dark:text-text-des-dark-mode dark:border-2 p-6 border-white/20">
                  <p className="text-justify leading-10">{data.description}</p>
                </div>
              </div>
            </div>
            {/* Section */}
            <div className="max-w-screen-md m-auto">
              <div className="text-black text-des-2 text-justify dark:text-text-des-dark-mode m-auto leading-10">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(transcript),
                  }}
                />
              </div>
              <div className="dark:text-text-des-dark-mode text-des-2 text-justify leading-10 py-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(tip),
                  }}
                />
              </div>
              <FillInTheBlankQuiz exercises={exercisesData} ex_uuid={ex_uuid} />
            </div>
          </div>
        </div>
      </div>
    );
    // TODO True False
  } else if (data?.questions[0].type?.toUpperCase() === "TRUE_OR_FALSE") {
    // Assuming 'data' is your original array from the console output
    const exercisesData = data?.questions.map((item, index) => {
      // Find the correct answer value from the correct_answer array
      let correctAnswerValue;
      if (item.correct_answer && item.correct_answer.length > 0) {
        correctAnswerValue =
          item.correct_answer[0].answer === "string" ? true : false;
      } else {
        // Default fallback if correct_answer structure is different
        // Try to find the correct choice
        const correctChoice = item.choices?.find(
          (choice) => choice.is_correct === true
        );
        correctAnswerValue = correctChoice?.text === "string" ? true : false;
      }

      return {
        id: index + 1,
        question_text: item.question_text,
        correct_answer: correctAnswerValue,
      };
    });

    console.log(exercisesData);
    return (
      <div className="sm:ml-64 mt-[80px] mb-10">
        <div className="max-w-full">
          <div className="container mx-auto px-4">
            <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
              <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
                {data.title}
              </h1>
            </div>
            {/* Hero Section */}
            <div className="mb-10">
              <div className="relative">
                {/* Image */}
                <img
                  src={data.thumbnail}
                  alt="People collaborating at work"
                  className="w-full h-[400px] object-cover"
                />

                {/* Text Below Image */}
                <div className="bg-white relative -mt-20 z-10 mx-auto max-w-screen-md rounded-tl-[50px] rounded-br-[50px] shadow-lg dark:bg-bg-dark-mode dark:text-text-des-dark-mode dark:border-2 p-6 border-white/20">
                  <p className="text-justify leading-10">{data.description}</p>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="max-w-screen-md m-auto">
              <div className="text-black text-des-2 text-justify dark:text-text-des-dark-mode m-auto leading-10">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(transcript),
                  }}
                />
              </div>
              <div className="dark:text-text-des-dark-mode text-des-2 text-justify leading-10 py-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(tip),
                  }}
                />
              </div>
              <TrueFalseQuiz exercises={exercisesData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ExerciseDetail;
