import * as Yup from "yup";

export const SignInFormValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
});
