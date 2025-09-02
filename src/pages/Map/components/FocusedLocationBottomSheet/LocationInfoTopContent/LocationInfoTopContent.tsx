import React from "react";

import arrowBackIcon from "@assets/nav/arrowBackWhite.svg";

import styles from "./LocationInfoTopContent.module.css";
import { DetailPlaceData } from "@/shared/types";

interface LocationInfoTopContentProps {
  detailInfo: DetailPlaceData | null;
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
          src={detailInfo?.imageUrls[0]}
          className={styles.MainImg}
          alt="대표 이미지"
        />
        <div className={styles.SubImgGrid}>
          {[1, 2, 3, 4].map((i, index) =>
            detailInfo?.imageUrls[i] ? (
              <img
                key={index}
                src={detailInfo.imageUrls[i]}
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
