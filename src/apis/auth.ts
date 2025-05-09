// 로그인 관련 api
import axios from "axios";

const LOGIN_API_URL = "https://kuroom.shop/api/v1/auth/login";
const LOGOUT_API_URL = "https://kuroom.shop/api/v1/auth/logout";
const WITHDRAW_API_URL = "https://kuroom.shop/api/v1/users/deactivate";
const NAVER_LOGIN_API_URL = "https://kuroom.shop/api/v1/auth/social/naver";

// 네이버 로그인 관련 상수
const NAVER_CLIENT_ID = "0JPy8UxAyPa3jRSDHePI";
const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173/naver-callback"
    : "https://ku-room-web-individual.vercel.app/naver-callback";

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

// 네이버 로그인 URL 생성 함수
export const getNaverLoginURL = () => {
  return "https://kuroom.shop/oauth2/authorization/naver";
};

// // 네이버 로그인 콜백 처리 API
// export const naverLoginCallback = async (code: string, state: string) => {
//   try {
//     // 저장된 state와 비교하여 CSRF 공격 방지
//     const savedState = sessionStorage.getItem("naverLoginState");

//     if (process.env.NODE_ENV === "development") {
//       console.log("개발 환경: state 검증 우회");
//     } else if (savedState !== state) {
//       throw new Error("보안 검증에 실패했습니다.");
//     }

//     // state 검증에 성공했으므로 세션 스토리지에서 삭제
//     sessionStorage.removeItem("naverLoginState");

//     const response = await axios.post(
//       "https://kuroom.shop/api/v1/auth/token",
//       null,
//       {
//         params: { authCode: code },
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     return response.data;
//   } catch (error: any) {
//     console.error("네이버 로그인 처리 중 오류:", error);
//     throw new Error(
//       error.response?.data?.message ||
//         "네이버 로그인 처리 중 오류가 발생했습니다."
//     );
//   }
// };
