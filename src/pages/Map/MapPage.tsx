// 지도 페이지
import { useEffect, useRef, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./MapPage.module.css";
import myTrackingIcon from "../../assets/map/tomylocation.svg";
import MapSearchBar from "../../components/Map/MapSearchBar/MapSearchBar";
import MapCategoryChip from "../../components/Map/MapCategoryChip/MapCategoryChip";
import KuroomMap from "../../components/Map/KuroomMap";
import MapSearch from "../../components/Map/MapSearch/MapSearch";
import { KuroomMarkers } from "../../components/Map/MapData";
import SearchResultHeader from "../../components/Map/MapSearch/SearchResultHeader";
import LocationsBottomSheet from "../../components/Map/LocationsBottomSheet/LocationsBottomSheet";

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
}

const MapPage = () => {
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태
  const [searchMode, setSearchMode] = useState(false);
  const [mapSearchResult, setMapSearchResult] = useState("");

  const [isExpandedSheet, setIsExpandedSheet] = useState(false);

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);

  // 요청의 응답값을 markers배열에 저장. 바텀 시트 조작. 이부분은 테스트용 로직
  useEffect(() => {
    if (!mapSearchResult) {
      setMarkers([]);
      setVisibleBottomSheet(false);
      return;
    }
    setVisibleBottomSheet(true);
    const categoryMatch = KuroomMarkers.find(
      (item) => item.category === mapSearchResult
    );

    if (categoryMatch) {
      setMarkers(categoryMatch.markers);
    } else {
      setMarkers([]); // 해당 카테고리 없으면 빈 배열로
    }
  }, [mapSearchResult]);

  return (
    <div>
      {/* KuroomMap은 항상 렌더링되고 */}
      <KuroomMap
        height="calc(100vh - 92px)"
        markers={markers}
        mapRefProp={mapInstanceRef}
        isTracking={isTracking}
        setIsTracking={setIsTracking}
      />

      {/* 검색 모드일 때 MapSearch만 덮어씌우기 */}
      {searchMode ? (
        // 검색 모드 전체 화면
        <div className={styles.FullScreenOverlay}>
          <MapSearch
            setSearchMode={setSearchMode}
            setMapSearchResult={setMapSearchResult}
          />
        </div>
      ) : (
        // 검색 결과가 있을 때 상단 바, 바텀시트, (2개 이상일 때 목록보기) 보여주기
        <>
          {mapSearchResult ? (
            <>
              <SearchResultHeader
                mapSearchResult={mapSearchResult}
                setSearchMode={setSearchMode}
                setMapSearchResult={setMapSearchResult}
                setMarkers={setMarkers}
                setIsExpandedSheet={setIsExpandedSheet}
              />
            </>
          ) : (
            // 검색 결과 없을 때만 기본 UI 보여주기
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
              <MapCategoryChip setMapSearchResult={setMapSearchResult} />
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
        </>
      )}
      <LocationsBottomSheet
        visibleBottomSheet={visibleBottomSheet}
        mapSearchResult={mapSearchResult}
        isExpandedSheet={isExpandedSheet}
        mapInstance={mapInstanceRef}
        setIsExpandedSheet={setIsExpandedSheet}
        setIsTracking={setIsTracking}
      />
      <BottomBar />
    </div>
  );
};

export default MapPage;
