import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { naverLoginCallback } from "../../apis/auth";
import styles from "./NaverCallback.module.css";

// auth.ts에서 반환되는 응답 타입 정의
interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  isNewUser?: boolean;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

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

        // 네이버 로그인 처리 - 타입 명시
        const result = (await naverLoginCallback(
          code,
          state
        )) as ApiResponse<LoginResponseData>;

        // 토큰 저장
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);

        // 로그인 성공 후 이동
        // 신규 사용자이면 약관 동의 페이지로, 기존 사용자면 홈으로
        if (result.data.isNewUser) {
          navigate("/agreement");
        } else {
          navigate("/");
        }
      } catch (error) {
        // AxiosError 타입 문제 해결을 위해 Error로만 처리
        const typedError = error as Error;
        console.error("네이버 로그인 처리 중 오류:", typedError);

        setError(typedError.message || "로그인 처리 중 오류가 발생했습니다.");

        // 3초 후 로그인 페이지로 리다이렉션
        setTimeout(() => navigate("/login"), 3000);
      } finally {
        setLoading(false);
      }
    };

    processNaverLogin();
  }, [navigate]);

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
