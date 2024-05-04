import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { LoginSchema } from "../../Schemas";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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

    await axios
      .post("http://localhost:5000/api/v1/users/login", values)

      .then((response) => {
        console.log(response.data);
        setUser({
          id: response.data.data._id,
          username: response.data.data.username,
          email: response.data.data.email,
          token: response.data.token,
        });

        setAuthenticated(true);
        setSubmitting(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err.response.data.message);
      })
      .finally(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    console.log("isError: ", isError);
  }, [isError]);

  return (
    <div className="flex flex-col justify-start items-center mt-12 w-screen h-screen">
      {isError && (
        <div
          role="alert"
          className="alert alert-error w-[70%] md:w-[30%] text-white flex z-10 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs tracking-tighter">
            Invalid username or password
          </span>
        </div>
      )}
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
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                placeholder="Type here"
                name="password"
                id="password"
                className="input input-bordered input-primary w-full max-w-xs placeholder:text-xs sm:text-sm"
              />
              <span
                className="absolute top-4 right-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <div
                    className="tooltip tooltip-secondary text-xs tracking-tighter"
                    data-tip="Hide Password"
                  >
                    <BiHide />
                  </div>
                ) : (
                  <div
                    className="tooltip tooltip-secondary text-xs tracking-tighter"
                    data-tip="Show Password"
                  >
                    <BiShow />
                  </div>
                )}
              </span>
            </div>
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
