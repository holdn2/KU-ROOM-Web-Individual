import { useEffect, useRef, useState } from "react";

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
  onClick?: () => void;
}

interface MapProps {
  width?: string;
  height?: string;
  enableTracking?: boolean;
}

const asdf = ({
  width = "100%",
  height = "100%",
  enableTracking = true,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null); // 사용자 위치 마커
  const isTrackingRef = useRef(enableTracking);

  const [currentLatLng, setCurrentLatLng] = useState<any>(null);

  const [markers] = useState<MarkerData[]>([
    {
      lat: 37.5419,
      lng: 127.078,
      title: "제1학생회관",
      onClick: () => console.log("제1학생회관 정보"),
    },
    {
      lat: 37.5421,
      lng: 127.0739,
      title: "건국대학교 도서관",
      onClick: () => console.log("건국대학교 도서관 정보"),
    },
  ]);

  // ✅ 맵 생성은 단 한 번만
  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.5419, 127.078),
      zoom: 16,
    });
    mapInstance.current = map;

    // 마커 렌더링
    markers.forEach(({ lat, lng, title, onClick }) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        title,
      });

      if (onClick) {
        window.naver.maps.Event.addListener(marker, "click", onClick);
      }
    });

    // 위치 추적 시작
    if (enableTracking && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const current = new window.naver.maps.LatLng(latitude, longitude);
          setCurrentLatLng(current);

          if (markerRef.current) {
            markerRef.current.setPosition(current);
          } else {
            markerRef.current = new window.naver.maps.Marker({
              position: current,
              map,
              title: "내 위치",
            });
          }

          if (isTrackingRef.current) {
            map.setCenter(current);
          }
        },
        (err) => console.error("위치 에러", err),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []); // ✅ 반드시 빈 배열

  // ✅ enableTracking 반응 처리 (map은 다시 생성 X)
  useEffect(() => {
    isTrackingRef.current = enableTracking;
    if (enableTracking && currentLatLng && mapInstance.current) {
      mapInstance.current.setCenter(currentLatLng);
    }
  }, [enableTracking]);

  return (
    <div
      ref={mapRef}
      style={{
        width,
        height,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default asdf;
