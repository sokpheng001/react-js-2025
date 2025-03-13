import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../redux/features/user/userSlice";
import { useAllLessonsQuery } from "../../redux/features/lesson/lessonSlice";
import { useFetchExercisesQuery } from "../../redux/features/exercises/exerciseApi";
import AOS from "aos";
import "aos/dist/aos.css";

const Description = () => {
  const { t } = useTranslation("homepage");

  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetUserQuery();
  const {
    data: lessons,
    isLoading: isLessonsLoading,
    error: lessonsError,
  } = useAllLessonsQuery();
  const {
    data: exercises,
    isLoading: isExercisesLoading,
    error: exercisesError,
  } = useFetchExercisesQuery();

  // Access videoIds from Redux store
  const videoIds = useSelector((state) => state.videos.videoIds);

  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init();
  }, []);

  // States to track loaded data
  const [userCount, setUserCount] = useState(0);
  const [lessonCount, setLessonCount] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);

  // UseEffect to update counts when data is loaded
  useEffect(() => {
    if (!isUsersLoading) {
      setUserCount(users?.payload?.length || 0);
    }
    if (!isLessonsLoading) {
      setLessonCount(lessons?.payload?.length || 0);
    }
    if (!isExercisesLoading) {
      setExerciseCount(exercises?.length || 0);
    }
    setVideoCount(videoIds?.length || 0);
  }, [
    isUsersLoading,
    isLessonsLoading,
    isExercisesLoading,
    users,
    lessons,
    exercises,
    videoIds,
  ]);

  return (
    <>
      {/* count number */}
      <div className="flex items-center justify-center" data-aos="fade-up">
        <div className="bg-[#fdfefe] dark:bg-transparent rounded-3xl shadow-md dark:shadow-none p-6 grid grid-cols-2 md:flex md:justify-around w-full gap-4 md:gap-0">
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">
              {/* Start CountUp from 0 and dynamically set the end value */}
              <CountUp start={0} end={userCount} duration={10} />
            </p>
            <p className="text-lg text-black dark:text-[#fdfefe]">
              {t("ca-student")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">
              <CountUp start={0} end={lessonCount} duration={15} />
            </p>
            <p className="text-lg text-black dark:text-[#fdfefe]">
              {t("ca-lesson")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">
              <CountUp start={0} end={exerciseCount} duration={15} />
            </p>
            <p className="text-lg text-black dark:text-[#fdfefe]">
              {t("ca-exercise")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">
              <CountUp start={0} end={videoCount} duration={15} />
            </p>
            <p className="text-lg text-black dark:text-[#fdfefe]">
              {t("ca-videos")}
            </p>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Description;
