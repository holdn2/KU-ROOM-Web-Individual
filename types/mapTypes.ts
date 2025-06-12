// 좌표
export interface Coordinate {
  latitude: number;
  longitude: number;
}

// 건물 정보
export interface BuildingData extends Coordinate {
  id: number;
  name: string;
  number: number;
}

// 카테고리 정보. 추후 BuildingCategory[]로 사용할듯
export interface CategoryPlaces extends Coordinate {
  placeId: number;
  name: string;

  building: BuildingData;
}

// 마커에 필요한 정보
export interface MarkerData extends Coordinate {
  category: string;
  name: string;
}

// 검색결과에 대한 정보
export interface MapSearchResult extends Coordinate {
  id: number;
  name: string;
}
