import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgotpasswordimg from "../../../public/svg/forgotpassword.svg";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";
import {
  useVerifyEmailMutation,
  useResetPasswordMutation,
} from "../../redux/features/user/userSlice";

const ForgotPassword = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const { t } = useTranslation("login");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid email format"))
      .required(t("email is required")),
  });

const handleSubmit = async (values, { resetForm }) => {
  console.log("Value: ", values.email);
  try {
    // Ensure you're passing only the email string to the mutation
    await verifyEmail(values.email).unwrap(); // Pass just the email value
    toast.success(t("verification email sent!"));
    resetForm();
    navigate("/verifyotp", {
      state: { email: values.email, action: "reset-password" },
    });
  } catch (error) {
    console.error("Verification error:", error);
    toast.error(t("failed to verify email"));
  }
};



  return (
    <AuthLayout
      theme={theme}
      logoLightMode={logolightmode}
      logoDarkMode={logodarkmode}
      onGoBack={() => navigate("/")}
      imageSrc={forgotpasswordimg}
      blobPosition="right-[-38%] top-0 md:right-[-30%] lg:right-[-40%]"
      ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[40%]"
      ellipse2Position="top-[75%] right-[-10%] lg:top-[80%]"
    >
      <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        {t("forgot password")}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Email Input */}
            <InputField
              label={t("email")}
              name="email"
              type="email"
              placeholder={t("enter your email")}
              icon={FaUser}
            />

            {/* Send Button */}
            <SubmitButton
              isSubmitting={isSubmitting || isLoading}
              loading={isLoading}
              label={t("send")}
              loadingLabel={t("sending...")}
            />

            {/* Register Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600 dark:text-gray-400">
                {t("don't have an account?")}{" "}
              </span>
              <NavLink
                to="/register"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
              >
                {t("register")}
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;
