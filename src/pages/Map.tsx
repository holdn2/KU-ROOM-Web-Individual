// 지도 페이지
import { useEffect, useRef } from "react";
import BottomBar from "../components/BottomBar/BottomBar";

const Map = () => {
  const mapRef = useRef(null);

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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const userLocation = new window.naver.maps.LatLng(userLat, userLng);

          // 마커 추가
          new window.naver.maps.Marker({
            position: userLocation,
            map: map,
            title: "내 위치",
          });

          // 지도 중심을 내 위치로 이동
          // map.setCenter(userLocation);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);
        }
      );
    } else {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  }, []);
  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100vh",
        }}
      />
      <BottomBar />
    </div>
  );
};

export default Map;
