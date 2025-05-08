import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { naverLoginCallback } from "../../apis/auth";
import styles from "./NaverCallback.module.css";
import { useAuth } from "../../hooks/useAuth";

interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  isNewUser?: boolean;
  accessExpireIn?: number;
  refreshExpireIn?: number;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

const NaverCallback = () => {
  const { login } = useAuth();
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

        // useAuth 훅의 login 함수 사용
        login(
          result.data.accessToken,
          result.data.refreshToken,
          result.data.isNewUser
        );
      } catch (error) {
        // AxiosError 타입 문제 해결을 위해 Error로만 처리
        const typedError = error as Error;

        if (process.env.NODE_ENV === "development") {
          console.error("네이버 로그인 오류 상세:", typedError);
        }
        setError(
          "로그인 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );

        // 3초 후 로그인 페이지로 리다이렉션
        setTimeout(() => navigate("/login"), 3000);
      } finally {
        setLoading(false);
      }
    };

    processNaverLogin();
  }, [navigate, login]);

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
