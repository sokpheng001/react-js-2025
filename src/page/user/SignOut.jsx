import React from "react";
import { IoIosLogOut } from "react-icons/io"; // Logout icon
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { useTranslation } from "react-i18next";
import { logout } from "../../redux/features/user/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignOut = ({ closeModal }) => {
  const navigate = useNavigate(); // Get navigate function
  const dispatch = useDispatch(); // Get dispatch function
  const { t } = useTranslation("userProfile");

  // Handle the logout process
  const handleLogout = () => {
    // Show toast notification before logging out
    toast.success(t("Successfully signed out. Redirecting..."), {
      position: "top-right",
      autoClose: 2000, // 2 seconds before redirecting
    });

    // Clear user authentication state (e.g., removing tokens, user data)
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken"); // or wherever your auth token is stored

    // Dispatch logout action and navigate to login after a delay
    setTimeout(() => {
      dispatch(logout());
      navigate("/login"); // Redirect to login page
    }, 1500);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-60 z-[1000]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <IoIosLogOut className="text-5xl text-primary-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
          {t("are you sure you want to sign out?")}
        </h2>
        <p className="text-text-des-light-mode text-center mb-4">
          {t("you will be logged out and redirected to the login page.")}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition duration-300"
          >
            {t("yes, Sign out")}
          </button>
          <button
            onClick={closeModal} // Close the modal without signing out
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            {t("no, Go back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
