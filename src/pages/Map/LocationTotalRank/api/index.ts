import axiosInstance from "@apis/axiosInstance";
import { ApiResponse } from "@/shared/types";
import {
  LocationTop3RankType,
  LocationTotalRankType,
} from "@/shared/types/rankTypes";
import { PAGE_SIZE } from "@pages/Map/LocationTotalRank/constant/page";

const LOCATION_RANK_URL = {
  TOP3: (placeId: number) => `/places/${placeId}/top`,
  TOTAL: (placeId: number) => `/places/${placeId}/ranks`,
  ME: (placeId: number) => `/places/${placeId}/ranks/me`,
};

interface LocationTop3RankResponse extends ApiResponse {
  data: LocationTop3RankType[];
}

// 위치별 top3  조회
export const getLocationTop3Rank = async (placeId: number) => {
  const response = await axiosInstance.get<LocationTop3RankResponse>(
    LOCATION_RANK_URL.TOP3(placeId)
  );

  console.log("top3 조회 시 응답 : ", response.data.data);

  return response.data.data;
};

export interface LocationTotalRankResponseData {
  ranks: LocationTotalRankType[];
  hasNext: boolean;
  nextCursor: string;
}
interface LocationTotalRankResponse extends ApiResponse {
  data: LocationTotalRankResponseData;
}

// 위치별 랭킹 조회 무한스크롤
export const getLocationTotalRank = async (
  placeId: number,
  lastKnown?: string
) => {
  const response = await axiosInstance.get<LocationTotalRankResponse>(
    LOCATION_RANK_URL.TOTAL(placeId),
    { params: { lastKnown, limit: PAGE_SIZE } }
  );
  console.log("나머지 전체 조회 시 응답 : ", response.data.data);

  return response.data.data;
};

interface LocationMyRankResponse extends ApiResponse {
  data: LocationTotalRankType;
}

// 위치별 내 랭킹 조회
export const getLocationMyRank = async (placeId: number) => {
  const response = await axiosInstance.get<LocationMyRankResponse>(
    LOCATION_RANK_URL.ME(placeId)
  );

  console.log("내 랭킹 조회 시 응답 : ", response.data.data);

  return response.data.data;
};
