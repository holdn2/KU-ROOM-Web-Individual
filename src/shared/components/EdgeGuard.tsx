import { useEffect } from "react";

export function EdgeGuard() {
  useEffect(() => {
    const guard = document.createElement("div");
    Object.assign(guard.style, {
      position: "fixed",
      left: "0",
      top: "0",
      bottom: "0",
      width: "24px", // 20~30px 권장
      zIndex: "2147483647",
      background: "transparent",
      pointerEvents: "auto",
      // 터치가 이 요소를 "실제로" 타겟팅하도록 보장
      touchAction: "none",
    } as CSSStyleDeclaration);
    document.body.appendChild(guard);

    const onTouchStart = (e: TouchEvent) => {
      // cancelable 한 경우에만 차단 가능
      if (e.cancelable && e.touches.length > 0 && e.touches[0].clientX < 24) {
        e.preventDefault();
      }
    };

    // 반드시 passive:false
    guard.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      guard.removeEventListener("touchstart", onTouchStart as any);
      document.body.removeChild(guard);
    };
  }, []);

  return null;
}
