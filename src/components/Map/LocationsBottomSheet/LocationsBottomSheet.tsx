import React, { useEffect, useRef, useState } from "react";
import styles from "./LocationsBottomSheet.module.css";
import mapListIcon from "../../../assets/map/mapListIcon.svg";
import { dummyLocationInfo } from "../MapData";
import { focusMarker, renderedMarkers } from "../kuroomMapUtils";

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
  mapSearchResult: string;
  isExpandedSheet: boolean;
  mapInstance: React.MutableRefObject<naver.maps.Map | null>;
  setIsExpandedSheet: (value: boolean) => void;
  setIsTracking: (value: boolean) => void;
}

const LocationsBottomSheet: React.FC<LocationsBottomSheetProps> = ({
  mapSearchResult,
  isExpandedSheet,
  mapInstance,
  setIsExpandedSheet,
  setIsTracking,
}) => {
  const [selectedLocationInfos, setSelectedLocationInfos] = useState<
    LocationInfo[]
  >([]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const canDragToClose = useRef(true);

  // 시트에서 위치 클릭 시 이동하는 로직
  const clickLocation = (location: string) => {
    setIsExpandedSheet(false); // 바텀시트 내리기

    // 다음 frame에 마커 포커스하기 (지도가 닫힌 후 실행되도록)
    setTimeout(() => {
      const marker = renderedMarkers.find((m) => m.getTitle() === location);
      if (marker && mapInstance.current && setIsTracking) {
        focusMarker(mapInstance.current, marker, setIsTracking);
      }
    }, 300); // transition 시간과 맞춰서 살짝 delay
  };

  // 서버에 해당 정보들 요청해야함.
  useEffect(() => {
    const match = dummyLocationInfo.find(
      (item) => item.category === mapSearchResult
    );
    setSelectedLocationInfos(match ? match.infos : []);
  }, [mapSearchResult]);

  // 바텀 시트 올리고 내리는 로직. 좀 더 연구 필요할듯.
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startY.current = e.touches[0].clientY;
      // console.log(startY.current);
      sheet.style.transition = "none";
      // 현재 스크롤이 최상단일 때만 아래로 드래그 가능
      canDragToClose.current = sheet.scrollTop === 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !canDragToClose.current) return;
      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;

      if (diff > 0) {
        const maxTranslate = window.innerHeight - 150;
        const limitedDiff = Math.min(diff, maxTranslate);
        sheet.style.transform = `translateY(${limitedDiff}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging.current) return;
      const diff = currentY.current - startY.current;
      sheet.style.transition = "transform 0.3s ease-in-out";
      // 💡 이동 거리가 작으면 그냥 무시 (클릭 처리)
      if (Math.abs(diff) < 10) {
        sheet.style.transform = isExpandedSheet
          ? "translateY(0)"
          : "translateY(calc(100% - 150px))";
        isDragging.current = false;
        return;
      }
      if (diff > 100 && canDragToClose.current) {
        // 닫기
        setIsExpandedSheet(false);
        sheet.style.transform = "translateY(calc(100% - 150px))";
      } else {
        // 열기
        setIsExpandedSheet(true);
        sheet.style.transform = "translateY(0)";
      }

      isDragging.current = false;
      // 위치 초기화
      startY.current = 0;
      currentY.current = 0;
    };

    sheet.addEventListener("touchstart", handleTouchStart);
    sheet.addEventListener("touchmove", handleTouchMove);
    sheet.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheet.removeEventListener("touchstart", handleTouchStart);
      sheet.removeEventListener("touchmove", handleTouchMove);
      sheet.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isExpandedSheet]);

  return (
    <div className={styles.LocationInfoBottomSheetContainer}>
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
            onClick={() => isExpandedSheet && clickLocation(info.title)}
          >
            <div className={styles.TitleWrapper}>
              <span className={styles.TitleText}>{info.title}</span>
              <span className={styles.SubTitleText}>{info.subtit}</span>
            </div>
            <div className={styles.ContentWrapper}>
              {info.friends.length !== 0 && (
                <div className={styles.FriendWrapper}>
                  <span className={styles.FriendTitle}>친구</span>
                  {/* <span className={styles.FriendImg}>{info.info}</span> */}
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
