// 좌표
export interface Coordinate {
  latitude: number;
  longitude: number;
}

// 검색결과에 대한 정보
export interface MapSearchResult {
  mainTitle: string;
}

// 위치 공유한 친구 정보
interface FriendData {
  nickname: string;
  profileURL: string;
}

// 장소 정보
interface PlaceData extends Coordinate {
  mainTitle: string;
  subTitle: string;
  text: string;
}

// 친구 칩 관련 정보
export interface SharedFriendData {
  nickname: string;
  place: PlaceData[];
}

// 위치 공유한 친구 정보 포함한 장소 정보
export interface PlaceDataWithFriend extends PlaceData {
  friendList: FriendData[];
}

// 디테일한 장소 정보.
export interface DetailPlaceData extends PlaceDataWithFriend {
  imageUrlList: string[];
}

// *************************************************** //

// // 건물 정보
// export interface BuildingData extends Coordinate {
//   id: number;
//   name: string;
//   number: number;
// }

// // 카테고리 정보. 추후 CategoryPlaces[]로 사용할듯
// export interface CategoryPlaces extends Coordinate {
//   placeId: number;
//   name: string;
//   building: BuildingData;
// }

// 마커에 필요한 정보
export interface MarkerData extends Coordinate {
  category: string;
  name: string;
}
