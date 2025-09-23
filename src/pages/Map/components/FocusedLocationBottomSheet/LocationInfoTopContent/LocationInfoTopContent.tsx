import React from "react";

import arrowBackIcon from "@assets/nav/arrowBackWhite.svg";

import styles from "./LocationInfoTopContent.module.css";

interface LocationInfoTopContentProps {
  locationImages: string[] | undefined;
  setIsExpandedFocusedSheet: (value: boolean) => void;
  handleSelectImageIndex: (index: number) => void;
}

const LocationInfoTopContent: React.FC<LocationInfoTopContentProps> = ({
  locationImages,
  setIsExpandedFocusedSheet,
  handleSelectImageIndex,
}) => {
  const handleSelectMainImage = () => {
    handleSelectImageIndex(0);
  };
  const renderImageComponent = () => {
    if (locationImages === undefined) return;
    const imageCount = locationImages.length;
    switch (imageCount) {
      case 1:
        return (
          <img
            className={styles.OneImgContainer}
            src={locationImages[0]}
            alt="대표 이미지"
            onClick={handleSelectMainImage}
          />
        );
      case 2:
        return (
          <div className={styles.TwoImgsContainer}>
            {locationImages.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => handleSelectImageIndex(index)}
              />
            ))}
          </div>
        );
      default:
        return (
          <div className={styles.ImgGridContainer}>
            <img
              src={locationImages[0]}
              className={styles.MainImg}
              alt="대표 이미지"
              onClick={handleSelectMainImage}
            />
            <div className={styles.SubImgGrid}>
              {[1, 2, 3, 4].map((i, index) =>
                locationImages[i] ? (
                  <img
                    key={index}
                    src={locationImages[i]}
                    className={styles.SubImg}
                    alt={`서브 이미지 ${i}`}
                    onClick={() => handleSelectImageIndex(i)}
                  />
                ) : (
                  <div key={index} onClick={handleSelectMainImage} />
                )
              )}
            </div>
          </div>
        );
    }
  };

  return (
    locationImages && (
      <div className={styles.TopContentContainer}>
        <div className={styles.ImgContainer}>
          {locationImages.length > 0 && renderImageComponent()}
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
    )
  );
};

export default LocationInfoTopContent;
