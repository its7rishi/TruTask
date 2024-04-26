import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { TaskSchema } from "../../Schemas";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaHome, FaChevronLeft } from "react-icons/fa";

interface CreateTaskProps {
  title: string;
  dueDate: Date;
  isFlagged: boolean;
  createdBy?: string;
}

const CreateTask = () => {
  const user = useContext(AuthContext);
  const userId = user.user.id || "abd123";

  const initialValues: CreateTaskProps = {
    title: "",
    dueDate: new Date(),
    isFlagged: false,
    createdBy: userId,
  };

  const handleSubmit = async (
    values: CreateTaskProps,
    { setSubmitting, resetForm }: FormikHelpers<CreateTaskProps>
  ) => {
    setSubmitting(true);

    console.log("values: ", JSON.stringify(values, null, 2));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/tasks/create-task",
        values
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="relative flex flex-col justify-start items-center mt-12 w-screen h-screen">
      <Link
        to="/"
        className="absolute left-2 top-0 text-secondary flex items-center justify-start text-xl"
      >
        <FaChevronLeft /> <FaHome />
      </Link>
      <Formik
        initialValues={initialValues}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto w-[90%] sm:w-[50%] md:w-[30%] py-3 px-2 text-primary flex flex-col items-center justify-center shadow-md rounded-md shadow-neutral">
          <h2 className="font-semibold tracking-widest text-lg md:text-xl underline underline-offset-4 mb-4">
            Create Task
          </h2>
          <label
            htmlFor="title"
            className="form-control w-full max-w-xs flex flex-col gap-2"
          >
            <div className="label">
              <div className="label-text">Title:</div>
            </div>
            <Field
              type="text"
              placeholder="Type here"
              name="title"
              id="title"
              className="input input-bordered input-primary w-full max-w-xs placeholder:text-xs sm:text-sm"
            />
          </label>
          <ErrorMessage
            component="span"
            name="title"
            className="mt-2 w-full max-w-xs text-xs text-red-500"
          />
          <label
            htmlFor="dueDate"
            className="form-control w-full max-w-xs flex flex-col gap-2"
          >
            <div className="label">
              <div className="label-text">Due Date:</div>
            </div>
            <Field
              type="date"
              name="dueDate"
              id="dueDate"
              className="input input-bordered input-primary w-full max-w-xs placeholder:text-xs sm:text-sm"
            />
          </label>
          <ErrorMessage
            component="span"
            name="dueDate"
            className="mt-2 w-full max-w-xs text-xs text-red-500"
          />
          <label
            className="label cursor-pointer w-[50%] mr-auto max-w-xs flex"
            htmlFor="isFlagged"
          >
            <span className="label-text">Is Priority?</span>
            <Field
              type="checkbox"
              name="isFlagged"
              id="isFlagged"
              className="checkbox checkbox-primary"
            />
          </label>
          <ErrorMessage
            component="span"
            name="isFlagged"
            className="mt-2 w-full max-w-xs text-xs text-red-500"
          />
          <Field
            type="text"
            name="createdBy"
            id="createdBy"
            value={userId}
            className="hidden"
            readOnly
          />
          <button
            type="submit"
            className="btn btn-primary w-full max-w-xs mt-5"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default CreateTask;
