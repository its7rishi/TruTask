import { ITask } from "../types";
import { FaCheck } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { FaRegFlag, FaFlag } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import UpdateTask from "../_root/pages/UpdateTask";

interface Props {
  task: ITask;
  handleDelete: (id: string) => void;
  handleUpdate: (value: ITask) => void;
}
function TaskItem({ task, handleDelete, handleUpdate }: Props) {
  const { _id, title, isFlagged, dueDate, isCompleted } = task;

  const [isTaskComplete, setIsTaskComplete] = useState<boolean>(isCompleted);
  const [isTaskFlagged, setIsTaskFlagged] = useState<boolean>(isFlagged);
  const [showModal, setShowModal] = useState<boolean>(false);

  const modalRef = useRef<HTMLDialogElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dueDate);

  const displayDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  async function handleComplete() {
    const value = { ...task, isCompleted: !isTaskComplete };
    setIsTaskComplete((prevState) => !prevState);
    handleUpdate(value);
  }

  // Flag Task

  async function handleFlag() {
    const value = { ...task, isFlagged: !isTaskFlagged };
    setIsTaskFlagged((prevState) => !prevState);
    handleUpdate(value);
  }

  // Edit Task
  const handleEdit = () => {
    console.log("Handle Edit", task);
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      // (document.getElementById("modal") as HTMLFormElement).showModal();
      modalRef.current?.showModal();
    }
  }, [showModal]);

  return (
    <li>
      <div className="card w-80 md:w-92 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-xs opacity-85">
            {" "}
            Due On: <span className="font-semibold">{displayDate}</span>
          </p>
          <div className="card-actions justify-end">
            <button
              className={`btn btn-circle shadow-md hover:animate-pulse text-xl ${
                isTaskComplete
                  ? "bg-green-800 text-green-300 border-green-950"
                  : ""
              }`}
              onClick={handleComplete}
            >
              <FaCheck />
            </button>
            <button
              className={`btn btn-circle shadow-md hover:animate-pulse text-xl ${
                isTaskFlagged ? "text-red-700 bg-pink-400 border-pink-700" : ""
              }`}
              onClick={handleFlag}
            >
              {isTaskFlagged ? <FaFlag /> : <FaRegFlag />}
            </button>
            <button
              className="btn btn-circle shadow-md hover:animate-pulse text-xl"
              onClick={handleEdit}
            >
              <RiEdit2Fill />
            </button>
            <button
              className="btn btn-circle shadow-md hover:animate-pulse text-red-700 text-xl"
              onClick={() => handleDelete(_id)}
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      </div>
      <dialog className="modal" id="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Update Task</h3>
          <UpdateTask task={task} handleUpdate={handleUpdate} />

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </li>
  );
}

export default TaskItem;
