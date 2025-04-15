import Button from "../../Button/Button";
import styles from "./HomeMiniMap.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KuroomMap from "../../Map/KuroomMap";
import { isMyLocationInSchool } from "./HomeMiniMapUtils";

interface HomeMiniMapProps {
  isSharedLocation: boolean;
  setIsSharedLocation: (value: boolean) => void;
}

const HomeMiniMap: React.FC<HomeMiniMapProps> = ({
  isSharedLocation,
  setIsSharedLocation,
}) => {
  const navigate = useNavigate();
  const [isInSchool, setIsInSchool] = useState(false);

  // 현재 위치가 학교 내부 인지 검증
  useEffect(() => {
    isMyLocationInSchool(setIsInSchool);
  }, []);

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
    <>
      {isInSchool && (
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
              <KuroomMap
                height="180px"
                isTracking={true}
                draggable={false}
                zoomable={false}
              />
            </div>
            {isSharedLocation ? (
              <Button onClick={handleUnshareLocation}>
                위치 공유 해제하기
              </Button>
            ) : (
              <Button onClick={handleShareLocation}>내 위치 공유하기</Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeMiniMap;
