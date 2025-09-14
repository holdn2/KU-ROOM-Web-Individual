import { useNavigate } from "react-router-dom";

import chatbot from "@assets/icon/chat-bot.svg";
import styles from "./ChatButton.module.css";

export const ChatButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={styles["chat-button"]}
      type="button"
      aria-label="챗봇 열기"
      onClick={()=>navigate("/chatbot-main")}
    >
      <img src={chatbot} alt="챗봇" />
    </button>
  );
};