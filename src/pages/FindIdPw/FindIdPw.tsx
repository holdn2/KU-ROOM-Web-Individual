import { useEffect, useState } from "react";
import styles from "./FinIdPw.module.css";
import InputBar from "../../components/InputBar/InputBar";
import PrimaryButton from "../../components/Button/PrimaryButton";
import InformModal from "../../components/InformModal/InformModal";
import TopIcon from "../../components/TopIcon";

const dummyCode = "1234";
const dummyId = "kurum"; // 테스트용 아이디

const FindIdPw = () => {
  // 아이디/비밀번호 찾기 프로세스 스텝
  const [findStep, setFindStep] = useState(0);
  // 안내 메일을 보낼 이메일 주소
  const [informEmail, setInformEmail] = useState("");
  // 인증코드. string인지 number인지 중요.
  const [verifyCode, setVerifyCode] = useState("");
  // 인증코드 시도했는지 여부
  const [isVerifyAttempted, setIsVerifyAttempted] = useState(false);
  // 이메일에서 본 아이디
  const [inputId, setInputId] = useState("");
  const [verifiedId, setVerifiedId] = useState(false);
  // 새로운 비밀번호
  const [newPw, setNewPw] = useState("");
  const [allowedPw, setAllowedPw] = useState(false);
  // 비밀번호 확인
  const [checkPw, setCheckPw] = useState("");
  const [isCheckedPw, setIsCheckedPw] = useState(false);
  // 재설정 시도를 했는지
  const [isAttemptReset, setIsAttemptReset] = useState(false);

  // 모달창 on/off 상태
  const [modalState, setModalState] = useState(false);
  // 모달창 종류
  const [modalType, setModalType] = useState("");

  // 이메일 형식 검증 정규식
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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

  // 비밀번호 검증 함수 (영문 + 숫자 + 특수문자 포함 8자 이상)
  const isValidPassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  // 비밀번호 재설정이 유효한지 확인
  const handleResetPassword = () => {
    setIsAttemptReset(true);
    // 조건에 맞는지 확인
    setVerifiedId(inputId === dummyId);
    setAllowedPw(isValidPassword(newPw));
    setIsCheckedPw(checkPw === newPw);
    // 모든 조건이 충족되었을 때 재설정 성공
    if (inputId === dummyId && isValidPassword(newPw) && checkPw === newPw) {
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
              inputTitle="이메일"
              inputType="text"
              inputText={informEmail}
              placeholder="가입한 이메일 주소를 입력해주세요"
              setInputText={setInformEmail}
            />
            {informEmail && !validateEmail(informEmail) && (
              <span className={styles.ErrorMsg}>잘못된 이메일 형식입니다.</span>
            )}
            <div style={{ marginTop: "67px" }}>
              <PrimaryButton
                size="lg"
                btnText="안내 메일 받기"
                onClick={sendInformEmail}
                disabled={!informEmail || !validateEmail(informEmail)}
              />
            </div>
          </>
        );
      // 인증코드 입력.
      case 1:
        return (
          <>
            <h1 className={styles.FindStepTitle}>비밀번호 재설정</h1>
            <InputBar
              inputTitle="인증코드"
              inputType="text"
              inputText={verifyCode}
              placeholder="인증코드를 입력해주세요"
              setInputText={setVerifyCode}
            />
            {isVerifyAttempted && (
              <span className={styles.ErrorMsg}>
                인증코드를 잘못 입력했습니다.
              </span>
            )}
            <div style={{ marginTop: "67px" }}>
              <PrimaryButton
                size="lg"
                btnText="인증하기"
                onClick={handleVerifyCodeTest}
                disabled={!verifyCode}
              />
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <InputBar
                  inputTitle="아이디"
                  inputType="text"
                  inputText={inputId}
                  placeholder="안내 이메일에서 아이디를 확인하세요"
                  setInputText={setInputId}
                />
                {!verifiedId && isAttemptReset && (
                  <span className={styles.ErrorMsg}>
                    알맞은 아이디를 입력해주세요.
                  </span>
                )}
              </div>
              <div>
                <InputBar
                  inputTitle="새로운 비밀번호"
                  inputType="password"
                  inputText={newPw}
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  setInputText={setNewPw}
                />
                {!allowedPw && isAttemptReset && (
                  <span className={styles.ErrorMsg}>
                    영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.
                  </span>
                )}
              </div>

              <div>
                <InputBar
                  inputTitle="비밀번호 확인"
                  inputType="password"
                  inputText={checkPw}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  setInputText={setCheckPw}
                />
                {!isCheckedPw && isAttemptReset && (
                  <span className={styles.ErrorMsg}>
                    비밀번호와 일치하지 않습니다.
                  </span>
                )}
              </div>
            </div>

            <div style={{ marginTop: "67px" }}>
              <PrimaryButton
                size="lg"
                btnText="비밀번호 재설정하기"
                onClick={handleResetPassword}
                disabled={!inputId || !newPw || !checkPw}
              />
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
