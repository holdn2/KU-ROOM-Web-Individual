// 로그인 페이지
import React, { useState } from "react";
import styles from "./Login.module.css";
import cloudIcon from "../../assets/icon/cloud.svg";

type Props = {};

const Login = (props: Props) => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

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
            <input
              type="text"
              value={inputId}
              className={styles.InputContainer}
              placeholder="아이디를 입력해주세요."
              onChange={(e) => {
                const inputId = e.target.value;
                setInputId(inputId);
              }}
            />
          </div>
          <div>
            <p>비밀번호</p>
            <input
              type="password"
              value={inputPw}
              className={styles.InputContainer}
              placeholder="비밀번호를 입력해주세요."
              onChange={(e) => {
                const inputPw = e.target.value;
                setInputPw(inputPw);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
