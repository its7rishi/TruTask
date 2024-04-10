import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { SignUpSchema } from "../../Schemas";
import axios from "axios";
SignUpSchema;

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const intialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/create-user",
        values
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col justify-start items-center mt-12 w-screen h-screen">
      <Formik
        initialValues={intialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto w-[90%] sm:w-[50%] md:w-[30%] py-3 px-2 text-primary flex flex-col items-center justify-center shadow-md rounded-md shadow-neutral">
          <h2 className="font-semibold tracking-widest text-lg md:text-xl underline underline-offset-4 mb-4">
            Sign Up
          </h2>
          <label
            className="form-control w-full max-w-xs flex flex-col gap-2"
            htmlFor="username"
          >
            <div className="label">
              <span className="label-text">Enter a username?</span>
            </div>
            <Field
              type="text"
              placeholder="Type here"
              name="username"
              id="username"
              className="input input-bordered input-primary w-full max-w-xs placeholder:text-xs sm:text-sm"
            />
          </label>
          <ErrorMessage
            component="span"
            name="username"
            className="mt-2 w-full max-w-xs text-xs text-red-500"
          />
          <label className="form-control w-full max-w-xs" htmlFor="email">
            <div className="label">
              <span className="label-text">Enter your email?</span>
            </div>
            <Field
              type="email"
              placeholder="Type here"
              name="email"
              id="email"
              className="input input-bordered input-primary w-full max-w-xs placeholder:text-xs sm:text-sm"
            />
          </label>
          <ErrorMessage
            component="span"
            name="email"
            className="mt-2 w-full max-w-xs text-xs text-red-500"
          />
          <label className="form-control w-full max-w-xs" htmlFor="password">
            <div className="label">
              <span className="label-text">Enter your password?</span>
            </div>
            <Field
              type="password"
              placeholder="Type here"
              name="password"
              id="password"
              className="input input-bordered input-primary w-full max-w-xs placeholder:text-xs sm:text-sm"
            />
          </label>
          <ErrorMessage
            component="span"
            name="password"
            className="mt-2 w-full max-w-xs text-xs text-red-500"
          />
          <label
            className="form-control w-full max-w-xs"
            htmlFor="confirmPassword"
          >
            <div className="label">
              <span className="label-text">Confirm your password?</span>
            </div>
            <Field
              type="password"
              placeholder="Type here"
              name="confirmPassword"
              id="confirmPassword"
              className="input input-bordered input-primary w-full max-w-xs placeholder:text-xs sm:text-sm"
            />
          </label>
          <ErrorMessage
            component="span"
            name="confirmPassword"
            className="mt-2 w-full max-w-xs text-xs text-red-500"
          />
          <button
            type="submit"
            className="btn btn-primary w-full max-w-xs mt-5"
          >
            Sign Up
          </button>

          <p className="mt-6 w-full max-w-xs text-left text-xs text-primary tracking-wider">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline underline-offset-4 tracking-widest"
            >
              Login
            </Link>{" "}
            here.
          </p>
        </Form>
      </Formik>
    </div>
  );
};
export default Signup;
