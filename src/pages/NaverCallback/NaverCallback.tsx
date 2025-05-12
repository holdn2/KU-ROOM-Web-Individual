import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./NaverCallback.module.css";
import { useAuth } from "../../hooks/useAuth";

const NaverCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleNaverCallback = async () => {
      try {
        // URL에서 code 파라미터 추출 (token이 아닌 code 또는 authCode)
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code"); // 'token' 대신 'code'로 변경

        if (!authCode) {
          throw new Error("인증 코드 파라미터가 없습니다.");
        }

        try {
          // 백엔드 API로 인증 코드 전송하여 토큰 받기
          const response = await axios.post(
            "https://kuroom.shop/api/v1/auth/token",
            null, // 요청 본문 없음
            {
              params: { authCode }, // 쿼리 파라미터로 authCode 전송
              headers: { "Content-Type": "application/json" },
            }
          );

          // 응답에서 토큰 데이터 추출
          const tokenData = response.data.data;

          // useAuth 훅의 login 함수 사용
          login(
            tokenData.tokenResponse.accessToken,
            tokenData.tokenResponse.refreshToken,
            tokenData.tokenResponse.accessExpireIn,
            tokenData.tokenResponse.refreshExpireIn,
            !!tokenData.isNewUser
          );

          // 로그인 성공 후 이동
          if (tokenData.isNewUser) {
            navigate("/agreement");
          } else {
            navigate("/");
          }
        } catch (parseError) {
          console.error("토큰 처리 실패:", parseError);
          throw new Error("토큰 처리 중 오류가 발생했습니다.");
        }
      } catch (error) {
        const typedError = error as Error;
        console.error("네이버 로그인 처리 중 오류:", typedError);

        setError(
          typedError.message ||
            "로그인 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );

        // 3초 후 로그인 페이지로 리다이렉션
        setTimeout(() => navigate("/login"), 3000);
      } finally {
        setLoading(false);
      }
    };

    handleNaverCallback();
  }, [navigate, login]);

  return (
    // 기존 UI 코드 유지
    <div className={styles.callbackContainer || "callback-container"}>
      {loading ? (
        <div className={styles.loadingMessage || "loading-message"}>
          <p>네이버 로그인 처리 중입니다...</p>
        </div>
      ) : error ? (
        <div className={styles.errorMessage || "error-message"}>
          <p>오류가 발생했습니다: {error}</p>
          <p>잠시 후 로그인 페이지로 이동합니다...</p>
        </div>
      ) : null}
    </div>
  );
};

export default NaverCallback;
