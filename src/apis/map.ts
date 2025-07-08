// 지도 관련 api
import {
  DetailPlaceData,
  PlaceDataWithFriend,
  SharedFriendData,
} from "../../types/mapTypes";
import axiosInstance from "./axiosInstance";

const CHECK_SHARE_STATE_API = "/places/sharing/status";
const GET_USER_SHARE_LOCATION = "/places/sharing";
const SHARE_USER_LOCATION = "/places/sharing/confirm";
const UNSHARE_LOCATION = "/places/sharing/confirm";
const GET_CATEGORY_LOCATION = "/map/chip/";
const GET_SHARED_FRIEND_LOCATION = "/map/chip/friends";
const GET_SEARCH_LOCATION_RESULT = "/map/search";
const GET_LOCATION_DETAIL_DATA = "/map?search/detail";
const GET_RECENT_SEARCH = "/map/search/term";
const DELETE_RECENT_SEARCH = "/map/search/term";

interface ApiResponse {
  code: number;
  status: string;
  message: string;
}

// 현재 위치 공유 상태인지 여부 api
interface IsSharedApiResponse extends ApiResponse {
  data: {
    isActive: boolean;
  };
}
export const checkIsSharedApi = async () => {
  try {
    const response = await axiosInstance.get<IsSharedApiResponse>(
      CHECK_SHARE_STATE_API
    );
    return response.data.data.isActive; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "위치 공유 상태 확인 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "위치 공유 상태 확인 중 오류 발생"
    );
  }
};

// 내 위치 공유 클릭 시 가장 가까운 건물명 받아오는 api
interface GetUserShareLocationApi extends ApiResponse {
  data: {
    placeName: string;
  };
}
export const getUserShareLocation = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axiosInstance.post<GetUserShareLocationApi>(
      GET_USER_SHARE_LOCATION,
      {
        latitude: latitude,
        longitude: longitude,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data.placeName; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "유저의 가장 가까운 건물명 조회 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "유저의 가장 가까운 건물명 조회 중 오류 발생"
    );
  }
};

// 위치 공유 시작 api
interface ShareUserLocationApi extends ApiResponse {
  data: {
    placeName: string;
  };
}
export const shareUserLocation = async (placeName: string) => {
  try {
    const response = await axiosInstance.post<ShareUserLocationApi>(
      SHARE_USER_LOCATION,
      {
        placeName: placeName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "유저의 위치 공유 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "유저의 위치 공유 중 오류 발생"
    );
  }
};

// 위치 공유 해제 api
export const unshareLocation = async () => {
  try {
    const response =
      await axiosInstance.delete<IsSharedApiResponse>(UNSHARE_LOCATION);
    return response.data.status; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "위치 공유 해제 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "위치 공유 해제 중 오류 발생"
    );
  }
};

// 카테고리 칩 클릭 시 위치 정보 받아오는 api
interface LocationCategoryApiResponse extends ApiResponse {
  data: PlaceDataWithFriend[];
}
export const getCategoryLocationsApi = async (category: string) => {
  try {
    const response = await axiosInstance.post<LocationCategoryApiResponse>(
      GET_CATEGORY_LOCATION + category,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "위치 카테고리 데이터 조회 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "위치 카테고리 데이터 조회 중 오류 발생"
    );
  }
};

// 친구 카테고리 칩 클릭 시 api. 공유한 친구 위치
interface FriendLocationCategory extends ApiResponse {
  data: SharedFriendData[];
}
export const getSharedFriendLocation = async () => {
  try {
    const response = await axiosInstance.post<FriendLocationCategory>(
      GET_SHARED_FRIEND_LOCATION,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "위치 공유한 친구 위치 조회 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "위치 공유한 친구 위치 조회 중 오류 발생"
    );
  }
};

// 위치 검색 시 결과 api. 타이틀만 반환
interface SearchResultApiResponse extends ApiResponse {
  data: {
    mainTitle: string;
  }[];
}
export const getSearchLocationResult = async (search: string) => {
  try {
    const response = await axiosInstance.post<SearchResultApiResponse>(
      GET_SEARCH_LOCATION_RESULT,
      { search: search },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "검색한 위치 조회 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "검색한 위치 조회 중 오류 발생"
    );
  }
};

// 최근 위치 검색어 가져오기 api
interface RecentSearchReponse extends ApiResponse {
  data: string[];
}
export const getRecentSearchLocation = async () => {
  try {
    const response =
      await axiosInstance.get<RecentSearchReponse>(GET_RECENT_SEARCH);
    return response.data.data;
  } catch (error: any) {
    console.error(
      "최근 검색어 조회 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "최근 검색어 조회 중 오류 발생"
    );
  }
};

// 최근 검색어 하나 삭제 api
export const deleteRecentSearchLocation = async (deleteData: string) => {
  try {
    const response = await axiosInstance.request({
      url: DELETE_RECENT_SEARCH,
      method: "DELETE",
      data: { term: deleteData },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "최근 검색어 삭제 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "최근 검색어 삭제 중 오류 발생"
    );
  }
};

// 하나의 위치에 대한 디테일 정보 조회 api
interface GetLocationDetailData extends ApiResponse {
  data: DetailPlaceData[];
}
export const getLocationDetailData = async (search: string) => {
  try {
    const response = await axiosInstance.post<GetLocationDetailData>(
      GET_LOCATION_DETAIL_DATA,
      { search: search },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data[0]; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "하나의 위치에 대한 디테일 정보 조회 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "하나의 위치에 대한 디테일 정보 조회 중 오류 발생"
    );
  }
};
