import Button from "../../Button/Button";
import styles from "./HomeMiniMap.module.css";
import React, { useEffect, useState } from "react";
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
  const [isInSchool, setIsInSchool] = useState(false);

  // 건국대 범위 사각형으로 지정
  // const schoolRange = [
  //   [127.070767, 37.540034],
  //   [127.0742, 37.5472],
  //   [127.083, 37.5451],
  //   [127.0819, 37.537],
  // ];

  // 연습용 범위
  const schoolRange = [
    [127.1037, 37.6159],
    [127.1053, 37.6213],
    [127.1094, 37.62],
    [127.1075, 37.6144],
  ];

  // 각 좌표 안쪽에 있는지 검증하는 로직
  const isPointInSchool = (
    userLng: number,
    userLat: number,
    schoolRange: number[][]
  ) => {
    let inside = false;
    for (
      let i = 0, j = schoolRange.length - 1;
      i < schoolRange.length;
      j = i++
    ) {
      const xi = schoolRange[i][0],
        yi = schoolRange[i][1];
      const xj = schoolRange[j][0],
        yj = schoolRange[j][1];

      const intersect =
        yi > userLat !== yj > userLat &&
        userLng < ((xj - xi) * (userLat - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }
    return inside;
  };

  // 현재 위치가 학교 내부 인지 검증
  useEffect(() => {
    if (!navigator.geolocation) return;

    // watchPosition으로 이동할 때마다 검증
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const inside = isPointInSchool(userLng, userLat, schoolRange);
        setIsInSchool(inside); // 밖으로 나가면 false 처리됨
      },
      (err) => {
        console.warn("위치 정보를 가져올 수 없습니다.", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // 컴포넌트 unmount 시 정리
    };
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
              <Map
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
