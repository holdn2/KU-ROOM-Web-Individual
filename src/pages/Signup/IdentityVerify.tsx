import { ChangeEvent, useEffect, useState } from "react";
import TopIcon from "../../components/TopIcon";
import styles from "./IdentityVerify.module.css";
import InputBar from "../../components/InputBar/InputBar";
import Button from "../../components/Button/Button";
import checkedIcon from "../../assets/icon/roundcheck.svg";
import uncheckedIcon from "../../assets/icon/roundUncheck.svg";
import { useNavigate } from "react-router-dom";

const dummyCode = "1234";

const IdentityVerify = () => {
  const navigate = useNavigate();
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const handleVerifiedEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifiedEmail(e.target.value);
  };
  // 인증코드 전송을 했는지 여부
  const [isAttemptSend, setIsAttemptSend] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const handleVerifyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };
  const [successCode, setSuccessCode] = useState(false);
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
    setVerifyCode("");
  }, [verifiedEmail]);

  // 인증코드 성공 확인
  useEffect(() => {
    setSuccessCode(verifyCode === dummyCode);
  }, [verifyCode]);

  const toAgreement = () => {
    navigate("/agreement");
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
              <img
                src={successCode ? checkedIcon : uncheckedIcon}
                alt="올바른 코드인지 체크"
                className={styles.CheckIcon}
              />
            </div>
            <button className={styles.Retransmit} onClick={sendVerifyCode}>
              이메일 재전송
            </button>
          </div>
        )}

        {verifyCode && !successCode ? (
          <span className={styles.ErrorMsg}>잘못된 인증코드입니다.</span>
        ) : (
          verifyCode && (
            <span className={styles.ErrorMsg}>인증에 성공하였습니다.</span>
          )
        )}
        <div className={styles.ButtonStyle}>
          {isAttemptSend ? (
            <Button onClick={toAgreement} disabled={!successCode}>
              다음으로
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
