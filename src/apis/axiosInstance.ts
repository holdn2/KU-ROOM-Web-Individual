import axios from "axios";
import { reissueTokenApi } from "./auth";

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

// 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => {
    const code = (response.data as { code?: number }).code;
    const isAccessExpired = [1005, 1006, 1000, 1003, 1004].includes(code ?? -1);

    if (isAccessExpired) {
      // 실제로는 백엔드가 200 OK지만 토큰이 만료된 상황
      // → 강제로 throw해서 catch()로 넘어가게 함
      const error = new Error("Access token expired");
      // @ts-ignore
      error._forceRefresh = true; // 플래그로 catch에서 구분 가능
      throw error;
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const isForcedRefresh = error._forceRefresh || false;

    if (isForcedRefresh && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshExpireStr = localStorage.getItem("refreshExpireIn");
      const refreshExpireAt = refreshExpireStr
        ? parseInt(refreshExpireStr, 10)
        : 0;
      const now = Date.now();

      if (now > refreshExpireAt) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(new Error("refreshToken expired"));
      }

      try {
        const data = await reissueTokenApi();
        const { accessToken, refreshToken, accessExpireIn, refreshExpireIn } =
          data.tokenResponse;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessExpireIn", String(now + accessExpireIn));
        localStorage.setItem("refreshExpireIn", String(now + refreshExpireIn));

        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
