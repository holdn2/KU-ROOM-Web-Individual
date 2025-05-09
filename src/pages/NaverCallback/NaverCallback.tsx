// NaverCallback.tsx 수정
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NaverCallback.module.css";
import { useAuth } from "../../hooks/useAuth";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  accessExpireIn: number;
  refreshExpireIn: number;
}

interface UserResponse {
  id: number;
  oauthId: string;
  loginId: string;
  email: string;
  nickname: string;
  studentId: string;
  imageUrl: string;
  departmentResponse: any[];
}

interface LoginResponseData {
  tokenResponse: TokenResponse;
  userResponse: UserResponse;
}

const NaverCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processNaverLogin = async () => {
      try {
        // URL에서 token 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (!token) {
          throw new Error("토큰 파라미터가 없습니다.");
        }

        // 토큰 파싱 (JWT 또는 다른 형식일 수 있음)
        try {
          // 토큰이 JSON 형식으로 인코딩된 문자열인 경우
          const tokenData = JSON.parse(decodeURIComponent(token));

          login(
            tokenData.tokenResponse.accessToken,
            tokenData.tokenResponse.refreshToken,
            tokenData.tokenResponse.accessExpireIn,
            tokenData.tokenResponse.refreshExpireIn,
            false // isNewUser 정보가 없으면 기본값 false 사용
          );
        } catch (parseError) {
          // 토큰이 JSON이 아닌 다른 형식인 경우
          console.log("토큰 파싱 실패, 원본 토큰 사용:", token);

          // 토큰 자체가 accessToken일 수 있음
          // 이 부분은 백엔드와 협의하여 정확한 형식 확인 필요
          localStorage.setItem("accessToken", token);

          // 다른 정보 없이 홈으로 이동
          navigate("/");
        }
      } catch (error) {
        const typedError = error as Error;
        console.error("네이버 로그인 처리 중 오류:", typedError);

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
