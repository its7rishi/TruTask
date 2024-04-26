import { useModal } from "react-modal-hook";

const ReactModal = () => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      <p>Modal Content</p>
      <button onClick={hideModal}>close</button>
    </ReactModal>
  ));
  return <div>ReactModal</div>;
};
export default ReactModal;
