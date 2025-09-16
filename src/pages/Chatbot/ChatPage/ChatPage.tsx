import { ChangeEvent, useEffect, useRef, useState } from "react";

import Header from "@/shared/components/Header/Header";

import ChatInput from "../components/ChatInput/ChatInput";

import styles from "./ChatPage.module.css";
import { useLocation } from "react-router-dom";

interface ChatType {
  content: string;
  type: "question" | "answer";
}

const ChatPage = () => {
  const { question: firstQuestion } = useLocation().state;

  const [inputText, setInputText] = useState("");

  const [chatHistory, setChatHistory] = useState<ChatType[]>([
    { content: firstQuestion, type: "question" },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleChangeInputText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSendQuestion = () => {
    // TODO : 서버에 메시지 보내기
    const trimmedText = inputText.trim();

    if (!trimmedText) {
      setInputText("");
      return;
    }

    setChatHistory((prev) => [
      ...prev,
      { content: trimmedText, type: "question" },
    ]);

    setInputText("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div>
      <Header>챗봇</Header>
      <div className={styles.ChatArea}>
        <span className={styles.ChatCaution}>
          개발 진행중인 기능으로 오류가 발생할 수 있습니다.
        </span>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={styles.ChatContianer}
            style={
              chat.type === "answer"
                ? {
                    color: "black",
                    background: "white",
                    alignSelf: "flex-start",
                  }
                : {
                    alignSelf: "flex-end",
                  }
            }
          >
            {chat.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={styles.InputSection}>
        <ChatInput
          inputText={inputText}
          handleChangeInputText={handleChangeInputText}
          handleSendQuestion={handleSendQuestion}
        />
      </div>
    </div>
  );
};

export default ChatPage;
