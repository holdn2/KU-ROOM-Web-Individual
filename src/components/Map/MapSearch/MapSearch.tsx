import React, { useEffect, useState } from "react";
import styles from "./MapSearch.module.css";
import BottomBar from "../../BottomBar/BottomBar";
import arrowBack from "../../../assets/nav/arrowback.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";
import noResultIcon from "../../../assets/icon/noResultSearch.svg";
import { DetailPlaceData, MapSearchResult } from "../../../../types/mapTypes";
import {
  getLocationDetailData,
  getRecentSearchLocation,
  getSearchLocationResult,
} from "../../../apis/map";

// const dummyLocationData = ["레스티오", "1847", "신공학관"];
interface MapSearchProps {
  setSearchMode: (value: boolean) => void;
  setDetailLocationData: (value: DetailPlaceData) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({
  setSearchMode,
  setDetailLocationData,
}) => {
  const [searchText, setSearchText] = useState("");
  const [recentSearchData, setRecentSearchData] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<MapSearchResult[]>([]);
  const [trySearch, setTrySearch] = useState(false);

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

  const handleSearch = async () => {
    // 서버에 검색 요청하기. 내가 볼 때 줄임말 등의 검색어를 보내면 관련된 위치를 검색결과에 뜨도록
    // 검색 기록에 추가하는 요청 추가
    // 서버에서 검색 결과를 받아서 아래에 넣어준다.
    try {
      const response = await getSearchLocationResult(searchText);
      console.log(response);
      setSearchResult(response);
    } catch (error) {
      console.error("위치 검색 중 에러 : ", error);
      alert("서버 또는 네트워크 에러입니다.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText) {
      setTrySearch(true);
      handleSearch();
    }
  };

  // 버튼 클릭 시 해당하는 위치를 서버에 요청하여 받아야함.
  const onClickSearchLocation = async (search: string) => {
    try {
      const response = await getLocationDetailData(search);
      console.log("하나의 위치에 대한 디테일 정보 : ", response);
      setDetailLocationData(response);
      setSearchMode(false);
    } catch (error) {
      console.error("하나의 위치에 대한 디테일 정보 반환 실패", error);
      alert("서버 또는 네트워크 오류입니다.");
    }
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
                onClick={() => onClickSearchLocation(result.mainTitle)}
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
