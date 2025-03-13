import React, { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IoCamera } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Typed from "typed.js";
import Skeleton from "react-loading-skeleton"; // Import the skeleton loader

const UserProfileForm = ({
  user,
  profilePreview,
  setProfilePreview, // Add this prop for setting profile preview
  handleFileChange, // Ensure handleFileChange is passed as prop
  handleUpdateProfile,
  isLoading, // Add an isLoading prop to conditionally show the skeleton loader
}) => {
  const theme = useSelector((state) => state.theme.theme); // Move inside the component
  const { t } = useTranslation("userProfile");
  // Get the first character of the username or default to "G" for Guest
  const profileFallback = user?.user_name
    ? user?.user_name[0].toUpperCase()
    : "G";
  // Validation schema
  const validationSchema = Yup.object({
    user_name: Yup.string().required(t("please enter your name")),
    bio: Yup.string().required(t("please enter your bio")),
  });

  const handleFileChangeWrapper = (event, setFieldValue) => {
    handleFileChange(event, setFieldValue); // Delegate to the parent handler
  };

  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    if (user?.user_name) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: [user.user_name], // Use dynamic name from API
        typeSpeed: 130, // Typing speed
        backSpeed: 50, // Deleting speed
        backDelay: 2000, // Pause before deleting
        startDelay: 500, // Delay before start
        loop: true, // Loop animation
        cursorChar: "|", // Custom cursor character
        onStringTyped: () => {
          // Dynamically change cursor color after typing starts
          const cursor = document.querySelector(".typed-cursor");
          if (cursor) {
            cursor.style.color = "#fba518";
          }
        },
      });
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy(); // Cleanup on unmount
      }
    };
  }, [user?.user_name]);

  return (
    <Formik
      initialValues={{
        user_name: user?.user_name || "",
        bio: user?.bio || "",
        profile: user?.profile || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleUpdateProfile}
      enableReinitialize={true}
    >
      {({ setFieldValue, isSubmitting, values }) => (
        <Form
          className="p-4 sm:ml-64 mt-[60px] max-w-screen-xl"
          data-aos="fade-down"
        >
          <div className="flex flex-col items-center mb-8 mt-12">
            <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                {isLoading ? (
                  <Skeleton circle={true} height={160} width={160} />
                ) : profilePreview ? (
                  <img
                    className="w-full h-full object-cover"
                    src={profilePreview} // Display uploaded image
                    alt="user profile"
                  />
                ) : user?.profile ? ( // <-- Fixed the condition here
                  <img
                    className="ww-full h-full rounded-full"
                    src={user?.profile}
                    alt="user photo"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-7xl">
                    {profileFallback}
                  </div>
                )}
              </div>

              <input
                type="file"
                name="profile"
                id="file"
                className="hidden"
                onChange={(event) =>
                  handleFileChangeWrapper(event, setFieldValue)
                }
              />
              <label
                htmlFor="file"
                className="absolute bottom-2 right-2 cursor-pointer bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
              >
                <IoCamera className="text-xl text-gray-700" />
              </label>
            </div>

            <div className="text-center mt-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                {isLoading ? (
                  <Skeleton width={200} />
                ) : (
                  <>
                    {t("welcome to")}{" "}
                    <span ref={typedRef} className="text-secondary-500"></span>
                  </>
                )}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {isLoading ? (
                  <Skeleton width={150} />
                ) : (
                  t("please update your information")
                )}
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                {t("name")}
              </label>
              {isLoading ? (
                <Skeleton height={40} width="100%" />
              ) : (
                <Field
                  type="text"
                  name="user_name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-secondary-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t("please enter your name")}
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                {t("bio")}
              </label>
              {isLoading ? (
                <Skeleton height={120} width="100%" />
              ) : (
                <Field
                  as="textarea"
                  name="bio"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-secondary-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t("please enter your bio")}
                  rows="4"
                />
              )}
            </div>

            <div className="flex justify-end">
              {isLoading ? (
                <Skeleton height={50} width={150} />
              ) : (
                <button
                  type="submit"
                  className="bg-secondary-500 text-white font-bold py-3 px-8 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("saving...") : t("save")}
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
