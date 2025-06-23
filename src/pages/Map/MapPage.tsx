// 지도 페이지
import { useEffect, useRef, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./MapPage.module.css";
import myTrackingIcon from "../../assets/map/tomylocation.svg";
import shareLocationIcon from "../../assets/map/shareLocation.svg";
import MapSearchBar from "../../components/Map/MapSearchBar/MapSearchBar";
import MapCategoryChip from "../../components/Map/MapCategoryChip/MapCategoryChip";
import KuroomMap from "../../components/Map/KuroomMap";
import MapSearch from "../../components/Map/MapSearch/MapSearch";
import SearchResultHeader from "../../components/Map/MapSearch/SearchResultHeader";
import LocationsBottomSheet from "../../components/Map/LocationsBottomSheet/LocationsBottomSheet";
import FocusedLocationBottomSheet from "../../components/Map/FocusedLocationBottomSheet/FocusedLocationBottomSheet";
import { isMyLocationInSchool } from "../../utils/mapRangeUtils";
import ShareLocationModal from "../../components/Map/ShareLocationModal/ShareLocationModal";
import {
  Coordinate,
  MapSearchResult,
  MarkerData,
  PlaceDataWithFriend,
} from "../../../types/mapTypes";
import { getCategoryLocations } from "../../apis/map";

const MapPage = () => {
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태
  const [searchMode, setSearchMode] = useState(false);
  const [mapSearchResult, setMapSearchResult] =
    useState<MapSearchResult | null>(null);
  const [isInSchool, setIsInSchool] = useState(false);
  const [isSharedLocation, setIsSharedLocation] = useState(false);

  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState<string>("");
  const [selectedCategoryLocations, setSelectedCategoryLocations] = useState<
    PlaceDataWithFriend[]
  >([]);

  // 위치 공유 상태
  const [modalState, setModalState] = useState(false);
  const [currenLocation, setCurrentLocation] = useState<Coordinate | null>(
    null
  ); // 현재 위치

  if (isInSchool) {
    // vercel 배포 오류 해결 위해.
  }

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  // 검색 또는 칩 클릭 시 바텀 시트
  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);
  const [isExpandedSheet, setIsExpandedSheet] = useState(false);

  // 클릭 또는 마커가 하나만 있을 때(==마커가 포커스되었을 때) 바텀시트
  const [hasFocusedMarker, setHasFocusedMarker] = useState(false);
  const [isExpandedFocusedSheet, setIsExpandedFocusedSheet] = useState(false);
  const [focusedMarkerTitle, setFocusedMarkerTitle] = useState<string | null>(
    null
  );

  const resetSelectSearch = () => {
    setSearchMode(false);
    setMapSearchResult(null);
    setSelectedCategoryTitle("");
    setMarkers([]);
    setIsExpandedSheet(false);
    setHasFocusedMarker(false);
    setIsExpandedFocusedSheet(false);
  };

  // 요청의 응답값을 markers배열에 저장. 바텀 시트 조작. 이부분은 테스트용 로직
  useEffect(() => {
    if (!mapSearchResult) {
      setMarkers([]);
      setVisibleBottomSheet(false);
      return;
    }
    setVisibleBottomSheet(true);
    setHasFocusedMarker(true);
    // setMarkers([
    //   {
    //     category: "focus",
    //     name: mapSearchResult.name,
    //     latitude: mapSearchResult.latitude,
    //     longitude: mapSearchResult.longitude,
    //   },
    // ]);
  }, [mapSearchResult]);

  // 카테고리 칩을 눌렀을 때 서버에 title을 이용하여 요청
  const getLocations = async (selectedCategory: string) => {
    try {
      const locations = await getCategoryLocations(selectedCategory);
      console.log(locations);
      setSelectedCategoryLocations(locations);
    } catch (error) {
      console.error();
      alert("서버 상태 또는 네트워크에 문제가 있습니다.");
    }
  };
  useEffect(() => {
    if (!selectedCategoryTitle) {
      setMarkers([]);
      setVisibleBottomSheet(false);
      return;
    }
    // 서버 요청 결과를 저장
    getLocations(selectedCategoryTitle);

    setVisibleBottomSheet(true);
  }, [selectedCategoryTitle]);

  useEffect(() => {
    // 카테고리 칩 클릭 시 데이터가 오면
    selectedCategoryLocations.map((item) => {
      const newMarker: MarkerData = {
        category: selectedCategoryTitle,
        name: item.mainTitle,
        latitude: item.latitude,
        longitude: item.longitude,
      };
      setMarkers([...markers, newMarker]);
    });
  }, [selectedCategoryLocations]);

  useEffect(() => {
    console.log("현재 포커된 상태: ", hasFocusedMarker);
  }, [hasFocusedMarker]);

  // 현재 위치가 학교 내부 인지 검증. 내 위치도 함께 저장
  // 서버에서 공유 상태인지 받아오기
  useEffect(() => {
    // setIsSharedLocation()
    isMyLocationInSchool(setIsInSchool, setCurrentLocation);
  }, [currenLocation, isSharedLocation]);

  // 위치 공유 모달
  const handleShareLocation = () => {
    setModalState(true);
  };
  return (
    <div>
      {/* KuroomMap은 항상 렌더링되고 */}
      <KuroomMap
        height={
          selectedCategoryTitle === "친구" ? "100vh" : "calc(100vh - 92px)"
        }
        markers={markers}
        mapRefProp={mapInstanceRef}
        isTracking={isTracking}
        setIsTracking={setIsTracking}
        setHasFocusedMarker={setHasFocusedMarker}
        setFocusedMarkerTitle={setFocusedMarkerTitle}
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
          {mapSearchResult || selectedCategoryTitle ? (
            mapSearchResult === null ? (
              <SearchResultHeader
                selectedCategoryTitle={selectedCategoryTitle}
                resetSelectSearch={resetSelectSearch}
              />
            ) : (
              <SearchResultHeader
                mapSearchResult={mapSearchResult}
                resetSelectSearch={resetSelectSearch}
              />
            )
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
              <MapCategoryChip
                setSelectedCategoryTitle={setSelectedCategoryTitle}
                setIsTracking={setIsTracking}
              />
              {/* 내 위치 추적 아이콘 */}
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
              {/* 학교 내부에서만 보이도록 하기! */}
              {/* 내 위치 공유 버튼 */}
              {/* {isInSchool && (
                <button
                  className={styles.SharedLocationButton}
                  onClick={handleShareLocation}
                >
                  <img src={shareLocationIcon} alt="위치 공유 아이콘" />
                  {isSharedLocation ? (
                    <span className={styles.SharingText}>위치 공유 해제</span>
                  ) : (
                    <span className={styles.SharingText}>내 위치 공유</span>
                  )}
                </button>
              )} */}
              <button
                className={styles.SharedLocationButton}
                onClick={handleShareLocation}
              >
                <img src={shareLocationIcon} alt="위치 공유 아이콘" />
                {isSharedLocation ? (
                  <span className={styles.SharingText}>위치 공유 해제</span>
                ) : (
                  <span className={styles.SharingText}>내 위치 공유</span>
                )}
              </button>
            </>
          )}
        </>
      )}
      {selectedCategoryTitle !== "친구" && (
        <>
          <LocationsBottomSheet
            visibleBottomSheet={visibleBottomSheet}
            selectedCategoryLocations={selectedCategoryLocations}
            isExpandedSheet={isExpandedSheet}
            mapInstance={mapInstanceRef}
            setIsExpandedSheet={setIsExpandedSheet}
            setIsTracking={setIsTracking}
            hasFocusedMarker={hasFocusedMarker}
            setHasFocusedMarker={setHasFocusedMarker}
            setFocusedMarkerTitle={setFocusedMarkerTitle}
          />
          <BottomBar />
        </>
      )}
      <FocusedLocationBottomSheet
        hasFocusedMarker={hasFocusedMarker}
        isExpandedFocusedSheet={isExpandedFocusedSheet}
        setIsExpandedFocusedSheet={setIsExpandedFocusedSheet}
        focusedMarkerTitle={focusedMarkerTitle}
      />
      <ShareLocationModal
        modalState={modalState}
        isSharedLocation={isSharedLocation}
        currentLocation={currenLocation}
        setModalState={setModalState}
        setIsSharedLocation={setIsSharedLocation}
      />
    </div>
  );
};

export default MapPage;
