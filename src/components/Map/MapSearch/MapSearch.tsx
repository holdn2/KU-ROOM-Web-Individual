import React, { useEffect, useState } from "react";
import styles from "./MapSearch.module.css";
import BottomBar from "../../BottomBar/BottomBar";
import arrowBack from "../../../assets/nav/arrowback.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";
import noResultIcon from "../../../assets/icon/noResultSearch.svg";
import { MapSearchResult } from "../../../../types/mapTypes";

const dummyRecentSearchData: MapSearchResult[] = [
  { mainTitle: "예시" },
  { mainTitle: "예시2" },
];
// const dummyLocationData = ["레스티오", "1847", "신공학관"];
interface MapSearchProps {
  setSearchMode: (value: boolean) => void;
  setMapSearchResult: (value: MapSearchResult) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({
  setSearchMode,
  setMapSearchResult,
}) => {
  const [searchText, setSearchText] = useState("");
  const [recentSearchData, setRecentSearchData] = useState<MapSearchResult[]>(
    []
  );
  const [searchResult, setSearchResult] = useState<MapSearchResult[]>([]);
  const [trySearch, setTrySearch] = useState(false);

  useEffect(() => {
    // 서버에서 최근 검색어 가져오기
    setRecentSearchData(dummyRecentSearchData);
  }, [trySearch]);

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
    // 서버에 검색 요청하기. 내가 볼 때 줄임말 등의 검색어를 보내면 관련된 위치를 검색결과에 뜨도록
    // 검색 기록에 추가하는 요청 추가
    // const trimmedText = searchText.trim();
    // if (trimmedText.length === 0) return;
    // const matchedResults = dummyLocationData.filter((location) =>
    //   location.includes(trimmedText)
    // );
    // 서버에서 검색 결과를 받아서 아래에 넣어준다.
    setSearchResult([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText) {
      setTrySearch(true);
      handleSearch();
    }
  };

  // 버튼 클릭 시 해당하는 위치를 서버에 요청하여 받아야함.
  const onClickSearchLocation = (result: MapSearchResult) => {
    // title을 이용하여 요청
    // 서버에 요청 후 아래에 넣기
    setMapSearchResult(result);
    setSearchMode(false);
  };

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
            onClick={deleteSearchText}
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
            {recentSearchData.map((item, index) => (
              <div
                key={index}
                className={styles.RecentSearchContainer}
                onClick={() => onClickSearchLocation(item)}
              >
                <span className={styles.LocationTitle}>{item.mainTitle}</span>
                <img
                  src={deleteIcon}
                  alt="검색어 지우기"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSearchData(item.mainTitle);
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
                onClick={() => onClickSearchLocation(result)}
              >
                <span className={styles.LocationTitle}>{result.mainTitle}</span>
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
