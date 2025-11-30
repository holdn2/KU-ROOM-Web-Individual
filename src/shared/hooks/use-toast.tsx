import { toast, ToastOptions } from "react-toastify";
import CustomToast from "../components/custom-toast/CustomToast";

const useToast = () => {
  const toastOptions: ToastOptions = {
    position: "bottom-center",
    icon: false,
    closeButton: false,
    autoClose: 2000,
    hideProgressBar: true,
    style: {
      background: "transparent",
      boxShadow: "none",
      padding: 0,
      display: "flex",
      justifyContent: "center",
      marginBottom: "90px",
    },
  };

  return {
    info: (message: string) =>
      toast.info(<CustomToast message={message} />, toastOptions),
    error: (message: string) =>
      toast.error(
        <CustomToast message={message} isError={true} />,
        toastOptions
      ),
  };
};

export default useToast;
