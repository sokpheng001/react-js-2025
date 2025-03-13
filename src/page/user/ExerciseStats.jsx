import React, { useState, useEffect, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import {
  useFetchExercisesQuery,
  useFetchSubmitExercisesQuery,
  useFetchSubmitExercisesByLevelQuery,
} from "../../redux/features/exercises/exerciseApi";
import { useTranslation } from "react-i18next";
import { BeatLoader } from "react-spinners";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const ExerciseStats = () => {
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation("userProfile");
  const { data: allExercises, isLoading: isExercisesLoading } =
    useFetchExercisesQuery();
  const { data: submitExercises, isLoading: isSubmitExercisesLoading } =
    useFetchSubmitExercisesQuery(userData?.user_uuid);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false }); // Set once: false to retrigger animations
  }, []);

  const levels = ["A1", "A2", "B1", "B2", "C1"];
  const exercisesByLevel = levels.map((level) => {
    const { data: exercises } = useFetchSubmitExercisesByLevelQuery({
      user_uuid: userData?.user_uuid,
      level,
    });
    return { level, exercises };
  });

  // Memoize groupedExercises to prevent unnecessary recalculations
  const groupedExercises = useMemo(() => {
    return (
      allExercises?.reduce((acc, exercise) => {
        const level = exercise.exercise_level;
        if (!acc[level]) acc[level] = [];
        acc[level].push(exercise);
        return acc;
      }, {}) || {}
    );
  }, [allExercises]); // Only recalculate when allExercises changes

  // Calculate completion percentage
  // const totalA1 = calculateCompletionPercentage(
  //   exercisesByLevel,
  //   groupedExercises,
  //   "A1"
  // );
  // const totalA2 = calculateCompletionPercentage(
  //   exercisesByLevel,
  //   groupedExercises,
  //   "A2"
  // );
  // const totalB1 = calculateCompletionPercentage(
  //   exercisesByLevel,
  //   groupedExercises,
  //   "B1"
  // );
  // const totalB2 = calculateCompletionPercentage(
  //   exercisesByLevel,
  //   groupedExercises,
  //   "B2"
  // );
  // const totalC1 = calculateCompletionPercentage(
  //   exercisesByLevel,
  //   groupedExercises,
  //   "C1"
  // );

  const [state, setState] = useState({
    series: [
      groupedExercises?.A1?.length || 0,
      groupedExercises?.A2?.length || 0,
      groupedExercises?.B1?.length || 0,
      groupedExercises?.B2?.length || 0,
      groupedExercises?.C1?.length || 0,
    ],
    options: {
      chart: { type: "donut" },
      labels: ["A1", "A2", "B1", "B2", "C1"],
      colors: ["#c98413", "#fba518", "#c98413", "#fba518", "#e29516"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: "bottom" },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: t("total of Exercises"),
                formatter: function (w) {
                  return allExercises?.length || 0;
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return (
            opts.w.globals.labels[opts.seriesIndex] +
            ": " +
            val.toFixed(2) +
            "%"
          );
        },
      },
      legend: { position: "right" },
    },
  });

  // Update state when allExercises data is available
  useEffect(() => {
    if (!isExercisesLoading && allExercises) {
      setState((prevState) => ({
        ...prevState,
        series: [
          groupedExercises?.A1?.length || 0,
          groupedExercises?.A2?.length || 0,
          groupedExercises?.B1?.length || 0,
          groupedExercises?.B2?.length || 0,
          groupedExercises?.C1?.length || 0,
        ],
        options: {
          ...prevState.options,
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: t("total of Exercises"),
                    formatter: function (w) {
                      return allExercises.length;
                    },
                  },
                },
              },
            },
          },
        },
      }));
    }
  }, [isExercisesLoading, allExercises, groupedExercises]);

  // Show loading state while waiting for data
  if (isExercisesLoading) {
    return (
      <div className="bg-bg-light-mode dark:bg-gray-900 rounded-xl p-6 sm:ml-64 max-w-screen-xl mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {t("rate of exercises")}{" "}
          <span className="text-secondary-500">{t("by level")}</span>
        </h2>
        <div className="flex justify-center items-center h-64">
          <BeatLoader color="#fba518" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-4 sm:ml-64 mt-[88px] max-w-screen-xl place-items-center place-content-center text-second bg-bg-light-mode dark:bg-gray-900 rounded-xl"
      data-aos="fade-up"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        {t("rate of exercises")}{" "}
        <span className="text-secondary-500">{t("by level")}</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 justify-center items-center">
        {/* Donut Chart */}
        <div
          className="w-[25rem] h-[18rem] md:w-[25rem] md:h-[25rem] lg:w-[29rem] lg:h-[29rem] chart order-2"
          data-aos="fade-right"
        >
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            width="100%"
            height="100%"
            className="flex justify-center items-center mt-9"
          />
        </div>

        {/* Image */}
        <div className="h-[470px] order-1" data-aos="fade-left">
          <img
            className="h-full"
            src="../../../public/svg/UserProfile.svg"
            alt="Completion"
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseStats;
