import type React from "react";
import styles from "./SearchTag.module.css";
import closeIcon from "../../../../assets/icon/notice/search/remove.svg";

interface SearchTagProps {
  text: string;
  onRemove: () => void;
}

const SearchTag: React.FC<SearchTagProps> = ({ text, onRemove }) => {
  return (
    <div className={styles.searchTag}>
      <span className={styles.tagText}>{text}</span>
      <button
        type="button"
        className={styles.closeIcon}
        onClick={onRemove}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
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
