import React, { useEffect, useRef, useState } from "react";
import styles from "./LocationsBottomSheet.module.css";
import mapListIcon from "../../../assets/map/mapListIcon.svg";
import { dummyLocationInfo } from "../MapData";

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
  setIsExpandedSheet: (value: boolean) => void;
}

const LocationsBottomSheet: React.FC<LocationsBottomSheetProps> = ({
  mapSearchResult,
  isExpandedSheet,
  setIsExpandedSheet,
}) => {
  const [selectedLocationInfos, setSelectedLocationInfos] = useState<
    LocationInfo[]
  >([]);
  const [translateY, setTranslateY] = useState(0);
  console.log(translateY);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const match = dummyLocationInfo.find(
      (item) => item.category === mapSearchResult
    );
    setSelectedLocationInfos(match ? match.infos : []);
  }, [mapSearchResult]);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startY.current = e.touches[0].clientY;
      sheet.style.transition = "none";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;

      // 아래로 드래그(양수)만 허용 (올리는 동작은 무시)
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

      if (diff > 80) {
        // 닫기
        setIsExpandedSheet(false);
        sheet.style.transform = "translateY(calc(100% - 150px))";
      } else {
        // 열기
        setIsExpandedSheet(true);
        sheet.style.transform = "translateY(0)";
      }

      setTranslateY(0);
      isDragging.current = false;
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
          <button key={index} className={styles.LocationInfoWrapper}>
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
      <div className={styles.BottomSheetGrad} />
    </div>
  );
};

export default LocationsBottomSheet;
