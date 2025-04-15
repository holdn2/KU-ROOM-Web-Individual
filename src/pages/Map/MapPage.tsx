// 지도 페이지
import { useEffect, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./MapPage.module.css";
import myTrackingIcon from "../../assets/map/tomylocation.svg";
import MapSearchBar from "../../components/Map/MapSearchBar/MapSearchBar";
import MapCategoryChip from "../../components/Map/MapCategoryChip/MapCategoryChip";
import KuroomMap from "../../components/Map/KuroomMap";
import MapSearch from "../../components/Map/MapSearch/MapSearch";

const MapPage = () => {
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태
  const [searchTargetLocation, setSearchTargetLocation] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const handleSelectLocation = (location: string) => {
    if (searchTargetLocation === location) {
      // 강제로 한 번 초기화 후 다시 설정
      setSearchTargetLocation(""); // 다른 값으로 초기화
      setTimeout(() => {
        setSearchTargetLocation(location); // 다시 설정
      }, 0);
    } else {
      setSearchTargetLocation(location);
    }
  };

  useEffect(() => {
    if (searchTargetLocation) console.log(searchTargetLocation, " 선택");
  }, [searchTargetLocation]);

  return (
    <div>
      {/* KuroomMap은 항상 렌더링되고 */}
      <KuroomMap
        height="calc(100vh - 92px)"
        isTracking={isTracking}
        setIsTracking={setIsTracking}
        searchLocation={searchTargetLocation}
      />

      {/* 검색 모드일 때 MapSearch만 덮어씌우기 */}
      {searchMode ? (
        <div className={styles.FullScreenOverlay}>
          <MapSearch
            setSearchMode={setSearchMode}
            setSelectLocation={handleSelectLocation}
          />
        </div>
      ) : (
        <>
          <button
            className={styles.SearchBarContainer}
            onClick={() => {
              setIsTracking(false);
              setSearchMode(true);
            }}
          >
            <MapSearchBar />
          </button>
          <MapCategoryChip setSelectedChip={handleSelectLocation} />
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
        </>
      )}
      <BottomBar />
    </div>
  );
};

export default MapPage;
