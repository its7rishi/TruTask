import { useEffect, useState } from "react";
import { ITask } from "../types";

interface EditProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  task: ITask | undefined;
}

const EditTask = ({ task, showModal, setShowModal }: EditProps) => {
  useEffect(() => {
    if (!task) return;

    if (showModal) document.getElementById("edit-modal").showModal();
    // console.log(document.getElementById("edit-modal").showModal);
  }, [showModal, task]);

  return (
    <dialog id="edit-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">ID: {task?._id}</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn"
              id="close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default EditTask;
