import axios from "axios";

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.code;
    const status = error.response?.status;

    // 이미 재시도한 요청은 무한 루프 방지를 위해 막기
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // JWT 관련 오류 코드 또는 HTTP 401 Unauthorized일 경우 재발급 시도
    const tokenErrorCodes = [1000, 1001, 1002, 1003, 1004, 1005, 1006];
    if (tokenErrorCodes.includes(errorCode) || status === 401) {
      try {
        originalRequest._retry = true;
        const newAccessToken = await reissueTokenApi();

        // 새로운 accessToken을 헤더에 설정하고 재요청
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

interface ReissueResponse {
  code: number;
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    accessExpireIn: number;
    refreshExpireIn: number;
  };
}
const reissueTokenApi = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.patch<ReissueResponse>(
      "https://kuroom.shop/api/v1/auth/reissue",
      {
        refreshToken,
      }
    );

    const tokenData = response.data.data;
    localStorage.setItem("accessToken", tokenData.accessToken);
    localStorage.setItem("refreshToken", tokenData.refreshToken);

    console.log("재발급 성공");

    return tokenData.accessToken;
  } catch (err: any) {
    console.error("토큰 재발급 실패", err.response?.data || err.message);
    throw err;
  }
};

export default axiosInstance;
