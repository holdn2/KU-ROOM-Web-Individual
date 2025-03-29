import styles from "./KeywordButton.module.css";
import deleteIcon from "../../assets/icon/deleteKeyword.svg";
import React from "react";

interface KeywordButtonProps {
  keyword: string;
  handleDelete: () => void;
}

const KeywordButton: React.FC<KeywordButtonProps> = ({
  keyword,
  handleDelete,
}) => {
  return (
    <div className={styles.KeywordWrapper}>
      <span className={styles.KeywordText}>{keyword}</span>
      <img
        className={styles.DeleteIcon}
        src={deleteIcon}
        alt="삭제"
        onClick={handleDelete}
      />
    </div>
  );
};

export default KeywordButton;
