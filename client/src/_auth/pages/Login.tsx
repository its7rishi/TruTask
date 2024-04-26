import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { LoginSchema } from "../../Schemas";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);
    try {
      await axios
        .post("http://localhost:5000/api/v1/users/login", values)
        .then((res) => {
          console.log(res.data);
          setUser({
            id: res.data.data._id,
            username: res.data.data.username,
            email: res.data.data.email,
            token: res.data.token,
          });

          setAuthenticated(true);
          setSubmitting(false);
        })
        .catch((err) => console.log(err.response.data.message))

        .finally(() => {
          navigate("/");
        });
    } catch (error) {
      let message = "Unknown error";
      if (error instanceof Error) message = error.message;
      reportError({ message });
    }
  };

  return (
    <div className="flex flex-col justify-start items-center mt-12 w-screen h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto w-[90%] sm:w-[50%] md:w-[30%] py-3 px-2 text-primary flex flex-col items-center justify-center shadow-md rounded-md shadow-neutral">
          <h2 className="font-semibold tracking-widest text-lg md:text-xl underline underline-offset-4 mb-4">
            Login
          </h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Enter your username?</span>
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
          <label className="form-control w-full max-w-xs">
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
          <button
            type="submit"
            className="btn btn-primary w-full max-w-xs mt-5"
          >
            Login
          </button>

          <p className="mt-6 w-full max-w-xs text-left text-xs text-primary tracking-wider">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold underline underline-offset-4 tracking-widest"
            >
              Sign Up
            </Link>{" "}
            here.
          </p>
        </Form>
      </Formik>
    </div>
  );
};
export default Login;
