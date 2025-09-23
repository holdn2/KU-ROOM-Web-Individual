import { useState } from "react";

import ArrowBackIcon from "@assets/nav/arrowBackWhite.svg";
import ImagePrev from "@assets/nav/image-prev-button.svg";
import ImageNext from "@assets/nav/image-next-button.svg";

import styles from "./ImageDetails.module.css";

interface ImageDetailsProps {
  clickedIndex?: number;
  imageUrls: string[];
  handleCloseImageDetail: () => void;
}

export default function ImageDetails({
  clickedIndex = 0,
  imageUrls,
  handleCloseImageDetail,
}: ImageDetailsProps) {
  const [currentIndex, setCurrentIndex] = useState(clickedIndex);

  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className={styles.ImageDetailsPage}>
      <header className={styles.Header}>
        <img
          src={ArrowBackIcon}
          alt="내리기"
          onClick={handleCloseImageDetail}
        />
        <span className={styles.StepIndicator}>
          {currentIndex + 1} / {imageUrls.length}
        </span>
      </header>
      <div className={styles.ImageWrapper}>
        {currentIndex !== 0 && (
          <img
            className={styles.PrevButton}
            src={ImagePrev}
            onClick={handlePrev}
          />
        )}
        <div
          className={styles.Slider}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {imageUrls.map((img, idx) => (
            <img
              key={`${img}-${idx}`}
              className={styles.Image}
              src={img}
              alt={`상세 이미지 ${idx + 1}`}
            />
          ))}
        </div>
        {currentIndex + 1 !== imageUrls.length && (
          <img
            className={styles.NextButton}
            src={ImageNext}
            onClick={handleNext}
          />
        )}
      </div>
    </div>
  );
}
