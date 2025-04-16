import myMarkerIcon from "../../assets/map/mylocationMarker.svg";

// 마커 렌더링 로직
interface MarkerData {
  lat: number;
  lng: number;
  title: string;
}
export function renderMarkers(
  map: naver.maps.Map,
  markers: MarkerData[],
  setIsTracking: (value: boolean) => void
): void {
  markers.forEach(({ lat, lng, title }) => {
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map,
      title,
    });
    window.naver.maps.Event.addListener(marker, "click", () => {
      const position = marker.getPosition();
      map.setCenter(position); // 마커 클릭 시 지도 중심으로 이동
      setIsTracking(false);
      console.log(marker.title, "클릭");
    });
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
            // 마커 아이콘 추가
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

// 검색 혹은 칩 선택 시 해당 위치로 이동하는 로직
export function moveToLocation(
  searchLocation: string,
  mapInstance: React.MutableRefObject<naver.maps.Map | null>,
  markers: MarkerData[],
  setIsTracking?: (value: boolean) => void,
  isTrackingRef?: React.MutableRefObject<boolean>
) {
  if (!searchLocation || !mapInstance.current) return;

  const target = markers.find((m) => m.title === searchLocation);
  if (target) {
    const targetLatLng = new window.naver.maps.LatLng(target.lat, target.lng);

    mapInstance.current?.setCenter(targetLatLng);

    if (setIsTracking && isTrackingRef) {
      setIsTracking(false);
      isTrackingRef.current = false;
    }

    console.log(`[검색] ${searchLocation} 위치로 지도 이동`);
  }
}
