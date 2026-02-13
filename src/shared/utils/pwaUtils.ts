// PWA 설치 상태 감지 유틸리티

export const isRunningAsPwa = (): boolean => {
  const isStandalone = window.matchMedia(
    "(display-mode: standalone)"
  ).matches;
  const isIosStandalone = (navigator as unknown as { standalone?: boolean })
    .standalone === true;
  return isStandalone || isIosStandalone;
};

export const isPwaGuideDismissed = (): boolean => {
  return localStorage.getItem("pwa-guide-dismissed") === "true";
};

export const dismissPwaGuide = (): void => {
  localStorage.setItem("pwa-guide-dismissed", "true");
};

export const shouldShowPwaGuide = (): boolean => {
  if (isRunningAsPwa()) return false;
  if (isPwaGuideDismissed()) return false;
  return true;
};
