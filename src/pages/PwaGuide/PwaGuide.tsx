import cloudLogo from "@assets/pwa-guide/logo.svg";

import GuideCard from "./components/GuideCard";
import { GUIDE_DATA } from "./constant/guideData";
import { usePwaGuide } from "./hooks/usePwaGuide";
import "./PwaGuide.css";

const PwaGuide = () => {
  const { handleDismiss } = usePwaGuide();

  return (
    <div className="pwa-guide-page">
      <div className="pwa-guide-header">
        <img src={cloudLogo} alt="쿠룸 로고" className="pwa-guide-logo" />
        <h1 className="pwa-guide-title">
          홈 화면에 쿠룸을 추가하고
          <br />
          이용해주세요!
        </h1>
        <p className="pwa-guide-subtitle">
          설치 환경에 따른 방법을 안내드려요.
        </p>
      </div>

      {GUIDE_DATA.map((guide) => (
        <GuideCard key={guide.title} {...guide} />
      ))}

      <div className="pwa-guide-bottom">
        <span className="pwa-guide-dismiss-text" onClick={handleDismiss}>
          이미 설치했어요
        </span>
      </div>
    </div>
  );
};

export default PwaGuide;
