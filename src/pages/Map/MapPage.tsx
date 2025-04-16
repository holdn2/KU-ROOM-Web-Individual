// 지도 페이지
import { useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./MapPage.module.css";
import myTrackingIcon from "../../assets/map/tomylocation.svg";
import MapSearchBar from "../../components/Map/MapSearchBar/MapSearchBar";
import MapCategoryChip from "../../components/Map/MapCategoryChip/MapCategoryChip";
import KuroomMap from "../../components/Map/KuroomMap";
import MapSearch from "../../components/Map/MapSearch/MapSearch";

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
}

const MapPage = () => {
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태
  const [searchMode, setSearchMode] = useState(false);
  const [mapSearchResult, setMapSearchResult] = useState("");

  const [markers, setMarkers] = useState<MarkerData[]>([]);

  return (
    <div>
      {/* KuroomMap은 항상 렌더링되고 */}
      <KuroomMap
        height="calc(100vh - 92px)"
        markers={markers}
        isTracking={isTracking}
        setIsTracking={setIsTracking}
      />

      {/* 검색 모드일 때 MapSearch만 덮어씌우기 */}
      {searchMode ? (
        <div className={styles.FullScreenOverlay}>
          <MapSearch
            setSearchMode={setSearchMode}
            mapSearchResult={mapSearchResult}
            setMapSearchResult={setMapSearchResult}
            setMarkers={setMarkers}
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
          <MapCategoryChip
            mapSearchResult={mapSearchResult}
            setMapSearchResult={setMapSearchResult}
            setMarkers={setMarkers}
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
