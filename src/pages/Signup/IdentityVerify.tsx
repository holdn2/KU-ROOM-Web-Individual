import { ChangeEvent, useState } from "react";
import TopIcon from "../../components/TopIcon";
import styles from "./IdentityVerify.module.css";
import InputBar from "../../components/InputBar/InputBar";
import Button from "../../components/Button/Button";

const IdentityVerify = () => {
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const handleVerifiedEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifiedEmail(e.target.value);
  };

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <TopIcon />
        <h1 className={styles.PageTitle}>본인인증</h1>
        <InputBar
          label="이메일"
          type="text"
          value={verifiedEmail}
          placeholder="가입한 이메일 주소를 입력해주세요"
          onChange={handleVerifiedEmail}
        />
        <div className={styles.ButtonStyle}>
          <Button onClick={() => console.log("코드발송")}>인증코드 발송</Button>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerify;
