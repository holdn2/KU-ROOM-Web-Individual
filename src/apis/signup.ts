// 회원가입 관련 api
import axios from "axios";

const SIGNUP_API_BASE_URL = "https://kuroom.shop/api/v1/users";
const VALIDATION_ID_API_URL = "https://kuroom.shop/api/v1/users/check-id?value";
const VALIDATION_EMAIL_API_URL = "https://kuroom.shop/api/v1/users/validations";

interface SignUpResponse {
  code: number;
  status: string;
  message: string;
}
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
    const response = await axios.post<SignUpResponse>(
      SIGNUP_API_BASE_URL,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("회원가입 관련 message :", response.data.message);
    return response.data.message; // 성공 응답 반환
  } catch (error: any) {
    console.error("회원가입 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "회원가입 중 오류 발생");
  }
};

interface CheckIdResponse {
  code: number;
  status: string;
  message: string;
  data: boolean;
}

// 아이디 중복확인
export const checkValidationIdApi = async (newId: string) => {
  try {
    const response = await axios.get<CheckIdResponse>(
      `${VALIDATION_ID_API_URL}=${newId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("아이디 확인 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "아이디 확인 중 오류 발생"
    );
  }
};

interface CheckEmailResponse {
  code: number;
  status: string;
  message: string;
  data: string;
}
// 이메일 중복확인 -> 이부분 중복 검증 잘 되는지 추후 확인 필요
export const checkValidationEmailApi = async (email: { email: string }) => {
  try {
    const response = await axios.post<CheckEmailResponse>(
      VALIDATION_EMAIL_API_URL,
      email,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.message; // 성공 응답 반환
  } catch (error: any) {
    console.error("이메일 확인 실패:", error.response?.data || error.message);
    alert(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "이메일 확인 중 오류 발생"
    );
  }
};
