import { useState } from "react";
import TopIcon from "../../components/TopIcon";
import styles from "./IdentityVerify.module.css";
import InputBar from "../../components/InputBar/InputBar";
import PrimaryButton from "../../components/Button/PrimaryButton";

const IdentityVerify = () => {
  const [verifiedEmail, setVerifiedEmail] = useState("");

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.MainArea}>
        <TopIcon />
        <h1 className={styles.PageTitle}>본인인증</h1>
        <InputBar
          inputTitle="이메일"
          inputType="text"
          inputText={verifiedEmail}
          placeholder="가입한 이메일 주소를 입력해주세요"
          setInputText={setVerifiedEmail}
        />
        <div className={styles.ButtonStyle}>
          <PrimaryButton
            size="lg"
            btnText="인증코드 발송"
            onClick={() => console.log("코드발송")}
          />
        </div>
      </div>
    </div>
  );
};

export default IdentityVerify;
