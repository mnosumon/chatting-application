import * as Yup from "yup";

export const SignUpFormValidation = Yup.object({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
});
