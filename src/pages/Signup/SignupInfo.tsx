// 회원가입 페이지
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Signup.module.css";
import classNames from "classnames"; // 조건부 스타일링을 위해서
import TopIcon from "../../components/TopIcon";
import InputBar from "../../components/InputBar/InputBar";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { isValidPassword } from "../../utils/validations";
import { dummyNicknames } from "../../constants/dummyData";

const SignupInfo = () => {
  const navigate = useNavigate();
  const [signupStep, setSignupStep] = useState(0);
  const [signupId, setSignupId] = useState("");
  const handleSignupIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // 영어와 숫자만 허용
    setSignupId(newValue);
  };

  const [isAvailableId, setIsAvailableId] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState(false); // 중복확인 버튼 클릭 여부
  const [inputPw, setInputPw] = useState("");
  const handleInputPwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPw(e.target.value);
  };
  const [checkPw, setCheckPw] = useState("");
  const handleCheckPwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPw(e.target.value);
  };
  // 비밀번호 설정 관련
  const [allowedPw, setAllowedPw] = useState(false);
  const [isCheckedPw, setIsCheckedPw] = useState(false);
  // 재설정 시도를 했는지
  const [isAttemptReset, setIsAttemptReset] = useState(false);

  // 아이디 중복 여부 검사
  const checkAvailableId = () => {
    // 서버에 전송해야함.
    // test용 로직(아이디 중복여부)
    if (signupId.length >= 6) {
      setIsAvailableId(!dummyNicknames.includes(signupId));
      setIsChecked(true); // 중복 확인 버튼을 눌렀음을 표시
    }
  };

  // 사용가능 버튼을 눌러서 상태가 변경된 후 아이디를 변경했을 때 다시 상태 변경.
  useEffect(() => {
    setIsAvailableId(null);
    setIsChecked(false);
  }, [signupId]);

  // 비밀번호 재설정이 유효한지 확인
  const handleSettingPassword = () => {
    setIsAttemptReset(true);
    // 조건에 맞는지 확인
    setAllowedPw(isValidPassword(inputPw));
    setIsCheckedPw(checkPw === inputPw);
    // 모든 조건이 충족되었을 때 재설정 성공
    if (isValidPassword(inputPw) && checkPw === inputPw) {
      console.log("재설정 성공!");
      navigate("/identityverifictaion");
    } else {
      console.log("재설정 실패: 조건을 다시 확인하세요.");
    }
  };

  const renderSignup = () => {
    switch (signupStep) {
      case 0:
        return (
          <>
            <div style={{ position: "relative" }}>
              <InputBar
                label="아이디"
                type="text"
                value={signupId}
                placeholder="아이디를 입력해주세요."
                onChange={handleSignupIdChange}
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
              <span className={styles.ErrorMsg}>
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
              <Button
                onClick={() => setSignupStep(1)}
                disabled={!isAvailableId}
              >
                다음으로
              </Button>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <InputBar
              label="새로운 비밀번호"
              type="password"
              value={inputPw}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              onChange={handleInputPwChange}
            />
            {!allowedPw && isAttemptReset && (
              <span className={styles.ErrorMsg}>
                영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.
              </span>
            )}

            <InputBar
              label="비밀번호 확인"
              type="password"
              value={checkPw}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              onChange={handleCheckPwChange}
            />
            {!isCheckedPw && isAttemptReset && (
              <span className={styles.ErrorMsg}>
                비밀번호와 일치하지 않습니다.
              </span>
            )}

            <div className={styles.ButtonStyle}>
              <Button
                onClick={handleSettingPassword}
                disabled={!Boolean(inputPw && checkPw)}
              >
                다음으로
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <TopIcon />
        <h1 className={styles.PageTitle} style={{ marginBottom: "29px" }}>
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
