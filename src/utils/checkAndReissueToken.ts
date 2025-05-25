import { reissueTokenApi } from "../apis/auth";

// 토큰 검사 후 재발급
// 토큰이 필요한 api 요청 시 필수 요청
export const checkAndReissueToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const accessExpireStr = localStorage.getItem("accessExpireIn");
  const refreshExpireStr = localStorage.getItem("refreshExpireIn");

  const now = Date.now();
  const accessExpireAt = accessExpireStr ? parseInt(accessExpireStr, 10) : 0;
  const refreshExpireAt = refreshExpireStr ? parseInt(refreshExpireStr, 10) : 0;

  const isAccessExpired = !accessToken || accessExpireAt <= now;
  const isRefreshExpired = !refreshToken || refreshExpireAt <= now;

  if (isAccessExpired) {
    if (isRefreshExpired) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      try {
        console.log("재발급 요청해야함");
        const data = await reissueTokenApi();
        const { accessToken, refreshToken, accessExpireIn, refreshExpireIn } =
          data.tokenResponse;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessExpireIn", String(now + accessExpireIn));
        localStorage.setItem("refreshExpireIn", String(now + refreshExpireIn));

        console.log(" accessToken 재발급 성공");
      } catch (error) {
        console.error(" 토큰 재발급 실패:", error);
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  }
};
