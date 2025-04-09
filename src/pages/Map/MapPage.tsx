// 지도 페이지
import { useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./MapPage.module.css";
import Map from "../../components/Map/Map";

const MapPage = () => {
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태

  const buttonClassName = `${styles.TrackingButton} ${
    isTracking ? styles.TrackingButtonActive : ""
  }`;

  return (
    <div>
      {/* 위치 추적 버튼 예시 */}
      <button className={buttonClassName} onClick={() => setIsTracking(true)}>
        현재 위치 따라가기
      </button>
      <Map
        height="calc(100vh - 92px)"
        isTracking={isTracking}
        setIsTracking={setIsTracking}
      />
      <BottomBar />
    </div>
  );
};

export default MapPage;
