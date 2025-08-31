// 홈에서의 api
import axiosInstance from "./axiosInstance";
import { ApiResponse } from "@shared/types/apiResponse";
import { RankListType } from "../../types/rankTypes";

const GET_USER_SHARING_RANKING = "places/users/ranks";

interface SharingRankingResponse extends ApiResponse {
  data: RankListType[];
}
export const getSharingRanking = async () => {
  try {
    const response = await axiosInstance.get<SharingRankingResponse>(
      GET_USER_SHARING_RANKING
    );
    return response.data.data; // 성공 응답 반환
  } catch (error: any) {
    console.error(
      "내 장소 랭킹 조회 실패:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "내 장소 랭킹 조회 중 오류 발생"
    );
  }
};
