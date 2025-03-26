import styles from "./HomeSlideBanner.module.css";
import exBannerImg from "../../../assets/ExampleImg/slidebannerImg/exBanner1.svg";
import { useRef, useState } from "react";

const exampleImg = [
  {
    title: "EX1",
    img: exBannerImg,
  },
  {
    title: "EX2",
    img: exBannerImg,
  },
  {
    title: "EX3",
    img: exBannerImg,
  },
  {
    title: "EX4",
    img: exBannerImg,
  },
];

const HomeSildeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!wrapperRef.current) return;

    const scrollLeft = wrapperRef.current.scrollLeft;
    const bannerWidth = 349 + 11; // 이미지 너비 + gap
    const index = Math.round(scrollLeft / bannerWidth);
    setCurrentIndex(index);
  };

  const handleTouchToMove = (index: number) => {
    if (!wrapperRef.current) return;

    const bannerWidth = 349 + 11; // 이미지 너비 + gap
    wrapperRef.current.scrollTo({
      left: index * bannerWidth,
      behavior: "smooth", // 부드럽게 이동
    });

    setCurrentIndex(index);
  };

  return (
    <div className={styles.HomeSlideBannerWrapper}>
      <div
        className={styles.BannerImgWrapper}
        ref={wrapperRef}
        onScroll={handleScroll}
      >
        {exampleImg.map((item, index) => (
          <img
            key={index}
            className={styles.BannerImg}
            src={item.img}
            alt={item.title}
          />
        ))}
      </div>
      <div className={styles.DotsWrapper}>
        {exampleImg.map((_, index) => (
          <div
            key={index}
            className={`${styles.DotIndicator} ${
              currentIndex === index ? styles.ActiveDot : ""
            }`}
            onClick={() => handleTouchToMove(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSildeBanner;
