import { ChangeEvent, useState } from "react";

import SendIcon from "@assets/icon/send.svg";
import ChatIcon from "@assets/icon/chat.svg";
import DisabledSendIcon from "@assets/icon/send_disabled.svg";
import Header from "@components/Header/Header";

import styles from "./ChatbotMain.module.css";
import { mockRecommendation } from "./constant/mock-recommendation";

const ChatbotMain = () => {
  const [inputText, setInputText] = useState("");

  const handleChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    console.log(inputText);
  };

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
          <div className={styles.InputContainer}>
            <input
              className={styles.InputTextArea}
              type="text"
              value={inputText}
              onChange={(e) => handleChangeInputText(e)}
              placeholder="무엇이든 물어보세요"
            />
            <button
              className={styles.SendIcon}
              onClick={handleSendMessage}
              disabled={!inputText}
            >
              <img src={inputText ? SendIcon : DisabledSendIcon} alt="보내기" />
            </button>
          </div>
        </div>
        <div className={styles.RecommendationSection}>
          {mockRecommendation.map((item) => (
            <button key={item.id} className={styles.RecommendationContainer}>
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
