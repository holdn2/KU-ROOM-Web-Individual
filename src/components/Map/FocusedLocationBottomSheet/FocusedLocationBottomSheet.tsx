import React, { useEffect, useRef, useState } from "react";
import styles from "./FocusedLocationBottomSheet.module.css";
import { dummyDetailInfo } from "../MapData";
import useBottomSheetDrag from "../../../hooks/useBottomSheetDrag";
import LocationInfoTopContent from "./LocationInfoTopContent/LocationInfoTopContent";
import FocusedLocationInfo from "./FocusedLocationInfo/FocusedLocationInfo";
import { BeatLoader } from "react-spinners";

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
  const sheetRef = useRef<HTMLDivElement>(null);

  // 아직 해당 장소 정보가 안 왔을 때 로딩처리
  const [isLoading, setIsLoading] = useState(true);

  // 서버에 해당 장소 정보 요청
  useEffect(() => {
    setDetailInfo(dummyDetailInfo);
    // 여기에 실제 API 로딩 or 이미지 로딩 조건으로 변경해야함.
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [focusedMarkerTitle]);

  // 바텀 시트 올리고 내리는 로직.
  useBottomSheetDrag({
    sheetRef,
    isExpanded: isExpandedFocusedSheet,
    setIsExpanded: setIsExpandedFocusedSheet,
    minHeight: 450,
  });

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
            : "translateY(calc(100% - 450px))",
        }}
      >
        <div className={styles.SheetIndicator} />
        {isLoading ? (
          <div className={styles.MyPageLoadingWrapper}>
            <BeatLoader color="#009733" size={18} margin={4} />
          </div>
        ) : (
          <>
            {isExpandedFocusedSheet && (
              <LocationInfoTopContent
                detailInfo={detailInfo}
                setIsExpandedFocusedSheet={setIsExpandedFocusedSheet}
              />
            )}
            <FocusedLocationInfo
              detailInfo={detailInfo}
              isExpandedFocusedSheet={isExpandedFocusedSheet}
              setIsExpandedFocusedSheet={setIsExpandedFocusedSheet}
            />
            {!isExpandedFocusedSheet && (
              <div className={styles.SheetImgContainer}>
                {/* 최대 3개까지만 보이도록 */}
                {detailInfo?.imgs
                  .slice(0, 3)
                  .map((item, index) => (
                    <img
                      className={styles.SheetImg}
                      key={index}
                      src={item}
                      alt="위치 관련 이미지"
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FocusedLocationBottomSheet;
