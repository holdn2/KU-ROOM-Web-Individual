import React from "react";
import styles from "./SearchResultHeader.module.css";
import arrowBack from "../../../assets/nav/arrowback.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";
import { MapSearchResult, MarkerData } from "../../../../types/mapTypes";

interface SearchResultProps {
  mapSearchResult: MapSearchResult;
  setSearchMode: (value: boolean) => void;
  setMapSearchResult: (value: MapSearchResult | null) => void;
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
            setMapSearchResult(null);
            setMarkers([]);
            setIsExpandedSheet(false);
            setHasFocusedMarker(false);
            setIsExpandedFocusedSheet(false);
          }}
        />
        <span className={styles.ResultTitle}>{mapSearchResult.mainTitle}</span>
      </div>
      <img
        className={styles.DeleteIcon}
        src={deleteIcon}
        alt="검색어 지우기"
        onClick={() => {
          setMapSearchResult(null);
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
