import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChatIcon from "@assets/icon/chat.svg";
import Header from "@components/Header/Header";

import { mockRecommendation } from "../constant/mock-recommendation";
import ChatInput from "../components/ChatInput/ChatInput";
import styles from "./ChatbotMain.module.css";

const ChatbotMain = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");

  const handleChangeInputText = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(e.target.value);
    },
    []
  );

  const handleSendQuestion = useCallback(() => {
    const trimmedText = inputText.trim();
    if (!trimmedText) {
      setInputText("");
      return;
    }
    setInputText("");
    navigate("/chat", { state: { question: trimmedText } });
  }, [inputText, navigate]);

  const handleClickRecommendation = useCallback(
    (question: string) => {
      navigate("/chat", { state: { question } });
    },
    [navigate]
  );

  return (
    <div>
      <Header>챗봇</Header>
      <div className={styles.ChatbotMainWrapper}>
        <div className={styles.SearchSection}>
          <span className={styles.ChatbotDescription}>
            건국대학교 공지사항을
            <br />
            <span className={styles.DescriptionHighlight}>AI 챗봇</span>
            으로 쉽게 확인해보세요!
          </span>
          <ChatInput
            inputText={inputText}
            placeholder="무엇이든 물어보세요"
            handleChangeInputText={handleChangeInputText}
            handleSendQuestion={handleSendQuestion}
          />
        </div>
        <div className={styles.RecommendationSection}>
          {mockRecommendation.map((item) => (
            <button
              key={item.id}
              className={styles.RecommendationContainer}
              onClick={() => handleClickRecommendation(item.question)}
            >
              <img src={ChatIcon} />
              <div className={styles.RecommendationText}>
                <span className={styles.QuestionDesc}>{item.description}</span>
                <span className={styles.RecommendationQuestion}>
                  {item.question}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotMain;
