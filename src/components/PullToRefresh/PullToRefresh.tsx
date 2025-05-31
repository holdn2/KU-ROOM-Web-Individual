import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Default } from "react-spinners-css";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => void;
  maxDistance: number;
}

const PullToRefresh = ({
  children,
  onRefresh,
  maxDistance,
}: PullToRefreshProps) => {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 대상 ref

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [pulled, setPulled] = useState(false);

  useEffect(() => {
    const touchMoveListener = (e: TouchEvent) => {
      if (isTouch && pulled) {
        onMove(e.touches[0].clientY);
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", touchMoveListener, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", touchMoveListener);
    };
  }, [isTouch, pulled]);

  const resetToInitial = () => {
    if (spinnerRef.current) {
      spinnerRef.current.style.height = "0";
      spinnerRef.current.style.willChange = "unset";
    }
    setPulled(false);
    setIsRefreshing(false);
  };

  const onStart = (y: number, touch: boolean) => {
    setStartY(y);
    setIsTouch(touch);
    setPulled(true);
    if (spinnerRef.current) {
      spinnerRef.current.style.willChange = "height";
    }
  };

  const onMove = (y: number) => {
    const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
    if (scrollTop > 0) {
      resetToInitial();
      return;
    }

    if (pulled && spinnerRef.current) {
      const pulledDistance = Math.min(Math.pow(y - startY, 0.875), maxDistance);

      if (pulledDistance > 0) {
        spinnerRef.current.style.height = `${pulledDistance}px`;
        preventBodyScroll();

        if (pulledDistance >= maxDistance) {
          setIsRefreshing(true);
        } else {
          setIsRefreshing(false);
        }
      } else {
        ableBodyScroll();
        resetToInitial();
      }
    }
  };

  const handleEnd = () => {
    if (isTouch && pulled) {
      onEnd();
    }
  };

  const onEnd = async () => {
    if (pulled) {
      ableBodyScroll();
      if (isRefreshing) {
        try {
          await onRefresh();
          await new Promise((resolve) => setTimeout(resolve, 500));
          resetToInitial();
        } catch (error) {
          console.error("Error while refreshing:", error);
        }
      } else {
        resetToInitial();
      }
    }
  };

  const ableBodyScroll = () => {
    document.body.style.overflow = "auto";
  };

  const preventBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
    if (scrollTop > 0) return;
    onStart(e.touches[0].clientY, true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
    if (scrollTop > 0) return;
    onStart(e.clientY, false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTouch && pulled) {
      onMove(e.clientY);
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    if (!isTouch) {
      onEnd();
    }
  };

  return (
    <div style={{ marginTop: "56px" }}>
      <div ref={spinnerRef}>
        {isRefreshing && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80px",
              background: "rgba(227, 231, 235, 0.3)",
            }}
          >
            <Default color="#009733" size={50} />
          </div>
        )}
      </div>
      <div
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleEnd}
        style={{
          cursor: "pointer",
          overflowY: "auto",
          maxHeight: "calc(100vh - 150px)", // 헤더와 바텀바 제외한 높이
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
