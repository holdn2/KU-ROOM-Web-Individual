// src/pages/NaverCallback/NaverCallback.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { processNaverToken } from "../../apis/auth";
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
        // URL에서 token 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (!token) {
          throw new Error("토큰 파라미터가 없습니다.");
        }

        try {
          // 토큰 처리 (auth.ts의 새 함수 사용)
          const tokenData = await processNaverToken(token);

          // useAuth 훅의 login 함수 사용
          login(
            tokenData.tokenResponse.accessToken,
            tokenData.tokenResponse.refreshToken,
            tokenData.tokenResponse.accessExpireIn,
            tokenData.tokenResponse.refreshExpireIn,
            !!tokenData.isNewUser // isNewUser가 있으면 해당 값, 없으면 false 사용
          );

          // 로그인 성공 후 이동 (isNewUser에 따라 다른 경로로)
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

  // CSS 클래스 처리
  const containerClass = styles?.callbackContainer || "callback-container";
  const loadingClass = styles?.loadingMessage || "loading-message";
  const errorClass = styles?.errorMessage || "error-message";

  return (
    <div className={containerClass}>
      {loading ? (
        <div className={loadingClass}>
          <p>네이버 로그인 처리 중입니다...</p>
        </div>
      ) : error ? (
        <div className={errorClass}>
          <p>오류가 발생했습니다: {error}</p>
          <p>잠시 후 로그인 페이지로 이동합니다...</p>
        </div>
      ) : null}
    </div>
  );
};

export default NaverCallback;
