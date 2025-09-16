import React, { ChangeEvent } from "react";

import SendIcon from "@assets/icon/send.svg";
import DisabledSendIcon from "@assets/icon/send_disabled.svg";

import styles from "./ChatInput.module.css";

interface ChatInputProps {
  inputText: string;
  isAnswerLoading?: boolean;
  placeholder?: string;
  handleChangeInputText: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendQuestion: () => void;
}

const ChatInput = ({
  inputText,
  isAnswerLoading = false,
  placeholder = "",
  handleChangeInputText,
  handleSendQuestion,
}: ChatInputProps) => {
  const isDisabled = !inputText || isAnswerLoading;

  const handleEnterToSend = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isDisabled) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <div className={styles.InputContainer}>
      <textarea
        className={styles.InputTextArea}
        value={inputText}
        onChange={(e) => handleChangeInputText(e)}
        placeholder={placeholder}
        onKeyDown={handleEnterToSend}
        rows={1}
        disabled={isAnswerLoading}
      />
      <button
        className={styles.SendIcon}
        onClick={handleSendQuestion}
        disabled={isDisabled}
      >
        <img src={isDisabled ? DisabledSendIcon : SendIcon} alt="보내기" />
      </button>
    </div>
  );
};

export default ChatInput;
