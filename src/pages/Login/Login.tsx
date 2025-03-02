// 로그인 페이지
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import InputBar from "../../components/InputBar/InputBar";
import Button from "../../components/Button/Button";
import kakaoIcon from "../../assets/socialLoginIcon/kakaoLogin.svg";
import naverIcon from "../../assets/socialLoginIcon/naverLogin.svg";
import googleIcon from "../../assets/socialLoginIcon/googleLogin.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TopIcon from "../../components/TopIcon";

// test용 로그인 정보
const dummyLoginInfo = [
  {
    userId: "asdf",
    userPw: "1234",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // 로그인 버튼을 눌렀는지 여부
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);

  // 테스트용 로그인 로직. 더미 데이터와 맞으면 로그인 성공되게 함.
  const handleLoginTest = () => {
    const isValidUser = dummyLoginInfo.some(
      (user) => user.userId === inputId && user.userPw === inputPw
    );

    if (isValidUser) {
      console.log("로그인 성공!");
      navigate("/");
    } else {
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
              inputTitle="아이디"
              inputType="text"
              inputText={inputId}
              placeholder="아이디를 입력해주세요."
              setInputText={setInputId}
            />
          </div>
          <div>
            <InputBar
              inputTitle="비밀번호"
              inputType="password"
              inputText={inputPw}
              placeholder="비밀번호를 입력해주세요."
              setInputText={setInputPw}
            />
          </div>
        </div>
        {isLoginAttempted && (
          <span className={styles.WrongLogin}>
            아이디 또는 비밀번호를 잘못 입력했습니다.
          </span>
        )}
        <div style={{ marginTop: "67px", marginBottom: "12px" }}>
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
            onClick={() => console.log("카카오로 로그인")}
          />
          <img
            src={naverIcon}
            alt="네이버로 로그인"
            onClick={() => console.log("네이버로 로그인")}
          />
          <img
            src={googleIcon}
            alt="구글로 로그인"
            onClick={() => console.log("구글로 로그인")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
