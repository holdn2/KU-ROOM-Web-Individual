import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const isGAEnabled = Boolean(MEASUREMENT_ID);

// Google Analytics 초기화
export const initGA = () => {
  if (isGAEnabled) {
    ReactGA.initialize(MEASUREMENT_ID);
  }
};

// 페이지 뷰 추적
export const trackPageView = (path: string) => {
  if (!isGAEnabled) return;
  ReactGA.send({ hitType: "pageview", page: path });
};

// 이벤트 추적
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
) => {
  if (!isGAEnabled) return;
  ReactGA.event({
    category,
    action,
    label,
  });
};
