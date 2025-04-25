import React from "react";
import styles from "./SearchResultHeader.module.css";
import arrowBack from "../../../assets/nav/arrowback.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
  icon: string;
}

interface SearchResultProps {
  mapSearchResult: string;
  setSearchMode: (value: boolean) => void;
  setMapSearchResult: (value: string) => void;
  setMarkers: (value: MarkerData[]) => void;
  setIsExpandedSheet: (value: boolean) => void;
  setHasFocusedMarker: (value: boolean) => void;
  setIsExpandedFocusedSheet: (value: boolean) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  mapSearchResult,
  setSearchMode,
  setMapSearchResult,
  setMarkers,
  setIsExpandedSheet,
  setHasFocusedMarker,
  setIsExpandedFocusedSheet,
}) => {
  return (
    <header className={styles.SearchResultContainer}>
      <div className={styles.LeftContentWrapper}>
        <img
          className={styles.ArrowIcon}
          src={arrowBack}
          alt="뒤로 가기"
          onClick={() => {
            setSearchMode(false);
            setMapSearchResult("");
            setMarkers([]);
            setIsExpandedSheet(false);
            setHasFocusedMarker(false);
            setIsExpandedFocusedSheet(false);
          }}
        />
        <span className={styles.ResultTitle}>{mapSearchResult}</span>
      </div>
      <img
        className={styles.DeleteIcon}
        src={deleteIcon}
        alt="검색어 지우기"
        onClick={() => {
          setMapSearchResult("");
          setSearchMode(true);
          setMarkers([]);
          setIsExpandedSheet(false);
          setHasFocusedMarker(false);
          setIsExpandedFocusedSheet(false);
        }}
      />
    </header>
  );
};

export default SearchResult;
