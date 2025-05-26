import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTokenByAuthCode } from "../../apis/auth";
import { useUserStore } from "../../stores/userStore";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useUserStore();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // URL에서 authCode 추출
      const authCode = searchParams.get("authCode") || searchParams.get("code");

      if (!authCode) {
        console.error("AuthCode가 없습니다.");
        navigate("/login");
        return;
      }

      try {
        // 임시 토큰으로 실제 토큰 발급받기
        const response = await getTokenByAuthCode(authCode);

        if (response?.code === 200 || response?.data) {
          // 성공 코드 확인
          const {
            tokenResponse: {
              accessToken,
              refreshToken,
              accessExpireIn,
              refreshExpireIn,
            },
            userResponse,
          } = response.data;

          // 토큰 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          const now = Date.now();
          localStorage.setItem("accessExpireIn", String(now + accessExpireIn));
          localStorage.setItem(
            "refreshExpireIn",
            String(now + refreshExpireIn)
          );

          // 유저 정보 저장
          setUser(userResponse);

          // 홈으로 이동 (또는 이전 페이지로)
          const redirectUrl = sessionStorage.getItem("redirectUrl") || "/";
          sessionStorage.removeItem("redirectUrl");
          navigate(redirectUrl);
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
