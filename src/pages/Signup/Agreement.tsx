import React from "react";
import styles from "./Agreement.module.css";
import TopIcon from "../../components/TopIcon";

type Props = {};

const Agreement = (props: Props) => {
  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <TopIcon />
        <h1 className={styles.PageTitle}>
          회원가입을 위한
          <br />
          약관에 동의해주세요
        </h1>
      </div>
    </div>
  );
};

export default Agreement;
