import React, { useEffect, useRef, useState } from "react";
import styles from "./FocusedLocationBottomSheet.module.css";
import { dummyDetailInfo } from "../MapData";

interface LocationDetailInfo {
  title: string;
  subtit: string;
  friends: {
    nickname: string;
    profileImg: string;
  }[];
  info: string;
}
interface FocusedLocationBottomSheetProps {
  hasFocusedMarker: boolean;
  isExpandedFocusedSheet: boolean;
  setIsExpandedFocusedSheet: (value: boolean) => void;
  focusedMarkerTitle: string | null;
}

const FocusedLocationBottomSheet: React.FC<FocusedLocationBottomSheetProps> = ({
  hasFocusedMarker,
  isExpandedFocusedSheet,
  setIsExpandedFocusedSheet,
  focusedMarkerTitle,
}) => {
  const [detailInfo, setDetailInfo] = useState<LocationDetailInfo | null>(null);

  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const canDragToClose = useRef(true);

  // 서버에 해당 장소 정보 요청
  useEffect(() => {
    setDetailInfo(dummyDetailInfo);
  }, [focusedMarkerTitle]);
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
        sheet.style.transform = isExpandedFocusedSheet
          ? "translateY(0)"
          : "translateY(calc(100% - 150px))";
        isDragging.current = false;
        return;
      }
      if (diff > 60 && canDragToClose.current) {
        // 닫기
        setIsExpandedFocusedSheet(false);
        sheet.style.transform = "translateY(calc(100% - 150px))";
      } else {
        // 열기
        setIsExpandedFocusedSheet(true);
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
  }, [isExpandedFocusedSheet]);

  return (
    detailInfo && (
      <div
        className={`${styles.LocationInfoBottomSheetContainer} ${hasFocusedMarker ? styles.open : ""}`}
      >
        <div
          ref={sheetRef}
          className={`${styles.LocationInfoBottomSheet} ${
            isExpandedFocusedSheet ? styles.Expanded : ""
          }`}
          style={{
            transform: isExpandedFocusedSheet
              ? "translateY(0)"
              : "translateY(calc(100% - 150px))",
          }}
        >
          <div className={styles.SheetIndicator} />
          <div className={styles.LocationInfoWrapper}>
            <div className={styles.TitleWrapper}>
              <span
                className={styles.TitleText}
                onClick={() => setIsExpandedFocusedSheet(true)}
              >
                {detailInfo.title}
              </span>
              <span className={styles.SubTitleText}>{detailInfo.subtit}</span>
            </div>
            <div className={styles.ContentWrapper}>
              {detailInfo.friends.length !== 0 && (
                <div className={styles.FriendWrapper}>
                  <span className={styles.FriendTitle}>친구</span>
                  <div className={styles.FriendContainer}>
                    {detailInfo.friends.map((friend, index) => (
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
                <span className={styles.InfoContent}>{detailInfo.info}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FocusedLocationBottomSheet;
