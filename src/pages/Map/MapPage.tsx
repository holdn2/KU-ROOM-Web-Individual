// 지도 페이지
import { useEffect, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./MapPage.module.css";
import myTrackingIcon from "../../assets/map/tomylocation.svg";
import MapSearchBar from "../../components/Map/MapSearchBar/MapSearchBar";
import MapCategoryChip from "../../components/Map/MapCategoryChip/MapCategoryChip";
import KuroomMap from "../../components/Map/KuroomMap";
import { useLocation } from "react-router-dom";
import MapSearch from "../../components/Map/MapSearch/MapSearch";

const MapPage = () => {
  const loc = useLocation();
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

  useEffect(() => {
    if (loc.state?.searchLocation) {
      setIsTracking(false);
      setSearchTargetLocation(loc.state.searchLocation);
      console.log(loc.state.searchLocation, " 으로 이동하기");
    }
  }, []);
  return (
    <div>
      {searchMode ? (
        <>
          <MapSearch
            setSearchMode={setSearchMode}
            setSelectLocation={handleSelectLocation}
          />
        </>
      ) : (
        <>
          <button
            className={styles.SearchBarContainer}
            onClick={() => setSearchMode(true)}
          >
            {/* 이부분은 그냥 누르면 검색 화면으로 이동하도록 버튼형식 */}
            <MapSearchBar />
          </button>
          <MapCategoryChip setSelectedChip={handleSelectLocation} />
          <KuroomMap
            height="calc(100vh - 92px)"
            isTracking={isTracking}
            setIsTracking={setIsTracking}
            searchLocation={searchTargetLocation}
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
        </>
      )}

      <BottomBar />
    </div>
  );
};

export default MapPage;
