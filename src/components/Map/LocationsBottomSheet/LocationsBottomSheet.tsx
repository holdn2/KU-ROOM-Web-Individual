import React, { useEffect, useState } from "react";
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
}

const LocationsBottomSheet: React.FC<LocationsBottomSheetProps> = ({
  mapSearchResult,
}) => {
  const [selectedLocationInfos, setSelectedLocationInfos] = useState<
    LocationInfo[]
  >([]);
  useEffect(() => {
    const match = dummyLocationInfo.find(
      (item) => item.category === mapSearchResult
    );

    if (match) {
      setSelectedLocationInfos(match.infos); // infos만 저장
    } else {
      setSelectedLocationInfos([]); // 매칭 없을 경우 빈 배열
    }
  }, [mapSearchResult]);
  return (
    <div className={styles.LocationInfoBottomSheetContainer}>
      <button className={styles.ListButton}>
        <img src={mapListIcon} alt="목록보기" />
        <span className={styles.ListButtonText}>목록보기</span>
      </button>
      <div className={styles.LocationInfoBottomSheet}>
        <div className={styles.SheetIndicator} />
        {selectedLocationInfos.map((info, index) => (
          <div key={index} className={styles.LocationInfoWrapper}>
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
          </div>
        ))}
      </div>
      <div className={styles.BottomSheetGrad} />
    </div>
  );
};

export default LocationsBottomSheet;
