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

  // 바텀 시트 올리고 내리는 로직. 좀 더 연구 필요할듯.
  useBottomSheetDrag({
    sheetRef,
    isExpanded: isExpandedSheet,
    setIsExpanded: setIsExpandedSheet,
    minHeight: 150,
  });

  return (
    <div
      className={`${styles.LocationInfoBottomSheetContainer} ${visibleBottomSheet && !hasFocusedMarker ? styles.open : ""}`}
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
          transform: isExpandedSheet
            ? "translateY(0)"
            : "translateY(calc(100% - 150px))",
        }}
      >
        <div className={styles.SheetIndicator} />
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
      </div>
      {!isExpandedSheet && <div className={styles.BottomSheetGrad} />}
    </div>
  );
};

export default LocationsBottomSheet;
