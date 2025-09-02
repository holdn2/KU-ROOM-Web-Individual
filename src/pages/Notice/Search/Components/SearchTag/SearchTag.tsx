import type React from "react";

import closeIcon from "@assets/icon/notice/search/remove.svg";

import styles from "./SearchTag.module.css";

interface SearchTagProps {
  text: string;
  onRemove: () => void;
}

const SearchTag: React.FC<SearchTagProps> = ({ text, onRemove }) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className={styles.searchTag}>
      <span className={styles.tagText}>{text}</span>
      <button
        type="button"
        className={styles.closeIcon}
        onClick={handleRemoveClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onRemove();
          }
        }}
        aria-label="삭제"
      >
        <img src={closeIcon} alt="" />
      </button>
    </div>
  );
};

export default SearchTag;
