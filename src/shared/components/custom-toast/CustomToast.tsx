import ToastInfoIcon from "@assets/icon/toast/info.svg";
import ToastErrorIcon from "@assets/icon/toast/error.svg";

import styles from "./CustomToast.module.css";

interface CustomToastProps {
  message: string;
  isError?: boolean;
}

const CustomToast = ({ message, isError = false }: CustomToastProps) => {
  return (
    <div className={styles.ToastContainer}>
      <img src={isError ? ToastErrorIcon : ToastInfoIcon} alt="toast icon" />
      <span>{message}</span>
    </div>
  );
};

export default CustomToast;
