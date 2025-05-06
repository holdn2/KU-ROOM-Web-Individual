// 로그인 관련 api
import axios from "axios";

const LOGIN_API_URL = "https://kuroom.shop/api/v1/auth/login";
const LOGOUT_API_URL = "https://kuroom.shop/api/v1/auth/logout";
const WITHDRAW_API_URL = "https://kuroom.shop/api/v1/users/deactivate";

export const loginApi = async (userData: {
  loginId: string;
  password: string;
}) => {
  try {
    const response = await axios.post(LOGIN_API_URL, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // 성공 시 반환
  } catch (error: any) {
    if (error.response?.status === 401) {
      return error.response.data; // 401이면 throw하지 않고 반환
    }
    throw new Error(error.response?.data?.message || "로그인 중 오류 발생"); // 서버 문제(500 등)만 throw
  }
};

// 로그아웃 관련 api
interface LogoutResponse {
  code: number;
  status: string;
  message: string;
  data: string;
}
export const logoutApi = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("AccessToken이 없습니다.");
    }
    const response = await axios.patch<LogoutResponse>(LOGOUT_API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data; // 성공 시 반환
  } catch (error: any) {
    if (error.response?.status === 401) {
      return error.response.data; // 401이면 throw하지 않고 반환
    }
    throw new Error(error.response?.data?.message || "로그아웃 중 오류 발생"); // 서버 문제(500 등)만 throw
  }
};

// 회원 탈퇴 관련 api
export const withdrawApi = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("AccessToken이 없습니다.");
    }
    const response = await axios.delete(WITHDRAW_API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "회원탈퇴 중 오류 발생");
  }
};
