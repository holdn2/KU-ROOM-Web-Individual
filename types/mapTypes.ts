// 건물 정보
export interface BuildingData {
  id: number;
  name: string;
  number: number;
  latitude: number;
  longitude: number;
}

// 카테고리 정보. 추후 BuildingCategory[]로 사용할듯
export interface CategoryPlaces {
  placeId: number;
  name: string;
  latitude: number;
  longitude: number;
  building: BuildingData;
}

// 마커에 필요한 정보
export interface MarkerData {
  category: string;
  name: string;
  latitude: number;
  longitude: number;
}
