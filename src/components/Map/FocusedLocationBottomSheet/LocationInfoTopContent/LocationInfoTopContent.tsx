import React from "react";
import styles from "./LocationInfoTopContent.module.css";
import arrowBackIcon from "../../../../assets/nav/arrowBackWhite.svg";

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

interface LocationInfoTopContentProps {
  detailInfo: LocationDetailInfo | null;
  setIsExpandedFocusedSheet: (value: boolean) => void;
}

const LocationInfoTopContent: React.FC<LocationInfoTopContentProps> = ({
  detailInfo,
  setIsExpandedFocusedSheet,
}) => {
  return (
    <div className={styles.TopContentContainer}>
      <div className={styles.ImgGridContainer}>
        <img
          src={detailInfo?.imgs[0]}
          className={styles.MainImg}
          alt="대표 이미지"
        />
        <div className={styles.SubImgGrid}>
          {[1, 2, 3, 4].map((i, index) =>
            detailInfo?.imgs[i] ? (
              <img
                key={index}
                src={detailInfo.imgs[i]}
                className={styles.SubImg}
                alt={`서브 이미지 ${i}`}
              />
            ) : (
              <div key={index} />
            )
          )}
        </div>
      </div>
      <div className={styles.HeaderGrad} />
      <div className={styles.HeaderContainer}>
        <img
          src={arrowBackIcon}
          alt="내리기"
          onClick={() => setIsExpandedFocusedSheet(false)}
        />
      </div>
    </div>
  );
};

export default LocationInfoTopContent;
