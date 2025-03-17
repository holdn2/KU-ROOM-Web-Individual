import styles from "./ChangeNickname.module.css";
import arrowBackIcon from "../../../assets/nav/arrowback.svg";
import TopIcon from "../../../components/TopIcon";
import InputBar from "../../../components/InputBar/InputBar";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const ChangeNickname = () => {
  const navigate = useNavigate();
  const [newNickname, setNewNickname] = useState("");
  const handleInputIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };
  const handleChangeNickname = () => {
    // 서버에 중복된 닉네임인지 검증하고 변경하는 로직 필요.
  };
  return (
    <div className={styles.ChangeNicknamePageWrapper}>
      <img
        src={arrowBackIcon}
        alt="뒤로가기"
        style={{ position: "absolute", marginTop: "7px", marginLeft: "3px" }}
        onClick={() => navigate(-1)}
      />
      <TopIcon />
      <div className={styles.MainArea}>
        <h1 className={styles.ChangeNicknameTitle}>닉네임 변경하기</h1>
        <InputBar
          label="닉네임"
          type="text"
          value={newNickname}
          placeholder="변경할 닉네임을 입력해주세요"
          onChange={handleInputIdChange}
        />
      </div>
      <div className={styles.ButtonWrapper}>
        <Button onClick={handleChangeNickname} disabled={!newNickname}>
          닉네임 재설정하기
        </Button>
      </div>
    </div>
  );
};

export default ChangeNickname;
