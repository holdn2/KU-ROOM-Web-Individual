// 닉네임 관련 api
import axios from "axios";

const CHECK_DUPLICATED_NICKNAME_API =
  "https://kuroom.shop/api/v1/users/check-nickname?value";

export const checkDuplictedNickname = async (newNickname: string) => {
  try {
    const response = await axios.get(
      `${CHECK_DUPLICATED_NICKNAME_API}=${newNickname}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error: any) {
    console.error("아이디 확인 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "아이디 확인 중 오류 발생"
    );
  }
};
