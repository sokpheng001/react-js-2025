import { useGoogleLogin as useGoogleOAuthLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation,useVerifyEmailMutation } from "../../redux/features/user/userSlice";

const GoogleLoginButton = () => {
  const { t } = useTranslation("register");
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
 const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
    toast.error(t("Google login failed. Please try again."));
  };

  const googleLogin = useGoogleOAuthLogin({
    onSuccess: async (res) => {
      if (res) {
        const accessToken = res.access_token;
        try {
          // Fetch Google user data
          const userData = await fetch(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
              },
            }
          ).then((data) => data.json());

          if (userData) {
            // Check if the email is verified by Google
            if (!userData.verified_email) {
              toast.error(t("Please verify your email with Google first."));
              return; // Don't proceed with registration if email is not verified
            }

            // Prepare user registration data
            const submitValues = {
              email: userData.email,
              username: userData.name,
              password: `${userData.given_name}${
                import.meta.env.VITE_SECRET_KEY
              }`,
              confirm_password: `${userData.given_name}${
                import.meta.env.VITE_SECRET_KEY
              }`,
              profile: userData.picture,
            };

            try {
              // Step 1: Register the User
              const registrationResponse = await registerUser(
                submitValues
              ).unwrap();

              // Step 2: Redirect to /verifyotp with email, password, and action
              await verifyEmail(userData.email).unwrap(); // Pass just the email value
              navigate("/verifyotp", {
                state: {
                  email: userData.email,
                  password: submitValues.password,
                  action: "google-signin", // Indicate this is for Google Sign-In
                },
              });

              toast.success(
                t("Registration successful! Please verify your OTP.")
              );
            } catch (error) {
              console.error("Error signing up with Google: ", error);
              toast.error(t("Sign up failed. Please try again."));
            }
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          toast.error(t("Failed to fetch Google user data."));
        }
      }
    },
    onError: handleGoogleLoginFailure,
  });

  return (
    <>
      <div className="relative items-center my-4">
        <div className="flex justify-center items-center my-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-400">
            {t("or")}
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => googleLogin()} // Trigger Google login on button click
        className="w-full flex items-center justify-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-heading-6 font-semibold text-gray-700 dark:text-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
      >
        <FcGoogle className="text-2xl" />
        <span className="text-gray-700 dark:text-white">
          {t("sign in with google")}
        </span>
      </button>
    </>
  );
};

export default GoogleLoginButton;
