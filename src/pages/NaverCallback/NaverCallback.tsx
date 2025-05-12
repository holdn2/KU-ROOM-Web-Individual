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
        // URL에서 code와 state 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");
        const state = urlParams.get("state");

        console.log("네이버 콜백 파라미터:", { authCode, state });

        if (!authCode) {
          throw new Error("인증 코드 파라미터가 없습니다.");
        }

        // API 응답 타입 정의
        interface ApiResponse {
          data: {
            tokenResponse: {
              accessToken: string;
              refreshToken: string;
              accessExpireIn: number;
              refreshExpireIn: number;
            };
            isNewUser: boolean;
          };
        }

        // 개발 환경에서 임시 로그인 처리
        if (process.env.NODE_ENV === "development") {
          try {
            console.log("백엔드 API 호출 시도");
            // 백엔드 API 호출 (개발 환경에서도 시도)
            const response = await axios.post(
              "https://kuroom.shop/api/v1/auth/token",
              null,
              {
                params: { authCode },
                headers: { "Content-Type": "application/json" },
                timeout: 10000,
              }
            );

            console.log("API 응답:", response.data);

            // 응답에서 토큰 데이터 추출
            interface TokenResponse {
              accessToken: string;
              refreshToken: string;
              accessExpireIn: number;
              refreshExpireIn: number;
            }

            interface ApiResponse {
              data: {
                tokenResponse: TokenResponse;
                isNewUser: boolean;
              };
            }

            const tokenData: ApiResponse["data"] = (
              response.data as ApiResponse
            ).data;

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
          } catch (apiError) {
            console.error("서버 API 호출 실패:", apiError);

            // 개발 환경에서 서버 오류 시 임시 로그인 처리
            console.log("개발 환경에서 임시 로그인 처리");

            // 임시 토큰 데이터 생성
            const tempTokenData = {
              accessToken: `temp_access_token_${Date.now()}`,
              refreshToken: `temp_refresh_token_${Date.now()}`,
              accessExpireIn: 1800000, // 30분
              refreshExpireIn: 604800000, // 7일
            };

            // 로컬 스토리지에 디버깅 정보 저장
            localStorage.setItem("naver_auth_code", authCode);
            localStorage.setItem("naver_auth_state", state || "");
            localStorage.setItem("naver_auth_time", new Date().toISOString());

            // 임시 로그인 처리
            login(
              tempTokenData.accessToken,
              tempTokenData.refreshToken,
              tempTokenData.accessExpireIn,
              tempTokenData.refreshExpireIn,
              false // 기존 사용자로 가정
            );

            // 홈으로 이동
            navigate("/");
          }
        } else {
          // 프로덕션 환경에서는 실제 API 호출 시도
          try {
            const response = await axios.post(
              "https://kuroom.shop/api/v1/auth/token",
              null,
              {
                params: { authCode },
                headers: { "Content-Type": "application/json" },
              }
            );

            const tokenData = (response.data as ApiResponse).data;

            login(
              tokenData.tokenResponse.accessToken,
              tokenData.tokenResponse.refreshToken,
              tokenData.tokenResponse.accessExpireIn,
              tokenData.tokenResponse.refreshExpireIn,
              !!tokenData.isNewUser
            );

            if (tokenData.isNewUser) {
              navigate("/agreement");
            } else {
              navigate("/");
            }
          } catch (parseError) {
            console.error("토큰 처리 실패:", parseError);
            throw new Error(
              "토큰 처리 중 오류가 발생했습니다. 서버 관리자에게 문의하세요."
            );
          }
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
