// 이메일 관련 api
import axios from "axios";

const VERIFY_MAIL_API_URL = "https://kuroom.shop/api/v1/mails/auth-codes";
const VERIFY_CODE_API_URL =
  "https://kuroom.shop/api/v1/mails/verification_codes";

// 이메일 전송 요청
export const sendEmailApi = async (email: { email: string }) => {
  try {
    const response = await axios.post(VERIFY_MAIL_API_URL, email, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // 성공 응답 반환
  } catch (error: any) {
    console.error("이메일 전송 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "이메일 전송 중 오류 발생"
    );
  }
};

// 이메일 인증 코드 검증
interface VerifyCodeResponse {
  code: number;
  status: string;
  message: string;
  data: {
    verified: boolean;
  };
}
export const verifyCodeApi = async (verifyData: {
  email: string;
  code: string;
}) => {
  try {
    const response = await axios.post<VerifyCodeResponse>(
      VERIFY_CODE_API_URL,
      verifyData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data.data.verified; // 성공 응답 반환
  } catch (error: any) {
    console.error("인증코드 검증 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "인증코드 검증 중 오류 발생"
    );
  }
};
