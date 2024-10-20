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
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      "please at least one special chareter"
    )
    .required("Please enter your password"),
});
