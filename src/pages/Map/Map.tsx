// 지도 페이지
import { useEffect, useRef } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./Map.module.css";

const Map = () => {
  const mapRef = useRef(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!window.naver) return;

    const mapOptions = {
      // 건국대 청심대 기준 좌표
      center: new window.naver.maps.LatLng(37.5416, 127.077),
      zoom: 16,
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    // 브라우저 위치 정보 가져오기
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = new window.naver.maps.LatLng(
            latitude,
            longitude
          );

          if (markerRef.current) {
            // 기존 마커 위치 업데이트
            markerRef.current.setPosition(currentLocation);
          } else {
            // 최초 마커 생성
            markerRef.current = new window.naver.maps.Marker({
              position: currentLocation,
              map,
              title: "내 위치",
            });
          }

          // 지도 중심도 같이 이동
          map.setCenter(currentLocation);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);
        },
        {
          enableHighAccuracy: true, // 정확도 향상
          maximumAge: 0, // 캐시 X
          timeout: 5000, // 타임아웃 5초
        }
      );

      // 언마운트 시 추적 종료
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  }, []);
  return (
    <div>
      <div ref={mapRef} className={styles.MapContainer} />
      <BottomBar />
    </div>
  );
};

export default Map;
