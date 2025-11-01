import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getTokenByAuthCode } from "@apis/auth";
import { useUserStore } from "@stores/userStore";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useUserStore();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const authCode =
        searchParams.get("token") ||
        searchParams.get("authCode") ||
        searchParams.get("code");

      if (!authCode) {
        navigate("/login");
        return;
      }

      try {
        const response = await getTokenByAuthCode(authCode);

        if (response?.data) {
          const {
            tokenResponse: { accessToken, refreshToken, isFirstLogin },
            userResponse,
          } = response.data;

          // 신규 회원인 경우
          if (isFirstLogin) {
            sessionStorage.setItem("tempAccessToken", accessToken);
            sessionStorage.setItem("tempRefreshToken", refreshToken);
            sessionStorage.setItem("socialAuthCode", authCode);
            sessionStorage.setItem(
              "oauthUserInfo",
              JSON.stringify(userResponse)
            );
            navigate("/agreement");
            return;
          }

          // 기존 회원인 경우
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("isSocialLogin", "true");
          setUser(userResponse);

          const redirectUrl = sessionStorage.getItem("redirectUrl") || "/";
          sessionStorage.removeItem("redirectUrl");
          navigate(redirectUrl);
        } else if (response?.code === 1024) {
          sessionStorage.setItem("socialAuthCode", authCode);
          navigate("/agreement");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("OAuth 토큰 교환 중 오류:", error);
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, setUser]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>로그인 처리 중...</div>
    </div>
  );
};

export default OAuthCallback;
