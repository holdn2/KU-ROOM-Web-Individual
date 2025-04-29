import React, { useEffect, useRef, useState } from "react";
import styles from "./LocationsBottomSheet.module.css";
import mapListIcon from "../../../assets/map/mapListIcon.svg";
import { dummyLocationInfo } from "../MapData";
import { makeFocusMarker, renderedMarkers } from "../kuroomMapUtils";
import useBottomSheetDrag from "../../../hooks/useBottomSheetDrag";

interface LocationInfo {
  title: string;
  subtit: string;
  friends: {
    nickname: string;
    profileImg: string;
  }[];
  info: string;
}

interface LocationsBottomSheetProps {
  visibleBottomSheet: boolean;
  mapSearchResult: string;
  isExpandedSheet: boolean;
  mapInstance: React.MutableRefObject<naver.maps.Map | null>;
  setIsExpandedSheet: (value: boolean) => void;
  setIsTracking: (value: boolean) => void;
  hasFocusedMarker: boolean;
  setHasFocusedMarker: (value: boolean) => void;
}

const LocationsBottomSheet: React.FC<LocationsBottomSheetProps> = ({
  visibleBottomSheet,
  mapSearchResult,
  isExpandedSheet,
  mapInstance,
  setIsExpandedSheet,
  setIsTracking,
  hasFocusedMarker,
  setHasFocusedMarker,
}) => {
  const [selectedLocationInfos, setSelectedLocationInfos] = useState<
    LocationInfo[]
  >([]);
  const sheetRef = useRef<HTMLDivElement>(null);

  // 시트에서 위치 클릭 시 이동하는 로직
  const clickLocation = (location: string) => {
    if (!isExpandedSheet) return;
    // 다음 frame에 마커 포커스하기
    const target = renderedMarkers.find(
      ({ marker }) => marker.getTitle() === location
    );
    if (target && mapInstance.current) {
      setHasFocusedMarker(true);
      makeFocusMarker(mapInstance.current, target.marker, setIsTracking);
    }

    setIsExpandedSheet(false); // 바텀시트 내리기
  };

  // !!서버에 해당 정보들 요청해야함.
  useEffect(() => {
    const match = dummyLocationInfo.find(
      (item) => item.category === mapSearchResult
    );
    setSelectedLocationInfos(match ? match.infos : []);
  }, [mapSearchResult]);

  // 바텀 시트 드래그 로직 - 위/아래 모두 드래그 가능하도록 수정됨
  useBottomSheetDrag({
    sheetRef,
    isExpanded: isExpandedSheet,
    setIsExpanded: setIsExpandedSheet,
    minHeight: 150,
    // threshold: 70, // 약간 더 작은 임계값으로 더 민감하게 반응
  });

  return (
    <div
      className={`${styles.LocationInfoBottomSheetContainer} ${
        visibleBottomSheet && !hasFocusedMarker ? styles.open : ""
      }`}
    >
      {!isExpandedSheet && (
        <button
          className={styles.ListButton}
          onClick={() => setIsExpandedSheet(true)}
        >
          <img src={mapListIcon} alt="목록보기" />
          <span className={styles.ListButtonText}>목록보기</span>
        </button>
      )}

      <div
        ref={sheetRef}
        className={`${styles.LocationInfoBottomSheet} ${
          isExpandedSheet ? styles.Expanded : ""
        }`}
        style={{
          position: "relative",
          transform: isExpandedSheet
            ? "translateY(0)"
            : "translateY(calc(100% - 150px))",
          background: "#fff",
          transition: "transform 0.3s ease-out", // 트랜지션 기본값 설정
        }}
      >
        {/* SheetIndicator를 더 명확하게 드래그 핸들러로 표시 */}
        <div
          className={styles.SheetIndicator}
          style={{ cursor: "grab" }} // 커서를 추가하여 드래그 가능함을 시각적으로 알림
        />

        {selectedLocationInfos.map((info, index) => (
          <button
            key={index}
            className={styles.LocationInfoWrapper}
            style={isExpandedSheet ? {} : { pointerEvents: "none" }}
            onClick={() => clickLocation(info.title)}
          >
            <div className={styles.TitleWrapper}>
              <span className={styles.TitleText}>{info.title}</span>
              <span className={styles.SubTitleText}>{info.subtit}</span>
            </div>
            <div className={styles.ContentWrapper}>
              {info.friends.length !== 0 && (
                <div className={styles.FriendWrapper}>
                  <span className={styles.FriendTitle}>친구</span>
                  <div className={styles.FriendContainer}>
                    {info.friends.map((friend, index) => (
                      <img
                        key={index}
                        src={friend.profileImg}
                        alt={friend.nickname}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.InfoWrapper}>
                <span className={styles.InfoTitle}>정보</span>
                <span className={styles.InfoContent}>{info.info}</span>
              </div>
            </div>
          </button>
        ))}
        {/* 내용이 없을 경우 안내 메시지 추가 */}
        {selectedLocationInfos.length === 0 && (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#9eaab5",
            }}
          >
            선택한 카테고리에 대한 정보가 없습니다.
          </div>
        )}
      </div>
      {!isExpandedSheet && <div className={styles.BottomSheetGrad} />}
    </div>
  );
};

export default LocationsBottomSheet;
