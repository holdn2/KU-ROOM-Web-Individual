import { useEffect, useRef, useState } from "react";
import myMarkerIcon from "../../assets/map/mylocationMarker.svg";

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
  onClick?: () => void;
}

interface MapProps {
  width?: string;
  height?: string;
  isTracking?: boolean;
  setIsTracking?: (value: boolean) => void;
  draggable?: boolean;
  zoomable?: boolean;
}

// React Strict Mode로 인해 두번 마운트 되어서 하단 왼쪽 로고 두개로 보이는데
// 배포 시에는 안 그러니 걱정 안해도됨

const rotateImage = (url: string, angle: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const size = Math.max(image.width, image.height);
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");

      ctx.clearRect(0, 0, size, size);
      ctx.translate(size / 2, size / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);

      resolve(canvas.toDataURL());
    };
    image.onerror = () => reject("Image load error");
  });
};

const Map = ({
  width = "100%",
  height = "100%",
  isTracking = true,
  setIsTracking,
  draggable = true,
  zoomable = true,
}: MapProps) => {
  const mapRef = useRef(null);
  const markerRef = useRef<any>(null);
  const mapInstance = useRef<any>(null); // 지도 객체를 저장할 ref
  const [currentLatLng, setCurrentLatLng] = useState<any>(null); // 현재 위치를 기억
  const isTrackingRef = useRef(true); // 추적 상태 최신값을 유지할 ref
  const [deviceRotation, setDeviceRotation] = useState<number | null>(null);

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

  useEffect(() => {
    if (!window.naver) return;

    const mapOptions = {
      zoom: 17,
      draggable: draggable,
      scrollWheel: zoomable,
      pinchZoom: zoomable,
      disableDoubleTapZoom: !zoomable,
      disableDoubleClickZoom: !zoomable,
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);
    mapInstance.current = map; // 지도 인스턴스를 ref에 저장

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

    if (setIsTracking) {
      const disableTracking = () => {
        setIsTracking(false);
        isTrackingRef.current = false;
      };

      // 드래그
      window.naver.maps.Event.addListener(map, "drag", disableTracking);

      // 줌 변경 (줌 버튼, 휠, 핀치 줌 포함)
      window.naver.maps.Event.addListener(map, "zoom_changed", disableTracking);

      // 더블 클릭 줌
      window.naver.maps.Event.addListener(map, "dblclick", disableTracking);

      // 마우스 휠
      window.naver.maps.Event.addListener(map, "wheel", disableTracking);
    }

    // 현재 위치 정보 가져와서 마커 추가 및 watchPosition으로 따라가기
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = new window.naver.maps.LatLng(
            latitude,
            longitude
          );

          setCurrentLatLng(currentLocation); // 현재 위치 상태 업데이트

          // 내 위치 마커
          rotateImage(myMarkerIcon, deviceRotation ?? 0).then(
            (rotatedIconUrl) => {
              if (markerRef.current) {
                markerRef.current.setPosition(currentLocation);
                markerRef.current.setIcon({
                  url: rotatedIconUrl,
                  anchor: new window.naver.maps.Point(16, 16),
                  size: new window.naver.maps.Size(32, 32),
                  scaledSize: new window.naver.maps.Size(32, 32),
                });
              } else {
                markerRef.current = new window.naver.maps.Marker({
                  position: currentLocation,
                  map,
                  title: "내 위치",
                  icon: {
                    url: rotatedIconUrl,
                    anchor: new window.naver.maps.Point(16, 16),
                    size: new window.naver.maps.Size(32, 32),
                    scaledSize: new window.naver.maps.Size(32, 32),
                  },
                });
              }
            }
          );

          if (isTrackingRef.current) {
            // 지도 중심을 내 위치를 기준으로 이동
            map.setCenter(currentLocation);
          }
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);

          if (error.code === 1) {
            alert("위치 권한이 거부되었습니다.");
          } else if (error.code === 2) {
            alert("위치 정보를 사용할 수 없습니다.");
          } else if (error.code === 3) {
            alert("위치 정보를 가져오는 데 시간이 초과되었습니다.");
          }
        },
        {
          enableHighAccuracy: true, // 정확도 향상
          maximumAge: 0, // 캐시 X
          timeout: 5000, // 타임아웃 5초
        }
      );

      // 디바이스 방향 감지
      let rotateTimeout: ReturnType<typeof setTimeout> | null = null;

      const handleOrientation = (event: DeviceOrientationEvent) => {
        // 성능 이슈를 방지하기 위해 0.3초 딜레이를 부여
        if (event.alpha !== null) {
          if (rotateTimeout) return;
          rotateTimeout = setTimeout(() => {
            setDeviceRotation(event.alpha!);
            rotateTimeout = null;
          }, 300);
        }
      };
      window.addEventListener("deviceorientation", handleOrientation, true);

      // 언마운트 시 추적 종료
      return () => {
        navigator.geolocation.clearWatch(watchId);
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    } else {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  }, [deviceRotation]);

  // 추적 모드 활성화 시 현재 위치 중심으로 지도 이동
  useEffect(() => {
    if (isTracking && currentLatLng && mapInstance.current) {
      mapInstance.current.setCenter(currentLatLng);
    }
  }, [isTracking]);

  useEffect(() => {
    isTrackingRef.current = isTracking;
  }, [isTracking]);

  return <div ref={mapRef} style={{ width, height, overflow: "hidden" }} />;
};

export default Map;
