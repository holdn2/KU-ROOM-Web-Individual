// 닉네임 관련 api
import axios from "axios";

const CHECK_DUPLICATED_NICKNAME_API =
  "https://kuroom.shop/api/v1/users/check-nickname?value";
const CHANGE_NICKNAME_API = "https://kuroom.shop/api/v1/users/nickname";

interface CheckNicknameResponse {
  code: number;
  status: string;
  message: string;
  data?: string;
}

export const checkDuplictedNickname = async (
  newNickname: string,
  setErrorMsg: (value: string) => void
) => {
  try {
    const response = await axios.get<CheckNicknameResponse>(
      `${CHECK_DUPLICATED_NICKNAME_API}=${newNickname}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.data);
    return response.data.message;
  } catch (error: any) {
    console.error("닉네임 확인 실패:", error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.message || "닉네임 확인 중 오류 발생";
    setErrorMsg(errorMessage);
    throw new Error(
      error.response?.data?.message || "닉네임 확인 중 오류 발생"
    );
  }
};

// 닉네임 변경 api
export const changeNicknameApi = async (changeNickname: {
  nickname: string;
}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const response = await axios.patch(CHANGE_NICKNAME_API, changeNickname, {
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("닉네임 변경 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "닉네임 변경 중 오류 발생"
    );
  }
};
