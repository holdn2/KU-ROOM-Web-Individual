import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getTokenByTempToken } from "@apis/auth";
import { useUserStore } from "@stores/userStore";

const SocialCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useUserStore();

  useEffect(() => {
    const handleSocialCallback = async () => {
      const needSignup = searchParams.get("needSignup");
      const token = searchParams.get("token");

      console.log("🔍 SocialCallback 파라미터:", { needSignup, token });

      if (!token) {
        console.error("❌ 토큰이 없습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
        return;
      }

      try {
        // needSignup이 "true"인 경우 신규 유저
        if (needSignup === "true") {
          console.log("✅ 신규 유저 - 회원가입 페이지로 이동");
          // PreSignupToken을 sessionStorage에 저장
          sessionStorage.setItem("preSignupToken", token);
          // 회원가입 약관 동의 페이지로 이동
          navigate("/agreement");
          return;
        }

        // needSignup이 "false"인 경우 기존 유저
        if (needSignup === "false") {
          console.log("✅ 기존 유저 - 토큰 발급 요청 시작");
          // TempToken으로 실제 AccessToken/RefreshToken 발급 요청
          const response = await getTokenByTempToken(token);
          console.log("📦 getTokenByTempToken 응답:", response);

          // 응답 code 확인 (백엔드가 HTTP 200으로 에러를 보낼 수 있음)
          if (response?.code !== 200) {
            console.error("❌ 토큰 발급 실패 - code:", response?.code, "message:", response?.message);
            throw new Error(response?.message || "토큰 발급 실패");
          }

          if (response?.data) {
            const {
              tokenResponse: { accessToken, refreshToken },
              userResponse,
            } = response.data;

            console.log("✅ 토큰 발급 성공, 저장 중...");
            // 토큰 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            // 사용자 정보 저장
            setUser({ ...userResponse, loginType: "social" });

            console.log("✅ 홈으로 이동");
            // 홈으로 이동
            navigate("/", { replace: true });
          } else {
            console.error("❌ 토큰 발급 실패 - response.data 없음:", response);
            navigate("/login");
          }
          return;
        }

        // needSignup 파라미터가 없거나 올바르지 않은 경우
        console.error("❌ 올바르지 않은 needSignup 값:", needSignup);
        navigate("/login");
      } catch (error) {
        console.error("❌ 소셜 로그인 처리 중 오류:", error);
        navigate("/login");
      }
    };

    handleSocialCallback();
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

export default SocialCallback;
