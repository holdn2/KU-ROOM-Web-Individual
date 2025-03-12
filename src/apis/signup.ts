// 회원가입 관련 api
import axios from "axios";

const SIGNUP_API_BASE_URL = "https://kuroom.shop/api/v1/users";
const VALIDATION_ID_API_URL = "https://kuroom.shop/api/v1/users/validations";

export const signupApi = async (userData: {
  email: string;
  loginId: string;
  password: string;
  studentId: string;
  department: string;
  nickname: string;
  agreementStatus: string;
}) => {
  try {
    const response = await axios.post(SIGNUP_API_BASE_URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // 성공 응답 반환
  } catch (error: any) {
    console.error("회원가입 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "회원가입 중 오류 발생");
  }
};

// 아이디 중복확인
export const checkValidationIdApi = async (newId: string) => {
  try {
    const response = await axios.post(VALIDATION_ID_API_URL, newId, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("아이디 확인 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "아이디 확인 중 오류 발생"
    );
  }
};
