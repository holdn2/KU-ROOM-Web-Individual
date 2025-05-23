// 로그인 페이지
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Login.module.css";
import InputBar from "../../components/InputBar/InputBar";
import Button from "../../components/Button/Button";
import kakaoIcon from "../../assets/socialLoginIcon/kakaoLogin.svg";
import naverIcon from "../../assets/socialLoginIcon/naverLogin.svg";
import googleIcon from "../../assets/socialLoginIcon/googleLogin.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TopIcon from "../../components/TopIcon";
import { loginApi } from "../../apis/auth";
import { useUserStore } from "../../stores/userStore";
import { scheduleTokenRefresh } from "../../apis/utils/tokenManager";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  // 로그인 버튼을 눌렀는지 여부
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);

  // 상태 변경 함수
  const handleInputIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); //영어와 숫자만 허용
    setInputId(newValue);
  };
  const handleInputPwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPw(e.target.value);
  };

  const handleLoginTest = async () => {
    const loginData = { loginId: inputId, password: inputPw };
    try {
      const response = await loginApi(loginData); // `await` 추가

      if (response?.code === 1007) {
        // 서버에서 '잘못된 아이디/비밀번호'일 때의 코드 (예: 1007)
        console.log("로그인 실패: 잘못된 아이디/비밀번호");
        setIsLoginAttempted(true);
        return;
      }
      console.log("로그인 성공!", response.data);
      // 토큰 저장 후 홈으로 이동
      const {
        tokenResponse: { accessToken, refreshToken, accessExpireIn },
        userResponse,
      } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // 받은 만료시간을 상대 시간에서 절대 시간으로 변환하여 저장
      const expireAt = Date.now() + accessExpireIn;
      localStorage.setItem("accessExpireIn", String(expireAt));

      // 자동 토큰 재발급 예약
      scheduleTokenRefresh(accessExpireIn);

      // 전역 상태관리 zustand 사용해서 저장
      setUser(userResponse);
      navigate("/");
    } catch (error: any) {
      console.error("로그인 중 오류 발생:", error.message); // 서버 오류(500) 같은 경우
      setIsLoginAttempted(true);
    }
  };

  // 로그인 실패 시 2초 간 보여줌
  useEffect(() => {
    if (!isLoginAttempted) return;
    const timer = setTimeout(() => setIsLoginAttempted(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isLoginAttempted]);

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <TopIcon />
        <h1 className={styles.PageTitle}>
          반가워요
          <br />
          <span className={styles.KUROOMTITLE}>쿠룸</span>
          입니다.
        </h1>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <InputBar
              label="아이디"
              type="text"
              value={inputId}
              placeholder="아이디를 입력해주세요."
              onChange={handleInputIdChange}
            />

            <InputBar
              label="비밀번호"
              type="password"
              value={inputPw}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleInputPwChange}
            />
          </div>
        </div>
        {isLoginAttempted && (
          <span className={styles.WrongLogin}>
            아이디 또는 비밀번호를 잘못 입력했습니다.
          </span>
        )}
        <div style={{ marginTop: "47px", marginBottom: "12px" }}>
          <Button onClick={handleLoginTest}>로그인하기</Button>
        </div>
        <div style={{ display: "flex", gap: "14px", alignSelf: "center" }}>
          <Link to="/signup" className={styles.LinkText}>
            회원가입
          </Link>
          <div
            style={{ width: "4px", height: "17px", background: "#E6EBEF" }}
          />
          <Link to="/findidpw" className={styles.LinkText}>
            아이디/비밀번호 찾기
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "47px",
            alignSelf: "center",
            marginTop: "67px",
          }}
        >
          <img
            src={kakaoIcon}
            alt="카카오로 로그인"
            // 소셜로그인 성공 시 약관 동의 페이지로 이동
            onClick={() => navigate("/agreement")}
          />
          <img
            src={naverIcon}
            alt="네이버로 로그인"
            // 소셜로그인 성공 시 약관 동의 페이지로 이동
            onClick={() => navigate("/agreement")}
          />
          <img
            src={googleIcon}
            alt="구글로 로그인"
            // 소셜로그인 성공 시 약관 동의 페이지로 이동
            onClick={() => navigate("/agreement")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
