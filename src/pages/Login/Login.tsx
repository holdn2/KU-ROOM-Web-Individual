// 로그인 페이지
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import cloudIcon from "../../assets/icon/cloud.svg";
import InputBar from "../../components/InputBar/InputBar";
import PrimaryButton from "../../components/Button/PrimaryButton";
import kakaoIcon from "../../assets/socialLoginIcon/kakaoLogin.svg";
import naverIcon from "../../assets/socialLoginIcon/naverLogin.svg";
import googleIcon from "../../assets/socialLoginIcon/googleLogin.svg";

const dummyLoginInfo = [
  {
    userId: "asdf",
    userPw: "1234",
  },
];

type Props = {};

const Login = (props: Props) => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [isLoginAttempted, setIsLoginAttempted] = useState(false); // 로그인 버튼을 눌렀는지 여부

  // 아이디와 비밀번호가 입력되었을 때만 버튼 활성화
  const isButtonEnabled = inputId.trim() !== "" && inputPw.trim() !== "";

  const handleLogin = () => {
    const isValidUser = dummyLoginInfo.some(
      (user) => user.userId === inputId && user.userPw === inputPw
    );

    if (isValidUser) {
      console.log("로그인 성공!");
    } else {
      setIsLoginAttempted(true);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setIsLoginAttempted(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isLoginAttempted]);

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <img
          src={cloudIcon}
          alt="구름 아이콘"
          style={{ width: "30px", alignSelf: "flex-end" }}
        />
        <h1 style={{ marginTop: "36px" }}>
          반가워요
          <br />
          <span style={{ color: "#009733" }}>쿠룸</span>입니다.
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
            <p>아이디</p>
            <InputBar
              inputType="text"
              inputText={inputId}
              placeholder="아이디를 입력해주세요."
              setInputText={setInputId}
            />
          </div>
          <div>
            <p>비밀번호</p>
            <InputBar
              inputType="password"
              inputText={inputPw}
              placeholder="비밀번호를 입력해주세요."
              setInputText={setInputPw}
            />
          </div>
        </div>
        {isLoginAttempted ? (
          <span className={styles.WrongLogin}>
            아이디 또는 비밀번호를 잘못 입력했습니다.
          </span>
        ) : (
          <div style={{ height: "24.5px" }} />
        )}
        <div style={{ marginTop: "67px", marginBottom: "12px" }}>
          <PrimaryButton
            size="lg"
            btnText="로그인하기"
            onClick={handleLogin}
            disabled={!isButtonEnabled}
          />
        </div>
        <div style={{ display: "flex", gap: "14px", alignSelf: "center" }}>
          <span className={styles.JoinText}>회원가입</span>
          <div
            style={{ width: "4px", height: "17px", background: "#E6EBEF" }}
          />
          <span className={styles.JoinText}>아이디/비밀번호 찾기</span>
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
