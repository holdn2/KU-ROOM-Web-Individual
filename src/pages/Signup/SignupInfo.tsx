// 회원가입 페이지
import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import classNames from "classnames"; // 조건부 스타일링을 위해서
import TopIcon from "../../components/TopIcon";
import InputBar from "../../components/InputBar/InputBar";
import PrimaryButton from "../../components/Button/PrimaryButton";

const dummyData = ["asdfqwer", "kuroom", "asdf1234"];

const SignupInfo = () => {
  const [signupStep, setSignupStep] = useState(0);
  const [signupId, setSignupId] = useState("");
  const [isAvailableId, setIsAvailableId] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState(false); // 중복확인 버튼 클릭 여부

  // 아이디 중복 여부 검사
  const checkAvailableId = () => {
    // 서버에 전송해야함.
    // test용 로직(아이디 중복여부)
    if (signupId.length >= 6) {
      setIsAvailableId(!dummyData.includes(signupId));
      setIsChecked(true); // 중복 확인 버튼을 눌렀음을 표시
    }
  };

  // 사용가능 버튼을 눌러서 상태가 변경된 후 아이디를 변경했을 때 다시 상태 변경.
  useEffect(() => {
    setIsAvailableId(null);
    setIsChecked(false);
  }, [signupId]);

  const renderSignup = () => {
    switch (signupStep) {
      case 0:
        return (
          <>
            <div style={{ position: "relative" }}>
              <InputBar
                inputTitle="아이디"
                inputType="text"
                inputText={signupId}
                placeholder="아이디를 입력해주세요."
                setInputText={setSignupId}
              />
              {isAvailableId ? (
                <button
                  // 조건부 스타일링
                  className={styles.AvailableBtn}
                >
                  사용가능
                </button>
              ) : (
                <button
                  // 조건부 스타일링
                  className={classNames(styles.CheckDupBtn, {
                    [styles.disabled]: signupId.length < 6,
                  })}
                  onClick={checkAvailableId}
                >
                  중복확인
                </button>
              )}
            </div>

            {signupId.length < 6 && signupId && (
              <span className={styles.RedMsg}>
                아이디는 6자 이상으로 설정해주세요.
              </span>
            )}
            {/* 체크를 이미 한 상태에서만 표시되게함. */}
            {signupId.length >= 6 && isChecked && (
              <span
                className={classNames(styles.CheckedId, {
                  [styles.duplicated]: !isAvailableId,
                })}
              >
                {isAvailableId
                  ? "사용 가능한 아이디입니다."
                  : "사용 불가능한 아이디입니다."}
              </span>
            )}
            <div className={styles.ButtonStyle}>
              <PrimaryButton
                size="lg"
                btnText="다음으로"
                onClick={() => setSignupStep(1)}
                disabled={!isAvailableId}
              />
            </div>
          </>
        );
      case 2:
        return <></>;
    }
  };

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <TopIcon />
        <h1 className={styles.PageTitle}>
          <span style={{ color: "#009733" }}>회원가입</span>을 위한
          <br />
          정보를 입력해주세요.
        </h1>
        {renderSignup()}
      </div>
    </div>
  );
};

export default SignupInfo;
