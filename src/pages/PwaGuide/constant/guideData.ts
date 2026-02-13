import dotsIcon from "@assets/pwa-guide/dots.svg";
import shareIcon from "@assets/pwa-guide/share.svg";
import plusIcon from "@assets/pwa-guide/plus.svg";
import safariScreenshot from "@assets/pwa-guide/section1_1.svg";
import safariMenu from "@assets/pwa-guide/section1_2.svg";
import chromeScreenshot from "@assets/pwa-guide/section2_1.svg";
import chromeMenu from "@assets/pwa-guide/section2_2.svg";

import type { GuideCardData } from "../types";

export const GUIDE_DATA: GuideCardData[] = [
  {
    title: "Safari를 이용하시는 경우",
    screenshots: { left: safariScreenshot, right: safariMenu, alt: "Safari" },
    positionLabel: "하단",
    steps: [
      { icon: dotsIcon, isCircle: true },
      { icon: shareIcon, label: "공유" },
      { icon: plusIcon, label: "홈 화면에 추가" },
    ],
  },
  {
    title: "Chrome을 이용하시는 경우",
    screenshots: { left: chromeScreenshot, right: chromeMenu, alt: "Chrome" },
    positionLabel: "상단",
    steps: [
      { icon: shareIcon, label: "공유" },
      { icon: plusIcon, label: "홈 화면에 추가" },
    ],
  },
];
