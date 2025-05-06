// src/pages/NaverCallback/NaverCallback.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { naverLoginCallback } from "../../apis/auth";
import styles from "./NaverCallback.module.css";

const NaverCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processNaverLogin = async () => {
      try {
        // URL에서 code와 state 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");

        if (!code || !state) {
          throw new Error("필수 매개변수가 누락되었습니다.");
        }

        // 네이버 로그인 처리
        const response = await naverLoginCallback(code, state);

        // 토큰 저장
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        // 로그인 성공 후 이동
        // 신규 사용자이면 약관 동의 페이지로, 기존 사용자면 홈으로
        if (response.data.isNewUser) {
          navigate("/agreement");
        } else {
          navigate("/");
        }
      } catch (error: any) {
        console.error("네이버 로그인 처리 중 오류:", error);
        setError(error.message || "로그인 처리 중 오류가 발생했습니다.");
        // 3초 후 로그인 페이지로 리다이렉션
        setTimeout(() => navigate("/login"), 3000);
      } finally {
        setLoading(false);
      }
    };

    processNaverLogin();
  }, [navigate]);

  return (
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
