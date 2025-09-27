// 지도 페이지
import { useEffect, useRef, useState } from "react";

import {
  checkIsSharedApi,
  getCategoryLocationsApi,
  getUserShareLocation,
} from "@apis/map";
import DefaultProfileImg from "@assets/defaultProfileImg.svg";
import myTrackingIcon from "@assets/map/tomylocation.svg";
import shareLocationIcon from "@assets/map/shareLocation.svg";
import unshareLocationIcon from "@assets/map/shareLocationWhite.svg";
import BottomBar from "@components/BottomBar/BottomBar";
import ShareLocationModal from "@components/ShareLocationModal/ShareLocationModal";

import styles from "./MapPage.module.css";
import MapSearchBar from "./components/MapSearchBar/MapSearchBar";
import MapCategoryChip from "./components/MapCategoryChip/MapCategoryChip";
import KuroomMap from "./components/KuroomMap";
import MapSearch from "./components/MapSearch/MapSearch";
import LocationsBottomSheet from "./components/LocationsBottomSheet/LocationsBottomSheet";
import FocusedLocationBottomSheet from "./components/FocusedLocationBottomSheet/FocusedLocationBottomSheet";
import { isMyLocationInSchool } from "@utils/mapRangeUtils";
import {
  Coordinate,
  DetailPlaceData,
  MapSearchResult,
  MarkerData,
  PlaceData,
} from "@/shared/types/mapTypes";
import {
  clearAllMarkers,
  makeFocusMarker,
  makeMarkerIcon,
  renderedMarkers,
  renderMarkers,
  resetFocusedMarker,
} from "./utils/kuroomMapUtils";
import SearchResultHeader from "./components/MapSearch/SearchResultHeader";

const includeBottomSheetList = [
  "건물",
  "단과대",
  "K-Cube",
  "K-Hub",
  "편의점",
  "레스티오",
  "1847",
  "학생식당",
  "기숙사",
  "은행",
  "우체국",
];

const MapPage = () => {
  // 로컬 상태 ***************************************************************
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태
  const [searchMode, setSearchMode] = useState(false);
  const [isInSchool, setIsInSchool] = useState(false);
  const [isSharedLocation, setIsSharedLocation] = useState(false);
  // 공유 상태 확인 트리거 키
  const [locationSharedRefreshKey, setLocationSharedRefreshKey] = useState(0);

  // 하나의 위치에 대한 디테일 정보
  const [detailLocationData, setDetailLocationData] =
    useState<DetailPlaceData | null>(null);
  // 선택된 위치 카테고리 명
  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState<string>("");
  const [selectedCategoryEnum, setSelectedCategoryEnum] = useState<string>("");
  // 선택된 위치 카테고리 관련 위치 배열
  const [selectedCategoryLocations, setSelectedCategoryLocations] = useState<
    PlaceData[]
  >([]);

  // 위치 공유 상태
  const [modalState, setModalState] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(
    null
  ); // 현재 위치
  // 유저의 위치와 가장 가까운 위치 타이틀
  const [nearLocation, setNearLocation] = useState("");

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  // 마커가 변경될 때마다 플래그 설정. 마커 렌더링 트리거
  const [markerFlag, setMarkerFlag] = useState<number>(0);

  // 검색 또는 칩 클릭 시 바텀 시트
  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);
  const [isExpandedSheet, setIsExpandedSheet] = useState(false);

  // 클릭 또는 마커가 하나만 있을 때(==마커가 포커스되었을 때) 바텀시트
  const [hasFocusedMarker, setHasFocusedMarker] = useState(false);
  const [isExpandedFocusedSheet, setIsExpandedFocusedSheet] = useState(false);

  // 서버로부터 데이터 fetching ***********************************************
  // 현재 내 위치 공유 상태 확인 함수
  const getIsMySharedInfo = async () => {
    try {
      const response = await checkIsSharedApi();
      console.log("현재 내 위치 공유 상태 : ", response);
      setIsSharedLocation(response.isActive);
    } catch (error) {
      console.error("위치 공유 상태 확인 실패 : ", error);
    }
  };

  // 현재 위치에 따른 가까운 건물 받아오기
  const getNearBuildingToShare = async () => {
    try {
      const response = await getUserShareLocation(
        currentLocation!.latitude,
        currentLocation!.longitude
      );
      console.log(response);
      setNearLocation(response);
    } catch (error) {
      console.error("가장 가까운 위치 조회 실패 : ", error);
    }
  };

  // 친구 제외 카테고리 칩을 눌렀을 때 서버에 카테고리 ENUM 을 이용하여 요청
  const getCategoryLocations = async (selectedCategory: string) => {
    try {
      const locations = await getCategoryLocationsApi(selectedCategory);
      setSelectedCategoryLocations(locations);
    } catch (error) {
      console.error();
      alert("서버 상태 또는 네트워크에 문제가 있습니다.");
    }
  };

  // 이벤트 핸들러 함수 *******************************************************
  const resetSelectSearch = () => {
    setSearchMode(false);
    setDetailLocationData(null);
    setSelectedCategoryTitle("");
    setSelectedCategoryEnum("");
    setMarkerFlag(0);
    setMarkers([]);
    setIsExpandedSheet(false);
    setHasFocusedMarker(false);
    setIsExpandedFocusedSheet(false);
    clearAllMarkers();
  };

  const onClickGoBackButton = () => {
    if (isExpandedSheet) {
      setIsExpandedSheet(false);
      setIsExpandedFocusedSheet(false);
    } else if (detailLocationData) {
      resetFocusedMarker(setHasFocusedMarker);
    } else {
      resetSelectSearch();
    }
  };

  // 위치 공유 모달에 사용할 가까운 위치 타이틀 받아오기
  const handleShareLocation = () => {
    getNearBuildingToShare();
    setModalState(true);
  };
  // 시트에서 위치 클릭 시 이동하는 로직
  const clickToLocationMarker = (location: string) => {
    if (!isExpandedSheet) return;
    // 다음 frame에 마커 포커스하기
    const target = renderedMarkers.find(
      ({ marker }) => marker.getTitle() === location
    );
    if (target && mapInstanceRef.current) {
      setHasFocusedMarker(true);
      makeFocusMarker(
        mapInstanceRef.current,
        target.marker,
        setIsTracking,
        setHasFocusedMarker,
        setDetailLocationData
      );
    }

    setIsExpandedSheet(false); // 바텀시트 내리기
  };
  // 검색 결과를 클릭 시에 마커 찍기
  const clickSearchResultToMarker = (searchResult: MapSearchResult) => {
    setSelectedCategoryTitle(searchResult.name);
    const markerIcon = makeMarkerIcon("default");
    if (
      mapInstanceRef.current &&
      setIsTracking &&
      setHasFocusedMarker &&
      setDetailLocationData
    ) {
      renderMarkers(
        mapInstanceRef.current,
        [
          {
            placeId: searchResult.placeId,
            markerIcon: markerIcon,
            name: searchResult.name,
            latitude: searchResult.latitude,
            longitude: searchResult.longitude,
          },
        ],
        searchResult.name,
        setIsTracking,
        setHasFocusedMarker,
        setDetailLocationData
      );
    }
  };
  // 컴포넌트 초기화 로직 ***********************************************
  useEffect(() => {
    // 현재 내 위치가 학교 내부인지 검증
    isMyLocationInSchool(setIsInSchool, setCurrentLocation);
  }, []);

  // 사이드 이펙트 (useEffect) *********************************************
  useEffect(() => {
    console.log("위치공유 상태는?:", isSharedLocation);
    // 현재 내 위치 공유 상태 확인
    getIsMySharedInfo();
  }, [locationSharedRefreshKey]);

  // 요청의 응답값을 markers배열에 저장. 바텀 시트 조작.
  useEffect(() => {
    if (!detailLocationData) {
      setMarkers([]);
      setVisibleBottomSheet(false);
      return;
    }
    setVisibleBottomSheet(true);
    setHasFocusedMarker(true);
    // 마커 아이콘 반영
    const markerIcon = makeMarkerIcon("default");
    setMarkers([
      {
        placeId: detailLocationData.placeId,
        markerIcon: markerIcon,
        name: detailLocationData.name,
        latitude: detailLocationData.latitude,
        longitude: detailLocationData.longitude,
      },
    ]);
  }, [detailLocationData]);

  useEffect(() => {
    if (!selectedCategoryTitle) {
      setMarkers([]);
      setVisibleBottomSheet(false);
      return;
    }

    getCategoryLocations(selectedCategoryEnum);
    if (selectedCategoryTitle !== "친구") {
      setVisibleBottomSheet(true);
    }
  }, [selectedCategoryEnum]);

  useEffect(() => {
    if (selectedCategoryLocations.length === 0) return;
    if (selectedCategoryTitle === "친구") {
      const placeMarkers: MarkerData[] = selectedCategoryLocations.map(
        (item) => ({
          placeId: item.placeId,
          markerIcon: item.friends[0].profileURL || DefaultProfileImg,
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          isFriendMarker: true,
          numOfFriends: item.friends.length,
        })
      );
      setMarkers(placeMarkers);
      setMarkerFlag((prev) => prev + 1);
    } else {
      const markerIcon = makeMarkerIcon(selectedCategoryTitle);
      const placeMarkers: MarkerData[] = selectedCategoryLocations.map(
        (item) => ({
          placeId: item.placeId,
          markerIcon,
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
        })
      );
      setMarkers(placeMarkers);
      setMarkerFlag((prev) => prev + 1);
    }
  }, [selectedCategoryLocations]);

  if (isInSchool) {
    // vercel 배포 오류 해결 위해.
  }

  return (
    <div>
      <KuroomMap
        height={
          includeBottomSheetList.includes(selectedCategoryTitle) ||
          selectedCategoryTitle === ""
            ? "calc(100vh - 92px)"
            : "100vh"
        }
        markers={markers}
        markerFlag={markerFlag}
        mapRefProp={mapInstanceRef}
        isTracking={isTracking}
        selectedCategoryTitle={selectedCategoryTitle}
        setIsTracking={setIsTracking}
        setHasFocusedMarker={setHasFocusedMarker}
        setDetailLocationData={setDetailLocationData}
      />

      {/* 검색 모드일 때 MapSearch만 덮어씌우기 */}
      {searchMode ? (
        // 검색 모드 전체 화면
        <div className={styles.FullScreenOverlay}>
          <MapSearch
            setSearchMode={setSearchMode}
            clickSearchResultToMarker={clickSearchResultToMarker}
          />
        </div>
      ) : (
        // 검색 결과가 있을 때 상단 바, 바텀시트, (2개 이상일 때 목록보기) 보여주기
        <>
          {hasFocusedMarker || selectedCategoryTitle ? (
            !hasFocusedMarker ? (
              <SearchResultHeader
                selectedCategoryTitle={selectedCategoryTitle}
                resetSelectSearch={resetSelectSearch}
                onClickGoBackButton={onClickGoBackButton}
              />
            ) : (
              detailLocationData && (
                <SearchResultHeader
                  detailLocationData={detailLocationData}
                  resetSelectSearch={resetSelectSearch}
                  onClickGoBackButton={onClickGoBackButton}
                />
              )
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
                setSelectedCategoryEnum={setSelectedCategoryEnum}
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
              {/* {isInSchool && currentLocation !== null && (
                <button
                  className={styles.SharedLocationButton}
                  onClick={handleShareLocation}
                >
                  <img src={shareLocationIcon} alt="위치 공유 아이콘" />
                  {isSharedLocation ? (
                    <span className={styles.SharingText}>내 위치 공유 중</span>
                  ) : (
                    <span className={styles.SharingText}>내 위치 공유</span>
                  )}
                </button>
              )} */}
              {/* 현재 위치를 가져온 다음에만 렌더링 되도록 */}
              {currentLocation !== null &&
                (isSharedLocation ? (
                  <button
                    className={styles.UnsharedLocationButton}
                    onClick={handleShareLocation}
                  >
                    <img
                      src={unshareLocationIcon}
                      alt="위치 공유 해제 아이콘"
                    />
                    <span>내 위치 공유 중</span>
                  </button>
                ) : (
                  <button
                    className={styles.SharedLocationButton}
                    onClick={handleShareLocation}
                  >
                    <img src={shareLocationIcon} alt="위치 공유 아이콘" />
                    <span>내 위치 공유</span>
                  </button>
                ))}
            </>
          )}
        </>
      )}
      {(includeBottomSheetList.includes(selectedCategoryTitle) ||
        selectedCategoryTitle === "") && (
        <>
          <LocationsBottomSheet
            visibleBottomSheet={visibleBottomSheet}
            selectedCategoryLocations={selectedCategoryLocations}
            isExpandedSheet={isExpandedSheet}
            hasFocusedMarker={hasFocusedMarker}
            setIsExpandedSheet={setIsExpandedSheet}
            clickToLocationMarker={clickToLocationMarker}
          />
          <BottomBar />
        </>
      )}
      <FocusedLocationBottomSheet
        hasFocusedMarker={hasFocusedMarker}
        isExpandedFocusedSheet={isExpandedFocusedSheet}
        setHasFocusedMarker={setHasFocusedMarker}
        setIsExpandedFocusedSheet={setIsExpandedFocusedSheet}
        detailLocationData={detailLocationData}
      />
      <ShareLocationModal
        modalState={modalState}
        isSharedLocation={isSharedLocation}
        nearLocation={nearLocation}
        setModalState={setModalState}
        refreshSharedStatus={() =>
          setLocationSharedRefreshKey((prev) => prev + 1)
        }
      />
    </div>
  );
};

export default MapPage;
