import styles from "./ChangeNickname.module.css";
import InputBar from "../../../components/InputBar/InputBar";
import Button from "../../../components/Button/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { checkDuplictedNickname } from "../../../apis/nickname";
import InformModal from "../../../components/InformModal/InformModal";
import Header from "../../../components/Header/Header";

const ChangeNickname = () => {
  const [newNickname, setNewNickname] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");
  // 닉네임이 유효한지 확인하는 변수
  const isNicknameValid =
    newNickname.length > 1 &&
    newNickname.length <= 10 &&
    (/[a-zA-Z]/.test(newNickname) || /[가-힣ㄱ-ㅎ]/.test(newNickname));
  const handleInputIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputNickname = e.target.value;
    if (inputNickname.length <= 10) {
      setNewNickname(inputNickname);
    }
  };
  const handleChangeNickname = async () => {
    // 서버에 닉네임 중복 여부 검증
    const response = await checkDuplictedNickname(newNickname, setErrorMsg);
    console.log(response);
    // 서버에 닉네임 변경 요청

    // 닉네임 변경 모달 생성
    setModalType("NicknameChange");
    setModalState(true);
  };

  useEffect(() => {
    setErrorMsg("");
  }, [newNickname]);

  return (
    <div className={styles.ChangeNicknamePageWrapper}>
      <Header />
      <div className={styles.MainArea}>
        <h1 className={styles.ChangeNicknameTitle}>닉네임 변경하기</h1>
        <InputBar
          label="닉네임"
          type="text"
          value={newNickname}
          placeholder="변경할 닉네임을 입력해주세요"
          onChange={handleInputIdChange}
        />
        {!isNicknameValid && newNickname && (
          <span className="ErrorMsg">
            한글 또는 영어 포함 2자 이상 10자 이내로 입력해주세요.
          </span>
        )}
        {errorMsg && <span className="ErrorMsg">{errorMsg}</span>}
        <div className={styles.ButtonWrapper}>
          <Button onClick={handleChangeNickname} disabled={!isNicknameValid}>
            닉네임 변경하기
          </Button>
        </div>
      </div>

      <InformModal
        modalType={modalType}
        modalState={modalState}
        changedNickname={newNickname}
        setModalState={setModalState}
      />
    </div>
  );
};

export default ChangeNickname;
