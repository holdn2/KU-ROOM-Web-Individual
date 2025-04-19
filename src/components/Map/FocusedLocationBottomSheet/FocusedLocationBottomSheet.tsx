import React, { useEffect, useRef, useState } from "react";
import styles from "./FocusedLocationBottomSheet.module.css";
import { dummyDetailInfo } from "../MapData";
import Button from "../../Button/Button";
import useBottomSheetDrag from "../../../hooks/useBottomSheetDrag";

interface LocationDetailInfo {
  imgs: string[];
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
  // 위치 상세 정보 저장할 상태
  const [detailInfo, setDetailInfo] = useState<LocationDetailInfo | null>(null);
  const [isSharedLocation, setIsSharedLocation] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);

  // 서버에 해당 장소 정보 요청
  useEffect(() => {
    setDetailInfo(dummyDetailInfo);
    // 위치 공유 상태도 받아야 함.
    // isSharedLocation()
  }, [focusedMarkerTitle]);
  // 바텀 시트 올리고 내리는 로직. 좀 더 연구 필요할듯.
  useBottomSheetDrag({
    sheetRef,
    isExpanded: isExpandedFocusedSheet,
    setIsExpanded: setIsExpandedFocusedSheet,
    minHeight: 380,
  });

  const handleShareLocation = () => {
    setIsSharedLocation(true);
  };
  const handleUnShareLocation = () => {
    setIsSharedLocation(false);
  };

  return (
    <div
      className={`${styles.DetailInfoBottomSheetContainer} ${hasFocusedMarker ? styles.open : ""}`}
    >
      <div
        ref={sheetRef}
        className={`${styles.DetailInfoBottomSheet} ${
          isExpandedFocusedSheet ? styles.Expanded : ""
        }`}
        style={{
          transform: isExpandedFocusedSheet
            ? "translateY(0)"
            : "translateY(calc(100% - 380px))",
        }}
      >
        <div className={styles.SheetIndicator} />
        {detailInfo && (
          <div className={styles.DetailInfoWrapper}>
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
                        className={styles.FriendProfileImg}
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
        )}
        <div
          className={styles.ButtonContainer}
          style={
            isExpandedFocusedSheet ? { bottom: "40px" } : { bottom: "15px" }
          }
        >
          {isSharedLocation ? (
            <Button variant="quaternary" onClick={handleUnShareLocation}>
              내 위치 공유 중
            </Button>
          ) : (
            <Button onClick={handleShareLocation}>내 위치 공유</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusedLocationBottomSheet;
