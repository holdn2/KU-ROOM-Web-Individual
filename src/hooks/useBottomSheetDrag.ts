import { useEffect, useRef } from "react";

interface UseBottomSheetDragProps {
  sheetRef: React.RefObject<HTMLDivElement | null>;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  minHeight: number; // 예: 150, 380 등
}

export default function useBottomSheetDrag({
  sheetRef,
  isExpanded,
  setIsExpanded,
  minHeight,
}: UseBottomSheetDragProps) {
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const canDrag = useRef(false);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startY.current = e.touches[0].clientY;
      sheet.style.transition = "none";
      // 스크롤이 최상단일 때만 드래그 가능하도록
      canDrag.current = sheet.scrollTop === 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !canDrag.current) return;
      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;

      if (diff > 0) {
        const maxTranslate = window.innerHeight - minHeight;
        const limitedDiff = Math.min(diff, maxTranslate);
        sheet.style.transform = `translateY(${limitedDiff}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging.current || !canDrag.current) return;
      const diff = currentY.current - startY.current;
      sheet.style.transition = "transform 0.3s ease-in-out";

      // 클릭만 한 경우라면 아무 동작 하지 않게
      if (currentY.current === 0) {
        isDragging.current = false;
        startY.current = 0;
        return;
      }

      if (Math.abs(diff) < 10) {
        sheet.style.transform = isExpanded
          ? "translateY(0)"
          : `translateY(calc(100% - ${minHeight}px))`;
        isDragging.current = false;
        return;
      }

      if (diff > 80) {
        setIsExpanded(false);
        sheet.style.transform = `translateY(calc(100% - ${minHeight}px))`;
      } else if (diff < -80) {
        setIsExpanded(true);
        sheet.style.transform = "translateY(0)";
      } else {
        sheet.style.transform = isExpanded
          ? "translateY(0)"
          : `translateY(calc(100% - ${minHeight}px))`;
      }

      isDragging.current = false;
      startY.current = 0;
      currentY.current = 0;
    };

    sheet.addEventListener("touchstart", handleTouchStart);
    sheet.addEventListener("touchmove", handleTouchMove);
    sheet.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheet.removeEventListener("touchstart", handleTouchStart);
      sheet.removeEventListener("touchmove", handleTouchMove);
      sheet.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isExpanded, minHeight, setIsExpanded, sheetRef]);
}
