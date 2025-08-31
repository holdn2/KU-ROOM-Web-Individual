import React, { useEffect, useState } from "react";

import {
  deleteAllRecentData,
  deleteRecentSearchLocation,
  getRecentSearchLocation,
  getSearchLocationResult,
} from "@apis/map";
import BottomBar from "@components/BottomBar/BottomBar";
import arrowBack from "@assets/nav/arrowback.svg";
import deleteIcon from "@assets/icon/deleteIcon.svg";
import noResultIcon from "@assets/icon/noResultSearch.svg";

import styles from "./MapSearch.module.css";
import { MapRecentSearchData, MapSearchResult } from "../../types/mapTypes";

// const dummyLocationData = ["레스티오", "1847", "신공학관"];
interface MapSearchProps {
  setSearchMode: (value: boolean) => void;
  clickSearchResultToMarker: (value: MapSearchResult) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({
  setSearchMode,
  clickSearchResultToMarker,
}) => {
  const [searchText, setSearchText] = useState("");
  const [recentSearchData, setRecentSearchData] = useState<
    MapRecentSearchData[]
  >([]);
  const [tryToSearch, setTryToSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<MapSearchResult[]>([]);

  const getRecentSearch = async () => {
    try {
      const response = await getRecentSearchLocation();
      console.log(response);
      setRecentSearchData(response);
    } catch (error) {
      console.error("최근 검색어 가져오기 실패 : ", error);
    }
  };

  useEffect(() => {
    // 서버에서 최근 검색어 가져오기
    getRecentSearch();
  }, []);

  const resetSearchText = () => {
    setSearchText("");
    setSearchResult([]);
    setTryToSearch(false);
    getRecentSearch();
  };

  const deleteAllSearchData = async () => {
    try {
      const response = await deleteAllRecentData();
      console.log(response);

      // 삭제 후 리렌더링
      await getRecentSearch();
    } catch (error) {
      console.error("최근 검색어 모두 삭제 중 오류 : ", error);
    }
  };

  const deleteSearchData = async (searchData: number) => {
    try {
      const response = await deleteRecentSearchLocation(searchData);
      console.log(response);
      console.log(searchData, " 검색 기록 삭제");

      // 삭제 후 리렌더링
      await getRecentSearch();
    } catch (error) {
      console.error("최근 검색어 하나 삭제 중 오류 : ", error);
    }
  };

  const handleSearch = async (name: string) => {
    try {
      const response = await getSearchLocationResult(name);
      console.log(response);
      setTryToSearch(true);
      setSearchResult(response);
    } catch (error) {
      console.error("위치 검색 중 에러 : ", error);
      alert("서버 또는 네트워크 에러입니다.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchText.trim() === "") setSearchText("");
    if (e.key === "Enter" && searchText.trim() !== "") {
      handleSearch(searchText);
    }
  };

  const doAgainRecentSearch = (name: string) => {
    setSearchText(name);
    handleSearch(name);
  };

  useEffect(() => {
    if (searchText === "") {
      resetSearchText();
      getRecentSearch();
    }
  }, [searchText]);

  return (
    <div className={styles.SearchModeContainer}>
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
            onClick={resetSearchText}
          />
        )}
      </div>
      {!searchText && recentSearchData.length !== 0 && (
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
            {recentSearchData.map((item) => (
              <div
                key={item.placeHistoryId}
                className={styles.RecentSearchContainer}
                onClick={() => doAgainRecentSearch(item.name)}
              >
                <span className={styles.LocationTitle}>{item.name}</span>
                <img
                  src={deleteIcon}
                  alt="검색어 지우기"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSearchData(item.placeHistoryId);
                  }}
                  style={{ padding: "2px 5px" }}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {searchText.trim() &&
        tryToSearch &&
        (searchResult.length !== 0 ? (
          <div className={styles.ResultWrapper}>
            {searchResult.map((result) => (
              <div
                key={result.placeId}
                className={styles.ResultContainer}
                onClick={() => {
                  setSearchMode(false);
                  clickSearchResultToMarker(result);
                }}
              >
                <span className={styles.LocationTitle}>{result.name}</span>
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
