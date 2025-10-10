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
      // 현재 URL 전체 확인
      console.log("현재 URL:", window.location.href);
      console.log("전체 URL 파라미터:", Object.fromEntries(searchParams));

      // URL에서 token, authCode, code 파라미터 확인
      const authCode =
        searchParams.get("token") ||
        searchParams.get("authCode") ||
        searchParams.get("code");

      console.log("받은 authCode:", authCode);

      if (!authCode) {
        console.error("AuthCode가 없습니다.");
        console.error(
          "사용 가능한 파라미터들:",
          Array.from(searchParams.keys())
        );
        // 로그인 페이지로 이동하지 말고 일단 대기
        alert(
          "AuthCode를 찾을 수 없습니다. 개발자 도구 Console을 확인해주세요."
        );
        return;
      }

      try {
        console.log("토큰 교환 요청 중...", authCode);
        // 임시 토큰으로 실제 토큰 발급받기
        const response = await getTokenByAuthCode(authCode);

        console.log("토큰 교환 응답:", response);
        console.log("응답 코드:", response?.code);
        console.log("응답 데이터:", response?.data);

        if (response?.data) {
          const {
            tokenResponse: { accessToken, refreshToken, isFirstLogin },
            userResponse,
          } = response.data;

          // 신규 회원인 경우 (isFirstLogin === true)
          if (isFirstLogin) {
            console.log("신규 회원 감지, 추가 정보 입력 페이지로 이동");

            // 토큰 임시 저장 (추가 정보 입력 완료 후 사용)
            sessionStorage.setItem("tempAccessToken", accessToken);
            sessionStorage.setItem("tempRefreshToken", refreshToken);
            sessionStorage.setItem("socialAuthCode", authCode);

            // OAuth 유저 정보 임시 저장
            sessionStorage.setItem("oauthUserInfo", JSON.stringify(userResponse));

            // 약관 동의 페이지로 이동
            navigate("/agreement");
            return;
          }

          // 기존 회원인 경우
          // 토큰 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // 유저 정보 저장
          setUser(userResponse);

          console.log("OAuth 로그인 성공!");

          // 홈으로 이동 (또는 이전 페이지로)
          const redirectUrl = sessionStorage.getItem("redirectUrl") || "/";
          sessionStorage.removeItem("redirectUrl");
          navigate(redirectUrl);
        } else if (response?.code === 1024) {
          // 신규 회원인 경우 (code 1024) - 백엔드가 이 코드를 사용할 경우 대비
          console.log("신규 회원 감지 (code 1024), 추가 정보 입력 페이지로 이동");

          // authCode를 sessionStorage에 저장하여 나중에 회원가입 완료 시 사용
          sessionStorage.setItem("socialAuthCode", authCode);

          // 약관 동의 페이지로 이동
          navigate("/agreement");
        } else {
          console.error("토큰 교환 실패:", response);
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
