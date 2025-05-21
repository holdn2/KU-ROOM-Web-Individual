import axios from "axios";
import { scheduleTokenRefresh } from "./utils/tokenManager"; // accessExpireIn 기반 자동 예약

const axiosInstance = axios.create({
  baseURL: "https://kuroom.shop/api/v1",
  // body가 있는 요청들의 경우에는 Content-Type: application/json를 명시해주는 것이 좋다.
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface TokenReissueResponse {
  code: number;
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    accessExpireIn: number; // 서버에서 ms 단위로 전달됨
    refreshExpireIn: number;
  };
}

// 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAccessTokenExpired = error.response?.status === 401;

    // accessToken이 만료됐고, 아직 재시도한 적이 없으면
    if (isAccessTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("refreshToken 없음");

        // refreshToken으로 accessToken 재발급 요청
        const res = await axios.patch<TokenReissueResponse>(
          "https://kuroom.shop/api/v1/auth/reissue",
          {
            refreshToken: refreshToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newAccessToken = res.data.data.accessToken;
        const newRefreshToken = res.data.data.refreshToken;
        const newAccessExpireIn = res.data.data.accessExpireIn;

        // 새로운 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // accessToken 만료 시점도 갱신 (ms 단위로 저장)
        const expireAt = Date.now() + newAccessExpireIn; // 서버에서 이미 ms 단위로 제공됨
        localStorage.setItem("accessExpireIn", String(expireAt));

        // 다음 자동 재발급 예약
        scheduleTokenRefresh(newAccessExpireIn); // ms 단위 그대로 전달

        // 원래 요청에 새 accessToken 적용 후 재시도
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refreshToken까지 만료된 경우: 로그아웃 처리
        console.error("토큰 재발급 실패:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessExpireIn");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 다른 에러는 그대로 전달
    return Promise.reject(error);
  }
);

export default axiosInstance;
