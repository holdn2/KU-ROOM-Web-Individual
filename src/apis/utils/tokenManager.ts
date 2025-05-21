let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export const scheduleTokenRefresh = (expireIn: number) => {
  if (refreshTimer) clearTimeout(refreshTimer);

  // 만료 1분 전 자동 재발급 시도
  // 60_000 === 60000 => 읽기 쉽게 표기한 것
  const refreshDelay = expireIn - 60_000;

  refreshTimer = setTimeout(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("리프레시 토큰이 없습니다.");

      const response = await fetch("https://kuroom.shop/api/v1/auth/reissue", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) throw new Error("자동 토큰 재발급 실패");

      const data = await response.json();

      const {
        accessToken,
        refreshToken: newRefreshToken,
        accessExpireIn,
      } = data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      const expireAt = Date.now() + accessExpireIn;
      localStorage.setItem("accessExpireIn", String(expireAt));

      // 다음 만료 시점 예약
      scheduleTokenRefresh(accessExpireIn);
    } catch (error) {
      console.error("토큰 자동 재발급 중 오류:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  }, refreshDelay);
};
