import Button from "../../Button/Button";
import styles from "./HomeMiniMap.module.css";
import React from "react";
import Map from "../../Map/Map";
import { useNavigate } from "react-router-dom";

interface HomeMiniMapProps {
  isSharedLocation: boolean;
  setIsSharedLocation: (value: boolean) => void;
}

const HomeMiniMap: React.FC<HomeMiniMapProps> = ({
  isSharedLocation,
  setIsSharedLocation,
}) => {
  const navigate = useNavigate();
  const handleSeeMap = () => {
    navigate("/map");
  };
  const handleShareLocation = () => {
    console.log("내 위치 공유하기");
    setIsSharedLocation(true);
  };
  const handleUnshareLocation = () => {
    console.log("위치 공유 해제하기");
    setIsSharedLocation(false);
  };
  return (
    <div className={styles.HomeMiniMapBackground}>
      <div className={styles.HomeMiniMapWrapper}>
        <div className={styles.MiniMapTextContainer}>
          <h1 className={styles.MiniMapBoldText}>
            현재 상허기념도서관에 계신가요?
          </h1>
          <span className={styles.MiniMapNormalText}>
            내 위치를 친구들에게 공유해보세요!
          </span>
        </div>
        <div className={styles.HomeMiniMap} onClick={handleSeeMap}>
          <Map
            height="180px"
            isTracking={true}
            draggable={false}
            zoomable={false}
          />
        </div>
        {isSharedLocation ? (
          <Button onClick={handleUnshareLocation}>위치 공유 해제하기</Button>
        ) : (
          <Button onClick={handleShareLocation}>내 위치 공유하기</Button>
        )}
      </div>
    </div>
  );
};

export default HomeMiniMap;
