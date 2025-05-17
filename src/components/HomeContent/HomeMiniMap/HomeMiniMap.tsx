import Button from "../../Button/Button";
import styles from "./HomeMiniMap.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import KuroomMap from "../../Map/KuroomMap";

interface HomeMiniMapProps {
  isSharedLocation: boolean;
  setModalState: (value: boolean) => void;
}

const HomeMiniMap: React.FC<HomeMiniMapProps> = ({
  isSharedLocation,
  setModalState,
}) => {
  const navigate = useNavigate();

  const handleSeeMap = () => {
    navigate("/map");
  };
  const handleOpenModal = () => {
    setModalState(true);
    // 서버에 현재 위치 보내기, 공유 상태 보내기
  };

  return (
    // 내 위치 불러오기 전에 렌더링 안되게. 로딩 표시라도 추가

    isSharedLocation ? (
      <div className={styles.HomeMiniMapBackground}>
        <div className={styles.HomeMiniMapWrapper}>
          <div className={styles.MiniMapTextContainer}>
            <h1 className={styles.MiniMapBoldText}>
              현재 상허기념박물관에 계시네요!
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
          <Button onClick={handleOpenModal}>위치 공유 해제하기</Button>
        </div>
      </div>
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
          <Button onClick={handleOpenModal}>내 위치 공유하기</Button>
        </div>
      </div>
    )
  );
};

export default HomeMiniMap;
