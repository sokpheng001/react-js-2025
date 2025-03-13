import { useParams } from "react-router-dom"; // To access the URL params
import FillInTheBlankQuiz from "../../../../components/exercises/FillInTheBlankQuiz";
import DOMPurify from "dompurify";

import MultipleChoiceQuiz from "../../../../components/exercises/MultipleChoiceQuiz";
import TrueFalseQuiz from "../../../../components/exercises/TrueFalseQuiz";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import { useFetchExerciseByIdQuery } from "../../../../redux/features/exercises/exercisesSlice"; // Import the custom hook

const SpeakingExercises = () => {
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
        <ServerErrorPage />ß
      </div>
    ); // Show error if there's a problem fetching the data
  }
  console.log("Data Video : ", data);

  // use for check have sound or not
  const soundExtensions = [".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a"];

  const hasSoundExtension = (voice) => {
    return soundExtensions.some((ext) => voice?.toLowerCase().endsWith(ext));
  };

  // use for check have video or not
  const isIframeTag = (video) => {
    return video?.includes("<iframe");
  };

  const transcript = data?.transcript || "";
  const tip = data?.tip || "";
  console.log("Tip : ", data?.tip);
  console.log("The Data : ", data);
  console.log("This is an Data Of Exercises : ", data?.questions);
  console.log("Type of exericses : ", data.voice);

  // TODO Multiple Choies
  if (data?.questions[0].type?.toUpperCase() === "MULTIPLE_CHOICES") {
    const exercisesData = data?.questions.map((item, index) => ({
      id: index + 1,
      question_text: item.question_text,
      question_uuid: item.q_uuid, // this is an question uuid
      correct_answer: item.correct_answer[0].answer || "", // Ensure correct_answer is a string
      choices: item.choices.map((choice) => ({
        choice_uuid: choice.choice_uuid,
        is_correct: choice.is_correct,
        text: choice.text,
      })),
    }));

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
            <div className="rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={data.thumbnail}
                  alt="People collaborating at work"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="max-w-screen-lg m-auto ">
              <div className="p-4">
                <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-10">
                  {data.description}
                </p>
              </div>
              {/* This is Voice */}
              {hasSoundExtension(data.voice) && (
                <h3 className="p-4 text-heading-3 text-primary-500">
                  Listening:
                  <audio controls className="w-full">
                    <source src={data.voice} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </h3>
              )}

              {/* This is video */}

              {data.ex_uuid === "3b2a3076-a30d-4ce9-aab0-0888a4e6078f" ? (
                <div className="w-full aspect-video">
                  <iframe
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/770046095?h=90c9a5939c"
                    className="w-full h-full"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              ) : (
                isIframeTag(data.video) && (
                  <div className="p-4">
                    <h3 className="text-heading-3 text-primary-500 mb-5">
                      Watching:
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: data.video }} />
                  </div>
                )
              )}

              {/* Reading */}
              <h3 className="p-4 text-heading-3 text-primary-500">Reading</h3>

              <div className="p-4 text-black text-des-2 text-justify dark:text-white m-auto leading-10">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(transcript),
                  }}
                />
              </div>
              <div className="text-des-2 leading-10 p-4 dark:text-text-des-dark-mode">
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
            <div className="rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={data.thumbnail}
                  alt="People collaborating at work"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            {/* Description */}
            <div className="p-4">
              <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-10">
                {data.description}
              </p>
            </div>
            <div className="max-w-[1000px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(transcript),
                }}
              />
            </div>
            <div className="max-w-[1000px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(tip),
                }}
              />
            </div>
            <FillInTheBlankQuiz exercises={exercisesData} />
          </div>
        </div>
      </div>
    );
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
      <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
        <div className="max-w-full">
          <div className="container mx-auto px-4">
            <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
              <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
                {data.title}
              </h1>
            </div>
            {/* Hero Section */}
            <div className="rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={data.thumbnail}
                  alt="People collaborating at work"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            {/* Description */}
            <div className="p-4">
              <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-10">
                {data.description}
              </p>
            </div>
            <div className="max-w-[1000px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(transcript),
                }}
              />
            </div>
            <div className="max-w-[1000px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(tip),
                }}
              />
            </div>

            {/* <div>
              <MultipleChoice exercise={exerciseData} />
            </div> */}
            <div className="">
              {data?.questions[0].type?.toUpperCase() === "TRUE_OR_FALSE" ? (
                <TrueFalseQuiz exercises={exercisesData} />
              ) : // <h1>"for true and false question"</h1>
              data?.questions[0].type?.toUpperCase() === "MULTIPLE_CHOICES" ? (
                <MultipleChoiceQuiz exercises={exercisesData} />
              ) : data?.questions[0].type?.toUpperCase() ===
                "FILL_IN_THE_BLANK" ? (
                <FillInTheBlankQuiz exercises={exercisesData} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SpeakingExercises;
