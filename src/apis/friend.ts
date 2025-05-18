// 친구 관련 api
import axiosInstance from "./axiosInstance"; // axiosInstance import

const GET_ALL_FRIENDS = "/friends/list";
const GET_RECEIVED_REQUESTS = "/friends/requests/received";

// 친구 목록 조회 api
interface GetAllFriendsResponse {
  code: number;
  status: string;
  message: string;
  data: { id: number; nickname: string; profileImg: string }[];
}

export const getAllFriends = async () => {
  try {
    const response =
      await axiosInstance.get<GetAllFriendsResponse>(GET_ALL_FRIENDS);
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error("단과대 조회 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "단과대 조회 중 오류 발생"
    );
  }
};

// 받은 요청 목록 조회 api
interface GetReceivedRequests {
  code: number;
  status: string;
  message: string;
  data: {
    requestId: number;
    fromUserId: number;
    fromUserNickname: string;
    imageUrl: string;
  }[];
}
export const getReceivedRequests = async () => {
  try {
    const response = await axiosInstance.get<GetReceivedRequests>(
      GET_RECEIVED_REQUESTS
    );
    console.log("받은 요청: ", response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error("단과대 조회 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "단과대 조회 중 오류 발생"
    );
  }
};
