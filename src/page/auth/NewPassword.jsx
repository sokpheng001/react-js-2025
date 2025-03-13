import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { FaLock } from "react-icons/fa";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import resetpasswordimg from "../../../public/svg/resetpassword.svg";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";
import { useResetPasswordMutation } from "../../redux/features/user/userSlice";
import { toast } from "react-toastify";

export default function NewPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation("login" || "register");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const email = location?.state?.email; // Make sure email is passed in location state
  const [loading, setLoading] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

 const handleSubmit = async (values) => {
  try {
    // Ensure correct request format
    const payload = {
      email: email, // Ensure email is included
      new_password: values.newPassword, // Match server field names
      confirm_password: values.confirmPassword,
    };

    console.log("Sending payload:", payload); // Debugging

    // Attempt to reset the password
    await resetPassword(payload).unwrap();

    toast.success(t("Password reset successfully!"));
    navigate("/login");
  } catch (error) {
    console.error("Error details:", error);

    // Extract validation errors from the API response
    if (error.status === 422 && error.data?.detail) {
      const errorMessages = error.data.detail.map((err) => err.msg).join(", ");
      toast.error(t(`Validation failed: ${errorMessages}`));
    } else {
      toast.error(t("Failed to reset password. Please try again."));
    }
  }
};



  const handleGoBack = () => {
    navigate("/");
  };

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .matches(
        strongPasswordRegex,
        t(
          "password must contain one uppercase letter, one lowercase letter, one special character, a number, and be at least 8 characters long."
        )
      )
      .required(t("Password is required")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        t("Confirm Password needs to be the same as Password!")
      )
      .required(t("Confirm Password is required")),
  });

  return (
    <AuthLayout
      theme={theme}
      logoLightMode={logolightmode}
      logoDarkMode={logodarkmode}
      onGoBack={handleGoBack}
      imageSrc={resetpasswordimg} // Custom image for reset password
      blobPosition="right-[-38%] top-0 md:top-[3%] md:right-[-30%] lg:right-[-45%] lg:top-[1%]"
      ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]"
      ellipse2Position="top-[80%] right-[-10%] lg:top-[80%] md:-right-[-12%] md:top-[85%] lg:right-[9%]"
    >
      <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        {t("Reset Password")}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // Directly pass handleSubmit for cleaner code
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Password Input */}
            <InputField
              label={t("New Password")}
              name="newPassword"
              type="password"
              placeholder={t("Enter your new password")}
              icon={FaLock}
            />
            {/* Confirm Password Input */}
            <InputField
              label={t("Confirm Password")}
              name="confirmPassword"
              type="password"
              placeholder={t("Enter your confirm password")}
              icon={FaLock}
            />

            {/* Submit Button */}
            <SubmitButton
              isSubmitting={isSubmitting}
              loading={loading || isLoading}
              label={t("Reset Password")}
              loadingLabel={t("Resetting...")}
              disabled={false}
            />
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
