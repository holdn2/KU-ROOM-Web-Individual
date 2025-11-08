import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/Button/Button";
import KuroomMap from "@pages/Map/components/KuroomMap";
import { Coordinate } from "@/shared/types";

import styles from "./HomeMiniMap.module.css";

interface HomeMiniMapProps {
  isSharedLocation: boolean;
  setModalState: (value: boolean) => void;
  currentLocation: Coordinate;
  sharedLocationName: string | null;
  setNearLocation: (value: string) => void;
  setAbleToShare: (value: boolean) => void;
}

const HomeMiniMap: React.FC<HomeMiniMapProps> = ({
  isSharedLocation,
  setModalState,
  sharedLocationName,
}) => {
  const navigate = useNavigate();

  const handleSeeMap = () => {
    navigate("/map");
  };
  const handleToShareLocationPage = () => {
    navigate("/share-location");
  };

  const handleUnshareLocation = () => {
    setModalState(true);
  };

  return isSharedLocation ? (
    sharedLocationName !== null && (
      <div className={styles.HomeMiniMapBackground}>
        <div className={styles.HomeMiniMapWrapper}>
          <div className={styles.MiniMapTextContainer}>
            <h1 className={styles.MiniMapBoldText}>
              현재 {sharedLocationName}(으)로 공유 중입니다!
            </h1>
            <span className={styles.MiniMapNormalText}>
              장소를 이동할 땐 위치 공유를 해제해주세요 :)
            </span>
          </div>
          <div className={styles.HomeMiniMap} onClick={handleSeeMap}>
            <KuroomMap
              height="180px"
              isTracking={true}
              draggable={false}
              zoomable={false}
            />
          </div>
          <Button onClick={handleUnshareLocation}>위치 공유 해제하기</Button>
        </div>
      </div>
    )
  ) : (
    <div className={styles.HomeMiniMapBackground}>
      <div className={styles.HomeMiniMapWrapper}>
        <div className={styles.MiniMapTextContainer}>
          <h1 className={styles.MiniMapBoldText}>
            현재 건국대학교에 계신가요?
          </h1>
          <span className={styles.MiniMapNormalText}>
            내 위치를 친구들에게 공유해보세요!
          </span>
        </div>
        <div className={styles.HomeMiniMap} onClick={handleSeeMap}>
          <KuroomMap
            height="180px"
            isTracking={true}
            draggable={false}
            zoomable={false}
          />
        </div>
        <Button onClick={handleToShareLocationPage}>내 위치 공유하기</Button>
      </div>
    </div>
  );
};

export default HomeMiniMap;
