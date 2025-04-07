// 지도 페이지
import { useEffect, useRef, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./Map.module.css";

const Map = () => {
  const mapRef = useRef(null);
  const markerRef = useRef<any>(null);
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태

  useEffect(() => {
    if (!window.naver) return;

    const firstStudentCenter = new window.naver.maps.LatLng(37.5419, 127.078);

    const mapOptions = {
      // 건국대 제1학생회관 기준 좌표
      center: new window.naver.maps.LatLng(firstStudentCenter),
      zoom: 16,
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    // 제1학생회관 마커 추가
    const firstStudentCenterMarker = new window.naver.maps.Marker({
      position: firstStudentCenter,
      map,
      title: "제1학생회관",
    });

    // 마커 클릭 이벤트. 학생회관 눌렀을 때 로직 수행
    window.naver.maps.Event.addListener(
      firstStudentCenterMarker,
      "click",
      () => {
        console.log("제1학생회관 정보");
      }
    );

    // 지도 드래그 시 추적 끄기
    window.naver.maps.Event.addListener(map, "dragstart", () => {
      setIsTracking(false);
    });

    // 현재 위치 정보 가져와서 마커 추가 및 watchPosition으로 따라가기
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

          if (isTracking) {
            // 지도 중심을 내 위치를 기준으로 이동
            map.setCenter(currentLocation);
          }
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
      {/* 위치 추적 버튼 예시 */}
      <button
        onClick={() => setIsTracking(true)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "8px 12px",
          backgroundColor: "#2e8b57",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        현재 위치 따라가기
      </button>

      <div ref={mapRef} className={styles.MapContainer} />
      <BottomBar />
    </div>
  );
};

export default Map;
