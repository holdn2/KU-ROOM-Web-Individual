import styles from "./FriendSearch.module.css";
import searchIcon from "../../../assets/icon/search.svg";
import React from "react";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";

interface FriendSearchProps {
  searchTarget: string;
  searchState: string;
  setSearchTarget: (value: string) => void;
}

const FriendSearch: React.FC<FriendSearchProps> = ({
  searchTarget,
  searchState,
  setSearchTarget,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchTarget(searchName);
  };
  const deleteText = () => {
    setSearchTarget("");
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
              className={styles.SearchBar}
              type="text"
              value={searchTarget}
              onChange={handleChange}
              placeholder="닉네임 또는 학번을 입력해주세요"
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
    </>
  );
};

export default FriendSearch;
