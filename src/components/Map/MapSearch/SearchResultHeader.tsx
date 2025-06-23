import React from "react";
import styles from "./SearchResultHeader.module.css";
import arrowBack from "../../../assets/nav/arrowback.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";
import { MapSearchResult } from "../../../../types/mapTypes";

interface SearchResultProps {
  mapSearchResult?: MapSearchResult;
  selectedCategoryTitle?: string;
  resetSelectSearch: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  mapSearchResult,
  selectedCategoryTitle,
  resetSelectSearch,
}) => {
  console.log("헤더 : ", selectedCategoryTitle || mapSearchResult?.mainTitle);
  return (
    <header className={styles.SearchResultContainer}>
      <div className={styles.LeftContentWrapper}>
        <img
          className={styles.ArrowIcon}
          src={arrowBack}
          alt="뒤로 가기"
          onClick={() => {
            resetSelectSearch();
          }}
        />
        {mapSearchResult ? (
          <span className={styles.ResultTitle}>
            {mapSearchResult.mainTitle}
          </span>
        ) : (
          <span className={styles.ResultTitle}>{selectedCategoryTitle}</span>
        )}
      </div>
      <img
        className={styles.DeleteIcon}
        src={deleteIcon}
        alt="검색어 지우기"
        onClick={resetSelectSearch}
      />
    </header>
  );
};

export default SearchResult;
