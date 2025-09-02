import searchIcon from "@assets/icon/search.svg";

import styles from "./MapSearchBar.module.css";

const MapSearchBar = () => {
  return (
    <div className={styles.SearchBarContainer}>
      <div className={styles.SearchWrapper}>
        <img className={styles.SearchIcon} src={searchIcon} alt="검색 아이콘" />
        <span className={styles.SearchBar}>
          건물명, 강의실명, 건물 번호 검색
        </span>
      </div>
    </div>
  );
};

export default MapSearchBar;
