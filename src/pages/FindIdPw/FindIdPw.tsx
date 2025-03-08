import { ChangeEvent, useEffect, useState } from "react";
import styles from "./FindIdPw.module.css";
import InputBar from "../../components/InputBar/InputBar";
import Button from "../../components/Button/Button";
import InformModal from "../../components/InformModal/InformModal";
import TopIcon from "../../components/TopIcon";
import { isValidEmail, isValidPassword } from "../../utils/validations";
import { dummyLoginInfo, dummyCode } from "../../constants/dummyData";

const FindIdPw = () => {
  // 아이디/비밀번호 찾기 프로세스 스텝
  const [findStep, setFindStep] = useState(0);
  // 안내 메일을 보낼 이메일 주소
  const [informEmail, setInformEmail] = useState("");
  const handleInformEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInformEmail(e.target.value);
  };
  // 인증코드. string인지 number인지 중요.
  const [verifyCode, setVerifyCode] = useState("");
  const handleVerifyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, ""); // 숫자만 입력 가능하도록 제한
    if (newValue.length <= 6) {
      setVerifyCode(newValue);
    }
  };
  // 인증코드 시도했는지 여부
  const [isVerifyAttempted, setIsVerifyAttempted] = useState(false);
  // 이메일에서 본 아이디
  const [inputId, setInputId] = useState("");
  const handleInputIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value);
  };
  const [verifiedId, setVerifiedId] = useState(false);
  // 새로운 비밀번호
  const [newPw, setNewPw] = useState("");
  const handleNewPwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPw(e.target.value);
  };
  const [allowedPw, setAllowedPw] = useState(false);
  // 비밀번호 확인
  const [checkPw, setCheckPw] = useState("");
  const handleCheckPwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPw(e.target.value);
  };
  const [isCheckedPw, setIsCheckedPw] = useState(false);
  // 재설정 시도를 했는지
  const [isAttemptReset, setIsAttemptReset] = useState(false);

  // 모달창 on/off 상태
  const [modalState, setModalState] = useState(false);
  // 모달창 종류
  const [modalType, setModalType] = useState("");

  // 서버에 인증할 메일 주소 보냄.
  const sendInformEmail = () => {
    // 서버에 인증할 메일 주소 보냄.
    setModalType("informEmail");
    setModalState(true);
  };
  // 인증코드 유효한지 확인. 테스트용 인증코드 로직.
  const handleVerifyCodeTest = () => {
    // 서버에 인증코드 유효한지 보냄.
    const isValidCode = verifyCode === dummyCode;
    if (isValidCode) {
      console.log("비밀번호 재설정으로 넘어가기");
      setFindStep(2);
    } else {
      setIsVerifyAttempted(true);
    }
  };
  // 인증코드 실패 시 2초 간 보여줌
  useEffect(() => {
    if (!isVerifyAttempted) return;
    const timer = setTimeout(() => setIsVerifyAttempted(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isVerifyAttempted]);

  const handleResetPassword = () => {
    setIsAttemptReset(true);
    // 조건에 맞는지 확인
    setVerifiedId(inputId === dummyLoginInfo[0].userId);
    setAllowedPw(isValidPassword(newPw));
    setIsCheckedPw(checkPw === newPw);
    // 모든 조건이 충족되었을 때 재설정 성공
    if (
      inputId === dummyLoginInfo[0].userId &&
      isValidPassword(newPw) &&
      checkPw === newPw
    ) {
      console.log("재설정 성공!");
      setModalType("NewPassword");
      setModalState(true);
    } else {
      console.log("재설정 실패: 조건을 다시 확인하세요.");
    }
  };

  // 이메일 재전송 버튼 클릭 시 첫화면으로 이동 후 이전 모든 입력 초기화
  const resetAll = () => {
    setFindStep(0);
    setInformEmail("");
    setVerifyCode("");
    setIsVerifyAttempted(false);
  };

  const renderFindIdPw = () => {
    switch (findStep) {
      // 아이디/비밀번호 찾기 초기. 이메일 입력.
      case 0:
        return (
          <>
            <h1 className={styles.FindStepTitle}>아이디/비밀번호 찾기</h1>
            <InputBar
              label="이메일"
              type="text"
              value={informEmail}
              placeholder="가입한 이메일 주소를 입력해주세요"
              onChange={handleInformEmailChange}
            />
            {informEmail && !isValidEmail(informEmail) && (
              <span className={styles.ErrorMsg}>잘못된 이메일 형식입니다.</span>
            )}
            <div style={{ marginTop: "67px" }}>
              <Button
                onClick={sendInformEmail}
                disabled={!informEmail || !isValidEmail(informEmail)}
              >
                안내 메일 받기
              </Button>
            </div>
          </>
        );
      // 인증코드 입력.
      case 1:
        return (
          <>
            <h1 className={styles.FindStepTitle}>비밀번호 재설정</h1>
            <InputBar
              label="인증코드"
              type="text"
              value={verifyCode}
              placeholder="인증코드를 입력해주세요"
              onChange={handleVerifyCodeChange}
            />
            {isVerifyAttempted && (
              <span className={styles.ErrorMsg}>
                인증코드를 잘못 입력했습니다.
              </span>
            )}
            <div style={{ marginTop: "67px" }}>
              <Button
                onClick={handleVerifyCodeTest}
                disabled={verifyCode.length !== 6}
              >
                인증하기
              </Button>
            </div>
            <button className={styles.Retransmit} onClick={resetAll}>
              이메일 재전송
            </button>
          </>
        );
      case 2:
        return (
          <>
            <h1 className={styles.FindStepTitle}>비밀번호 재설정</h1>

            <InputBar
              label="아이디"
              type="text"
              value={inputId}
              placeholder="안내 이메일에서 아이디를 확인하세요"
              onChange={handleInputIdChange}
            />
            {!verifiedId && isAttemptReset && (
              <span className={styles.ErrorMsg}>
                알맞은 아이디를 입력해주세요.
              </span>
            )}

            <InputBar
              label="새로운 비밀번호"
              type="password"
              value={newPw}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              onChange={handleNewPwChange}
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

            <div style={{ marginTop: "67px" }}>
              <Button
                onClick={handleResetPassword}
                disabled={!inputId || !newPw || !checkPw}
              >
                비밀번호 재설정하기
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
        {renderFindIdPw()}
      </div>
      <InformModal
        modalType={modalType}
        modalState={modalState}
        setModalState={setModalState}
        setFindStep={setFindStep}
      />
    </div>
  );
};

export default FindIdPw;
