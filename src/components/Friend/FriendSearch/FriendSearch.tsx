import styles from "./FriendSearch.module.css";
import searchIcon from "../../../assets/icon/search.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";
import React, { useRef } from "react";

interface FriendSearchProps {
  searchTarget: string;
  searchState: "list" | "add";
  setSearchTarget: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FriendSearch: React.FC<FriendSearchProps> = ({
  searchTarget,
  searchState,
  setSearchTarget,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTarget(e.target.value);
  };

  const deleteText = () => {
    setSearchTarget("");
    inputRef.current?.focus(); // 삭제 후 포커스 유지
  };

  const isAddMode = searchState === "add";
  const placeholder = isAddMode
    ? "닉네임 또는 학번을 입력해주세요"
    : "닉네임을 입력해주세요";

  return (
    <div className={styles.SearchBarContainer}>
      <div className={styles.SearchWrapper}>
        <img className={styles.SearchIcon} src={searchIcon} alt="검색 아이콘" />
        <input
          ref={isAddMode ? inputRef : undefined}
          className={styles.SearchBar}
          type="text"
          value={searchTarget}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </div>
      {searchTarget && (
        <img
          className={styles.DeleteIcon}
          src={deleteIcon}
          alt="검색 삭제"
          onClick={deleteText}
          onMouseDown={(e) => e.preventDefault()} // 포커스 유지
        />
      )}
    </div>
  );
};

export default FriendSearch;
