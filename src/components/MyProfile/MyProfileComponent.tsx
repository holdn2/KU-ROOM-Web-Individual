import styles from "./MyProfileComponent.module.css";
import Button from "../Button/Button";
import defaultProfileImg from "../../assets/defaultProfileImg.svg";
import { useNavigate } from "react-router-dom";

const MyProfileComponent = () => {
  const navigate = useNavigate();
  const goToProfileSetting = () => {
    navigate("/profilechange");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "32px 28.5px",
        gap: "29px",
      }}
    >
      <div className={styles.MyProfileInfoWrapper}>
        <img src={defaultProfileImg} alt="프로필 사진" />
        <div className={styles.InfoWrapper}>
          <span className={styles.MyName}>김쿠룸</span>
          <span className={styles.MyDepartment}>융합생명공학과</span>
        </div>
      </div>
      <Button onClick={goToProfileSetting} variant="secondary">
        프로필 설정
      </Button>
    </div>
  );
};

export default MyProfileComponent;
