import myMarkerIcon from "../../assets/map/mylocationMarker.svg";
import markerIcon from "../../assets/map/markerIcon.svg";
import focusedMarkerIcon from "../../assets/map/focusedMarker.png";

// 마커 렌더링 로직
interface MarkerData {
  lat: number;
  lng: number;
  title: string;
}

let renderedMarkers: naver.maps.Marker[] = []; // 전역 배열로 기존 마커 저장

export function renderMarkers(
  map: naver.maps.Map,
  markers: MarkerData[],
  setIsTracking: (value: boolean) => void
): void {
  // 기존 마커 제거
  renderedMarkers.forEach((marker) => marker.setMap(null));
  renderedMarkers = [];

  // 마커가 변경될 때마다 건대 중심을 center로 변경하고 줌도 16으로 되게 설정.
  const defaultCenter = new window.naver.maps.LatLng(37.5423, 127.0759);
  map.setCenter(defaultCenter);
  map.setZoom(16);
  setIsTracking(false);

  markers.forEach(({ lat, lng, title }) => {
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map,
      title,
      icon: {
        // 마커 아이콘 추가
        url: markerIcon,
      },
    });
    window.naver.maps.Event.addListener(marker, "click", () => {
      const position = marker.getPosition();
      map.setCenter(position); // 마커 클릭 시 지도 중심으로 이동
      map.setZoom(17); // 클릭 시 마커 중심으로 줌인
      setIsTracking(false);

      // 클릭한 마커만 아이콘 변경
      marker.setIcon({
        url: focusedMarkerIcon,
        size: new naver.maps.Size(80, 80),
      });

      // 이전 선택 마커 아이콘 초기화
      renderedMarkers.forEach((m) => {
        if (m !== marker) {
          m.setIcon({
            url: markerIcon,
          });
        }
      });
    });

    renderedMarkers.push(marker);
  });
}

// 현재 위치 정보 가져와서 마커 추가 및 watchPosition으로 따라가는 로직
export function myLocationTracking(
  map: naver.maps.Map,
  setCurrentLatLng: any,
  markerRef: React.MutableRefObject<any>,
  isTrackingRef: React.MutableRefObject<boolean>
) {
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const currentLocation = new window.naver.maps.LatLng(latitude, longitude);

      setCurrentLatLng(currentLocation); // 현재 위치 상태 업데이트

      if (markerRef.current) {
        // 기존 마커 위치 업데이트
        markerRef.current.setPosition(currentLocation);
      } else {
        // 최초 마커 생성
        markerRef.current = new window.naver.maps.Marker({
          position: currentLocation,
          map,
          title: "내 위치",
          icon: {
            // 내 위치 마커 아이콘 추가
            url: myMarkerIcon,
          },
        });
      }
      markerRef.current.setMap(map);

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
      maximumAge: 100, // 캐시 X
      timeout: 10000, // 타임아웃 5초
    }
  );

  // 언마운트 시 추적 종료
  return () => {
    navigator.geolocation.clearWatch(watchId);
  };
}

// 내 위치 추적 상태일 때 지도 조작 시 위치 추적 비활성화하는 로직
export function noTracking(
  map: naver.maps.Map,
  setIsTracking: (value: boolean) => void,
  isTrackingRef: React.MutableRefObject<boolean>
) {
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
