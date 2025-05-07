import React from "react";
import styles from "./MyProfileComponent.module.css";
import Button from "../Button/Button";
import defaultProfileImg from "../../assets/defaultProfileImg.svg";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icon/editpencil.svg";
import { useUserStore } from "../../stores/userStore";

interface MyProfileComponentProps {
  isChangeProfile: boolean;
}

const MyProfileComponent: React.FC<MyProfileComponentProps> = ({
  isChangeProfile,
}) => {
  const navigate = useNavigate();
  const nickname = useUserStore((state) => state.user?.nickname);
  const imageUrl = useUserStore((state) => state.user?.imageUrl);
  // const department = useUserStore((state) => state.user?.department);

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
        <div className={styles.ImgWrapper}>
          <img
            src={imageUrl || defaultProfileImg}
            alt="프로필 사진"
            style={
              isChangeProfile
                ? { borderRadius: "65px", border: "2px solid #009733" }
                : {}
            }
          />
          {isChangeProfile && (
            <img src={editIcon} alt="수정하기" className={styles.EditIcon} />
          )}
        </div>

        <div className={styles.InfoWrapper}>
          <span className={styles.MyName}>{nickname}</span>
          {!isChangeProfile && (
            <span className={styles.MyDepartment}>융합생명공학과</span>
          )}
        </div>
      </div>
      {!isChangeProfile && (
        <Button onClick={goToProfileSetting} variant="secondary">
          프로필 설정
        </Button>
      )}
    </div>
  );
};

export default MyProfileComponent;
