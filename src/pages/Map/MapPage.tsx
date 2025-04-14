// 지도 페이지
import { useEffect, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./MapPage.module.css";
import myTrackingIcon from "../../assets/map/tomylocation.svg";
import MapSearchBar from "../../components/Map/MapSearchBar/MapSearchBar";
import MapCategoryChip from "../../components/Map/MapCategoryChip/MapCategoryChip";
import KuroomMap from "../../components/Map/KuroomMap";

const MapPage = () => {
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태
  const [searchLocation, setSearchLocation] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [selectedChip, setSelectedChip] = useState("");

  useEffect(() => {
    if (selectedChip) console.log(selectedChip, " 선택");
  }, [selectedChip]);

  const handleBlurSearch = () => {
    if (searchLocation === "") setIsSearchFocused(false);
  };

  return (
    <div>
      <div className={styles.SearchBarContainer}>
        <MapSearchBar
          searchTarget={searchLocation}
          setSearchTarget={setSearchLocation}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={handleBlurSearch}
        />
      </div>

      {isSearchFocused ? (
        <div style={{ marginTop: "100px", marginLeft: "20px" }}>
          검색 화면 구현 예정
          <br />
          <span>{searchLocation}</span>
        </div>
      ) : (
        <>
          <MapCategoryChip setSelectedChip={setSelectedChip} />
          <KuroomMap
            height="calc(100vh - 92px)"
            isTracking={isTracking}
            setIsTracking={setIsTracking}
          />
          <button
            className={styles.TrackingIcon}
            onClick={() => setIsTracking(true)}
          >
            <img
              src={myTrackingIcon}
              alt="위치 추적 아이콘"
              style={{ filter: isTracking ? "none" : "grayscale(100%)" }}
            />
          </button>
          <BottomBar />
        </>
      )}
    </div>
  );
};

export default MapPage;
