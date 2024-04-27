import { useEffect } from "react";
import { TaskSchema } from "../../Schemas";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { ITask } from "../../types";

const UpdateTask = ({
  task,
  handleUpdate,
}: {
  task: ITask;
  handleUpdate: (values: ITask) => void;
}) => {
  const { _id, title, isFlagged, isCompleted, dueDate, createdBy } = task;
  const initialValues = {
    _id: _id,
    title: title,
    isFlagged: isFlagged,
    isCompleted: isCompleted,
    dueDate: getDate(dueDate),
    createdBy: createdBy,
  };

  function getDate(value: string) {
    const date = new Date(value);
    const task_date =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const task_month =
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();

    const task_year = date.getFullYear();

    const result = `${task_year}-${task_month}-${task_date}`;
    console.log(result);
    return result;
  }

  const handleSubmit = (
    values: ITask,
    { setSubmitting }: FormikHelpers<ITask>
  ) => {
    setSubmitting(true);

    console.log(JSON.stringify(values, null, 2));
    handleUpdate(values);

    setSubmitting(false);
  };

  useEffect(() => {
    console.log("useEffect: ", _id);
  }, [_id]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto w-[90%] py-3 px-2 text-primary flex flex-col items-center justify-center shadow-md rounded-md shadow-neutral">
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
          <label
            className="label cursor-pointer w-[50%] mr-auto max-w-xs flex"
            htmlFor="isFlagged"
          >
            <span className="label-text">Is Completed?</span>
            <Field
              type="checkbox"
              name="isCompleted"
              id="isCompleted"
              className="checkbox checkbox-primary"
            />
          </label>
          <ErrorMessage
            component="span"
            name="isCompleted"
            className="mt-2 w-full max-w-xs text-xs text-red-500"
          />
          <Field
            type="text"
            name="createdBy"
            id="createdBy"
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
export default UpdateTask;
