// 회원가입 관련 api
import axios from "axios";

const API_BASE_URL = "http://43.202.65.121:8111/api/v1/users";

export const signupApi = async (userData: {
  email: string;
  loginId: string;
  password: string;
  studentId: string;
  department: string;
  nickname: string;
}) => {
  try {
    const response = await axios.post(API_BASE_URL, userData, {
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
