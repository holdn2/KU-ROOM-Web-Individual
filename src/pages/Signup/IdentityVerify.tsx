import { ChangeEvent, useEffect, useState } from "react";
import TopIcon from "../../components/TopIcon";
import styles from "./IdentityVerify.module.css";
import InputBar from "../../components/InputBar/InputBar";
import Button from "../../components/Button/Button";
import checkedIcon from "../../assets/icon/roundcheck.svg";
import uncheckedIcon from "../../assets/icon/roundUncheck.svg";
import { useNavigate } from "react-router-dom";

const dummyCode = "123456";

const IdentityVerify = () => {
  const navigate = useNavigate();
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const handleVerifiedEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifiedEmail(e.target.value);
  };
  // 인증코드 전송을 했는지 여부
  const [isAttemptSend, setIsAttemptSend] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  // 인증코드를 확인한 적 있는지 여부
  const [isAttemptVerify, setIsAttemptVerify] = useState(false);
  const handleVerifyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, ""); // 숫자만 입력 가능하도록 제한
    if (newValue.length <= 6) {
      // 6자리까지만 입력 가능
      setVerifyCode(newValue);
    }
  };
  // 이메일 형식 검증 정규식
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 인증코드 발송 로직
  const sendVerifyCode = () => {
    console.log("인증코드 발송");
    // 서버에 요청하는 로직 필요
    setIsAttemptSend(true);
  };

  useEffect(() => {
    setIsAttemptSend(false);
    setIsAttemptVerify(false);
    setVerifyCode("");
  }, [verifiedEmail]);

  const handleVerifyCode = () => {
    // 서버에 요청해서 같은지 확인
    if (verifyCode === dummyCode) {
      navigate("/agreement");
    } else {
      setIsAttemptVerify(true);
    }
  };

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <TopIcon />
        <h1 className={styles.PageTitle}>본인인증</h1>
        <div style={{ position: "relative" }}>
          <InputBar
            label="이메일"
            type="text"
            value={verifiedEmail}
            placeholder="가입한 이메일 주소를 입력해주세요"
            onChange={handleVerifiedEmailChange}
          />
          <img
            src={validateEmail(verifiedEmail) ? checkedIcon : uncheckedIcon}
            alt="올바른 형식인지 체크"
            className={styles.CheckIcon}
          />
        </div>
        {verifiedEmail && !validateEmail(verifiedEmail) && (
          <span className={styles.ErrorMsg}>잘못된 이메일 형식입니다.</span>
        )}
        {isAttemptSend && (
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
              <InputBar
                label="인증코드"
                type="text"
                value={verifyCode}
                placeholder="인증코드를 입력해주세요"
                onChange={handleVerifyCodeChange}
              />
            </div>
            <button className={styles.Retransmit} onClick={sendVerifyCode}>
              이메일 재전송
            </button>
          </div>
        )}

        {isAttemptVerify && (
          <span className={styles.ErrorMsg}>잘못된 인증코드입니다.</span>
        )}
        <div className={styles.ButtonStyle}>
          {isAttemptSend ? (
            <Button
              onClick={handleVerifyCode}
              disabled={verifyCode.length !== 6}
            >
              인증하기
            </Button>
          ) : (
            <Button
              onClick={sendVerifyCode}
              disabled={!verifiedEmail || !validateEmail(verifiedEmail)}
            >
              인증코드 발송
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityVerify;
