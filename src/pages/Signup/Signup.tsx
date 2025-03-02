// 회원가입 페이지
import React from "react";
import styles from "./Signup.module.css";
import TopIcon from "../../components/TopIcon";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <TopIcon />
        <h1 style={{ marginTop: "36px" }}>
          <span>회원가입</span>을 위한
          <br />
          정보를 입력해주세요.
        </h1>
      </div>
    </div>
  );
};

export default Signup;
