// 친구 관련 api
import axios from "axios";

const GET_ALL_FRIENDS = "https://kuroom.shop/api/v1/friends/list";
// 친구 목록 조회 api
interface GetAllFriendsResponse {
  code: number;
  status: string;
  message: string;
  data: { id: number; nickname: string; profileImg: string }[];
}
export const getAllFriends = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("AccessToken이 없습니다.");
  }
  try {
    const response = await axios.get<GetAllFriendsResponse>(GET_ALL_FRIENDS, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("단과대 조회 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "단과대 조회 중 오류 발생"
    );
  }
};
