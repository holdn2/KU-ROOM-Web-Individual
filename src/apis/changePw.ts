// 비밀번호 변경 관련 api
import axios from "axios";

const CHANGE_PW_BEFORE_LOGIN_URL =
  "https://kuroom.shop/api/v1/users/password-reset/initiate";

// 로그인 전 비밀번호 변경 (아이디/비밀번호 찾기 시 사용)
interface ChangePwResponse {
  code: number;
  status: string;
  message: string;
  data: string;
}
export const changePwBeforeLogin = async (userInfo: {
  loginId: string;
  newPassword: string;
}) => {
  try {
    const response = await axios.post<ChangePwResponse>(
      CHANGE_PW_BEFORE_LOGIN_URL,
      userInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.data);
    return response.data.data; // 성공 응답 반환
  } catch (error: any) {
    console.error("비밀번호 변경 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "비밀번호 변경 중 오류 발생"
    );
  }
};
