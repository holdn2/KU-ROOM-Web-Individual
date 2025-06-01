import axios from "axios";

// 타입 추론하여 사용
type AxiosRequestConfig = Parameters<typeof axios>[0];

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

interface AccessTokenExpiredReponse {
  code: number;
  status: string;
  message: string;
  data: {
    token: string;
  };
}
axiosInstance.interceptors.response.use<AccessTokenExpiredReponse>(
  async (response: any) => {
    // HTTP status는 200이지만 내부 code가 401이면 -> 강제로 에러 핸들러로 넘김
    if (response.data.code === 401) {
      const originalRequest = response.config as AxiosRequestConfig & {
        _retry?: boolean;
      };
      try {
        const newAccessToken = await reissueTokenApi();
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return axiosInstance(response.config);
      } catch (error: any) {
        console.warn(
          "재발급 실패 (기타 이유)",
          error.response?.data || error.message
        );
        throw error;
      }
    }
    return response;
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

    // 이 조건이 중요: refreshToken은 있었지만, 만료되어 data 자체가 안 온 경우.
    // refresh token에 문제가 있는 경우에는 로그인 화면으로 리다이렉트 해야한다.
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
    console.warn("재발급 실패 (기타 이유)", err.response?.data || err.message);
    throw err;
  }
};

export default axiosInstance;
