interface ToastProps {
  status: string;
}

const Toast = ({ status }: ToastProps) => {
  return (
    <div className="toast toast-top toast-center">
      <div
        className={`alert ${
          status === "success" ? "alert-success" : "alert-error"
        }`}
      >
        <span className="text-xs">
          {status === "success" ? "Success!" : "Oops! Something went wrong."}
        </span>
      </div>
    </div>
  );
};
export default Toast;
