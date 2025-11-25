import { useEffect, useRef, useState } from "react";

import styles from "./HomeSlideBanner.module.css";
import { homeBannerList } from "@pages/Home/constant/banner-img";

const HomeSildeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentDeviceWidth = window.innerWidth > 600 ? 600 : window.innerWidth;

  const bannerWidth = 349;
  const getScrollLeft = (index: number) => {
    const sidePadding = (currentDeviceWidth - bannerWidth) / 2;
    return index * bannerWidth - sidePadding;
  };

  // 스크롤이 끝났을 때 가장 가까운 배너로 강제 고정되도록 수정.
  let scrollTimeout: ReturnType<typeof setTimeout>;

  const handleScroll = () => {
    if (!wrapperRef.current) return;

    const scrollLeft = wrapperRef.current.scrollLeft;
    const sidePadding = (currentDeviceWidth - bannerWidth) / 2;
    const adjustedScrollLeft = scrollLeft + sidePadding;
    const index = Math.round(adjustedScrollLeft / bannerWidth);

    // 스크롤 도중 계속 호출되지 않도록 delay 보정
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      handleBannerMove(index);
    }, 100);
  };

  const handleBannerMove = (index: number) => {
    if (!wrapperRef.current) return;

    wrapperRef.current.scrollTo({
      left: getScrollLeft(index),
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const handleToBannerLink = (bannerLink: string) => {
    if (!bannerLink) return;
    window.open(bannerLink, "_blank", "noopener,noreferrer");
  };

  // 3초 간격 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % homeBannerList.length;
      handleBannerMove(next);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={styles.HomeSlideBannerWrapper}>
      <div
        className={styles.BannerImgWrapper}
        ref={wrapperRef}
        onScroll={handleScroll}
      >
        {homeBannerList.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleToBannerLink(item.link)}
          >
            <img className={styles.BannerImg} src={item.img} alt={item.title} />
          </button>
        ))}
      </div>
      <div className={styles.DotsWrapper}>
        {homeBannerList.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={`${styles.DotIndicator} ${
              currentIndex === index ? styles.ActiveDot : ""
            }`}
            onClick={() => handleBannerMove(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSildeBanner;
