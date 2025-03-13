import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../redux/features/user/authSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserVerifyMutation } from "../../redux/features/user/userSlice"; // Import the verify mutation
import SignOut from "../../page/user/SignOut";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false); // Controls SignOut modal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation("userProfile");
  const theme = useSelector((state) => state.theme.theme);

  // Retrieve the access token from secure local storage
  const accessToken = localStorage.getItem("access_token");

  // Using RTK query hook to call the verify mutation
  const [verify, { data, error: verifyError, isLoading }] =
    useUserVerifyMutation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!accessToken) return;

      try {
        const response = await verify({ token: accessToken }).unwrap();
        if (response?.payload) {
          setUserData(response.payload); // Set the data to state
          dispatch(updateUser(response.payload)); // Dispatch to Redux
        } else {
          setError("Failed to load user data.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken, verify, dispatch]);

  // Show SignOut Modal
  const handleShowSignOut = () => {
    setShowSignOutModal(true);
    setIsOpen(false); // Close dropdown when opening modal
  };

  // Close SignOut Modal
  const closeSignOutModal = () => {
    setShowSignOutModal(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the first character of the username or default to "G" for Guest
  const profileFallback = userData?.user_name
    ? userData.user_name[0].toUpperCase()
    : "G";

  return (
    <>
      <div className="relative flex flex-col items-center" ref={dropdownRef}>
        <button
          type="button"
          className="flex text-sm rounded-full focus:ring-2 focus:ring-secondary-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open user menu</span>
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          ) : userData ? (
            userData.profile ? (
              <img
                className="w-10 h-10 rounded-full"
                src={userData.profile}
                alt="user photo"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
                {profileFallback}
              </div>
            )
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-14 w-52 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-50">
            <div className="px-4 py-3">
              {isLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : error || verifyError ? (
                <p className="text-sm text-red-500">{error || verifyError}</p>
              ) : (
                <>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    {userData?.user_name || "Guest User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-300">
                    {userData?.email || "guest@example.com"}
                  </p>
                </>
              )}
            </div>
            <ul>
              <li>
                <Link
                  to="/userprofile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 dark:hover:bg-primary-950 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {t("dashboard")}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleShowSignOut} // Show modal instead of direct logout
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 dark:hover:bg-primary-950 dark:text-gray-300 dark:hover:text-white"
                >
                  {t("sign out")}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* SignOut Modal */}
      {showSignOutModal && <SignOut closeModal={closeSignOutModal} />}
    </>
  );
};

export default Profile;
