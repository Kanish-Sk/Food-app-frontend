import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  return <ToastContainer position="top-center" autoClose={1500} />;
};

export default ToastNotification;
