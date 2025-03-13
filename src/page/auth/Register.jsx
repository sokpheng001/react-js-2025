import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupimg from "../../../public/svg/signup.svg";
import { NavLink } from "react-router";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";
import { useRegisterUserMutation } from "../../redux/features/user/userSlice";

export default function Register() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { t } = useTranslation("register");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    privacyPolicy: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t("username is required")),
    email: Yup.string()
      .email(t("invalid email format"))
      .required(t("email is required")),
    password: Yup.string()
      .matches(
        strongPasswordRegex,
        t(
          "password must contain one uppercase letter, one lowercase letter, one special character, a number, and be at least 8 characters long."
        )
      )
      .required(t("password is required")),
    confirm_password: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("confirm Password need to be the same as Password!")
      )
      .required(t("Confirm Password is required")),
    privacyPolicy: Yup.boolean().oneOf(
      [true],
      t("You must accept the privacy policy")
    ),
  });

  const handleSubmit = async (values) => {
    console.log("Payload:", values); // Log the payload for debugging
    try {
      await registerUser(values).unwrap();
      toast.success(t("Sign up Successfully!"));
      navigate("/login");
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
      if (error.data && error.data.detail) {
        toast.error(error.data.detail); // Show specific error message from the server
      } else {
        toast.error(t("Sign up failed. Please try again.")); // Fallback error message
      }
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthLayout
        theme={theme}
        logoLightMode={logolightmode}
        logoDarkMode={logodarkmode}
        onGoBack={handleGoBack}
        imageSrc={signupimg}
        blobPosition="right-[-38%] top-0 md:top-[3%] md:right-[-30%] lg:right-[-45%] lg:top-[1%]"
        ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]"
        ellipse2Position="top-[54%] right-[-10%] lg:right-[2%] lg:top-[90%] md:-right-[-15%] md:top-[58%] xl:right-[9%]"
      >
        <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {t("register")}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Username Input */}
              <InputField
                label={t("username")}
                name="username"
                type="text"
                placeholder={t("enter your username")}
                icon={FaUser}
              />

              {/* Email Input */}
              <InputField
                label={t("email")}
                name="email"
                type="email"
                placeholder={t("enter your email")}
                icon={FaUser}
              />

              {/* Password Input */}
              <InputField
                label={t("password")}
                name="password"
                type="password"
                placeholder={t("enter your password")}
                icon={FaLock}
              />

              {/* Confirm Password Input */}
              <InputField
                label={t("confirm password")}
                name="confirm_password"
                type="password"
                placeholder={t("enter your confirm password")}
                icon={FaLock}
              />

              {/* Privacy Policy Checkbox */}
              <div className="text-right">
                <div className="flex items-center mb-4 text-gray-600 dark:text-gray-400">
                  <Field
                    id="privacyPolicy"
                    className="mr-2 cursor-pointer"
                    type="checkbox"
                    name="privacyPolicy"
                  />
                  <label htmlFor="privacyPolicy" className="text-[14px]">
                    {t("I agree to the")}
                    <span className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline">
                      {t("privacy policy")}
                    </span>
                  </label>
                </div>
              </div>

              {/* Sign up Button */}
              <SubmitButton
                isSubmitting={isSubmitting || isLoading}
                label={t("sign up")}
                loadingLabel={t("sign up...")}
                disabled={isSubmitting || isLoading}
              />

              {/* Google Login Button */}
              <GoogleLoginButton
        
              />

              {/* Login Link */}
              <div className="text-center mt-6">
                <span className="text-gray-600 dark:text-gray-400">
                  {t("already have an account?")}{" "}
                </span>
                <NavLink
                  to="/login"
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
                >
                  {t("login")}
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </GoogleOAuthProvider>
  );
}
