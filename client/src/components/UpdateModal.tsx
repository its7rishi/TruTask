import { useEffect, useState } from "react";
import { ITask } from "../types";

interface ModalProps {
  task: ITask;
}

const UpdateModal = ({ task }: ModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(true);

  const { _id, title, dueDate, isFlagged, isCompleted, createdBy } = task;

  useEffect(() => {
    if (openModal) {
      (document.getElementById("modal") as HTMLFormElement).showModal();
    } else {
      (document.getElementById("modal") as HTMLFormElement).close();
    }
  }, [openModal]);
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {_id} - {title}
        </h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => setOpenModal(false)}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default UpdateModal;
