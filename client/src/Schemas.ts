import * as Yup from "yup";
export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Too Short")
    .max(50, "Too Long")
    .required("Username is required"),

  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must have at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
