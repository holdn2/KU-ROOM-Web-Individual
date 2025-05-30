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

    console.log("에러코드: ", errorCode);

    // JWT 관련 오류 코드 또는 HTTP 401 Unauthorized일 경우 재발급 시도
    const tokenErrorCodes = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 401];
    if (tokenErrorCodes.includes(errorCode) || status === 401) {
      try {
        originalRequest._retry = true;
        const newAccessToken = await reissueTokenApi();

        // 새로운 accessToken을 헤더에 설정하고 재요청
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        if (newAccessToken) {
          // window.location.reload();
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 토큰 재발급 api
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
export const reissueTokenApi = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.patch<ReissueResponse>(
      "https://kuroom.shop/api/v1/auth/reissue",
      { refreshToken }
    );

    const tokenData = response.data.data;

    // 이 조건이 중요: refreshToken은 있었지만, 만료되어 data 자체가 안 온 경우
    if (!tokenData || !tokenData.accessToken) {
      console.error(" refreshToken 만료 또는 재발급 실패 → 로그인 이동");
      localStorage.clear();
      window.location.href = "/login";
      throw new Error("refreshToken 만료");
    }

    // 정상적으로 accessToken 재발급됨
    localStorage.setItem("accessToken", tokenData.accessToken);
    localStorage.setItem("refreshToken", tokenData.refreshToken);
    console.log(" accessToken 재발급 성공");

    return tokenData.accessToken;
  } catch (err: any) {
    console.warn(
      "⚠️ 재발급 실패 (기타 이유)",
      err.response?.data || err.message
    );
    localStorage.clear();
    window.location.href = "/login";

    throw err;
  }
};

export default axiosInstance;
