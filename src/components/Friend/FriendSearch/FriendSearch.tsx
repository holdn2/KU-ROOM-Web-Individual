import styles from "./FriendSearch.module.css";
import searchIcon from "../../../assets/icon/search.svg";
import React from "react";

interface FriendSearchProps {
  searchNickname: string;
  searchState: string;
  setSearchNickname: (value: string) => void;
}

const FriendSearch: React.FC<FriendSearchProps> = ({
  searchNickname,
  searchState,
  setSearchNickname,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchNickname(searchName);
  };
  return (
    <>
      {searchState ? (
        <div className={styles.SearchBarContainer}>
          <img
            className={styles.SearchIcon}
            src={searchIcon}
            alt="검색 아이콘"
          />
          <input
            className={styles.SearchBar}
            type="text"
            value={searchNickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
      ) : (
        <div className={styles.SearchBarContainer}>
          <img
            className={styles.SearchIcon}
            src={searchIcon}
            alt="검색 아이콘"
          />
          <input
            className={styles.SearchBar}
            type="text"
            value={searchNickname}
            onChange={handleChange}
            placeholder="닉네임 또는 학번을 입력해주세요"
          />
        </div>
      )}
    </>
  );
};

export default FriendSearch;
