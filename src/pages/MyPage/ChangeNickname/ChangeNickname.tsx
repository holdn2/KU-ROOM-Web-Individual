import styles from "./ChangeNickname.module.css";
import arrowBackIcon from "../../../assets/nav/arrowback.svg";
import cloudIcon from "../../../assets/icon/cloud.svg";
import InputBar from "../../../components/InputBar/InputBar";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const ChangeNickname = () => {
  const navigate = useNavigate();
  const [newNickname, setNewNickname] = useState("");
  // 닉네임이 유효한지 확인하는 변수
  const isNicknameValid =
    newNickname.length > 1 &&
    newNickname.length <= 10 &&
    (/[a-zA-Z]/.test(newNickname) || /^[가-힣ㄱ-ㅎ]+$/.test(newNickname));
  const handleInputIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputNickname = e.target.value;
    if (inputNickname.length <= 10) {
      setNewNickname(inputNickname);
    }
  };

  const handleChangeNickname = () => {
    // 서버에 중복된 닉네임인지 검증하고 변경하는 로직 필요.
  };
  return (
    <div className={styles.ChangeNicknamePageWrapper}>
      <div className={styles.HeaderIconWrapper}>
        <img
          className={styles.arrowBack}
          src={arrowBackIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
        />
        <img className={styles.KuroomIcon} src={cloudIcon} alt="쿠룸 아이콘" />
      </div>
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
      </div>
      <div className={styles.ButtonWrapper}>
        <Button onClick={handleChangeNickname} disabled={!isNicknameValid}>
          닉네임 변경하기
        </Button>
      </div>
    </div>
  );
};

export default ChangeNickname;
