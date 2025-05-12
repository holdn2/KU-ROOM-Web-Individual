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

// API 응답 타입 정의
export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

// 토큰 응답 타입
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  accessExpireIn: number;
  refreshExpireIn: number;
}

// 사용자 정보 응답 타입
export interface UserResponse {
  id: number;
  oauthId: string;
  loginId: string;
  email: string;
  nickname: string;
  studentId: string;
  imageUrl: string;
  departmentResponse: any[];
}

// 로그인 응답 데이터 타입
export interface LoginResponseData {
  tokenResponse: TokenResponse;
  userResponse: UserResponse;
  isNewUser?: boolean;
}

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

    // 수정: 요청 본문과 헤더를 올바르게 분리
    const response = await axios.patch<LogoutResponse>(
      LOGOUT_API_URL,
      {}, // 빈 객체를 요청 본문으로 전송
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

// 네이버 로그인 토큰 처리 함수 (NaverCallback에서 사용)
export const processNaverToken = async (
  token: string
): Promise<LoginResponseData> => {
  try {
    // 토큰이 JSON 형식으로 인코딩된 문자열인 경우 디코딩
    try {
      const tokenData = JSON.parse(
        decodeURIComponent(token)
      ) as LoginResponseData;
      return tokenData;
    } catch (parseError) {
      // 토큰이 JSON이 아닌 다른 형식인 경우, 서버에 토큰 검증 요청
      const response = await axios.post<ApiResponse<LoginResponseData>>(
        `${NAVER_LOGIN_API_URL}/validate`,
        { token },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.data;
    }
  } catch (error) {
    console.error("네이버 토큰 처리 중 오류:", error);
    throw new Error("네이버 로그인 처리 중 오류가 발생했습니다.");
  }
};
