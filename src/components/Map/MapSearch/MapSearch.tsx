import React, { useEffect, useState } from "react";
import styles from "./MapSearch.module.css";
import BottomBar from "../../BottomBar/BottomBar";
import arrowBack from "../../../assets/nav/arrowback.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";
import noResultIcon from "../../../assets/icon/noResultSearch.svg";

const dummyRecentSearchData = [
  "신공학관",
  "종강102",
  "레스티오",
  "제1학생회관",
  "상허기념도서관",
];
const dummyLocationData = [
  "신공학관",
  "종강102",
  "레스티오",
  "공학관",
  "편의점",
  "제1학생회관",
  "상허기념도서관",
];

interface MapSearchProps {
  setSearchMode: (value: boolean) => void;
  setSelectLocation: (Value: string) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({
  setSearchMode,
  setSelectLocation,
}) => {
  const [searchText, setSearchText] = useState("");
  const [recentSearchData, setRecentSearchData] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [trySearch, setTrySearch] = useState(false);

  useEffect(() => {
    setRecentSearchData(dummyRecentSearchData);
  }, []);

  useEffect(() => {
    setTrySearch(false);
  }, [searchText]);

  const deleteSearchText = () => {
    setSearchText("");
  };

  // 서버에 요청
  const deleteAllSearchData = () => {
    console.log("검색어 기록 전체 삭제");
  };
  const deleteSearchData = (searchData: string) => {
    console.log(searchData, " 검색 기록 삭제");
  };

  const handleSearch = () => {
    const trimmedText = searchText.trim();
    if (trimmedText.length === 0) return;
    const matchedResults = dummyLocationData.filter((location) =>
      location.includes(trimmedText)
    );
    setSearchResult(matchedResults);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTrySearch(true);
      handleSearch();
      // 검색 기록에 추가하는 요청 추가
    }
  };

  const toSearchLocation = (location: string) => {
    setSelectLocation(location);
    setSearchMode(false);
  };

  return (
    <div>
      <div className={styles.SearchBarContainer}>
        <div className={styles.LeftContentWrapper}>
          <img
            className={styles.ArrowIcon}
            src={arrowBack}
            alt="뒤로 가기"
            onClick={() => setSearchMode(false)}
          />
          <input
            className={styles.SearchText}
            type="search"
            enterKeyHint="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="건물명, 강의실명, 건물 번호 검색"
          />
        </div>
        {searchText && (
          <img
            className={styles.DeleteIcon}
            src={deleteIcon}
            alt="검색어 지우기"
            onClick={deleteSearchText}
          />
        )}
      </div>
      {!searchText && (
        <>
          <div className={styles.RecentSearchTitleWrapper}>
            <span className={styles.RecentSearchTitle}>최근 검색어</span>
            <button
              className={styles.RecentSearchDelete}
              onClick={deleteAllSearchData}
            >
              검색어 기록 전체 삭제
            </button>
          </div>
          <div className={styles.RecentSearchDataWrapper}>
            {recentSearchData.map((item, index) => (
              <div
                key={index}
                className={styles.RecentSearchContainer}
                onClick={() => toSearchLocation(item)}
              >
                <span className={styles.LocationTitle}>{item}</span>
                <img
                  src={deleteIcon}
                  alt="검색어 지우기"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSearchData(item);
                  }}
                  style={{ padding: "2px 5px" }}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {trySearch &&
        (searchResult.length !== 0 ? (
          <div className={styles.ResultWrapper}>
            {searchResult.map((result, index) => (
              <div
                key={index}
                className={styles.ResultContainer}
                onClick={() => toSearchLocation(result)}
              >
                <span className={styles.LocationTitle}>{result}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.NoResultContainer}>
            <img
              src={noResultIcon}
              alt="검색 결과 없음"
              style={{ width: "64px" }}
            />
            <span className={styles.NoResultText}>검색 결과가 없어요!</span>
          </div>
        ))}
      <BottomBar />
    </div>
  );
};

export default MapSearch;
