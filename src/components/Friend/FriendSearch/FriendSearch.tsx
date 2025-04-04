import styles from "./FriendSearch.module.css";
import searchIcon from "../../../assets/icon/search.svg";
import React, { useRef } from "react";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";

interface FriendSearchProps {
  searchTarget: string;
  searchState: string;
  setSearchTarget: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const FriendSearch: React.FC<FriendSearchProps> = ({
  searchTarget,
  searchState,
  setSearchTarget,
  onFocus,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchTarget(searchName);
  };
  const deleteText = () => {
    setSearchTarget("");
    inputRef.current?.focus(); // 삭제 버튼 시 강제로 input에 포커스 되도록
  };
  return (
    <>
      {searchState === "list" && (
        <div className={styles.SearchBarContainer}>
          <div className={styles.SearchWrapper}>
            <img
              className={styles.SearchIcon}
              src={searchIcon}
              alt="검색 아이콘"
            />
            <input
              className={styles.SearchBar}
              type="text"
              value={searchTarget}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요"
            />
          </div>
          {searchTarget && (
            <img
              className={styles.DeleteIcon}
              src={deleteIcon}
              alt="검색 삭제"
              onClick={deleteText}
            />
          )}
        </div>
      )}
      {searchState === "add" && (
        <div className={styles.SearchBarContainer}>
          <div className={styles.SearchWrapper}>
            <img
              className={styles.SearchIcon}
              src={searchIcon}
              alt="검색 아이콘"
            />
            <input
              ref={inputRef}
              className={styles.SearchBar}
              type="text"
              value={searchTarget}
              onChange={handleChange}
              placeholder="닉네임 또는 학번을 입력해주세요"
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          {searchTarget && (
            <img
              className={styles.DeleteIcon}
              src={deleteIcon}
              alt="검색 삭제"
              onClick={deleteText}
              onMouseDown={(e) => e.preventDefault()}
            />
          )}
        </div>
      )}
    </>
  );
};

export default FriendSearch;
