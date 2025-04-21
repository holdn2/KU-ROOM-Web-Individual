import React, { useEffect, useRef, useState } from "react";
import styles from "./FocusedLocationBottomSheet.module.css";
import { dummyDetailInfo } from "../MapData";
import Button from "../../Button/Button";
import useBottomSheetDrag from "../../../hooks/useBottomSheetDrag";
import ShareLocationModal from "../ShareLocationModal/ShareLocationModal";
import LocationInfoTopContent from "./LocationInfoTopContent/LocationInfoTopContent";
import FocusedLocationInfo from "./FocusedLocationInfo/FocusedLocationInfo";

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

  const [modalState, setModalState] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);

  // 서버에 해당 장소 정보 요청
  useEffect(() => {
    setDetailInfo(dummyDetailInfo);
    // 위치 공유 상태도 받아야 함.
    // isSharedLocation()
  }, [focusedMarkerTitle]);
  // 바텀 시트 올리고 내리는 로직.
  useBottomSheetDrag({
    sheetRef,
    isExpanded: isExpandedFocusedSheet,
    setIsExpanded: setIsExpandedFocusedSheet,
    minHeight: 380,
  });

  // 서버에 위치 공유 상태 요청해야함.
  const handleShareLocation = () => {
    setModalState(true);
  };
  const handleUnShareLocation = () => {
    setIsSharedLocation(false);
  };

  return (
    <>
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
      <ShareLocationModal
        modalState={modalState}
        setModalState={setModalState}
        setIsSharedLocation={setIsSharedLocation}
      />
    </>
  );
};

export default FocusedLocationBottomSheet;
