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
  // const department = useUserStore(
  //   (state) => state.user?.departmentResponse[0].departmentName
  // );
  const email = useUserStore((state) => state.user?.email);
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
          {isChangeProfile ? (
            <button onClick={() => console.log("프로필 사진 변경")}>
              <img
                src={imageUrl || defaultProfileImg}
                alt="프로필 사진"
                style={{ borderRadius: "65px", border: "2px solid #009733" }}
              />
            </button>
          ) : (
            <img src={imageUrl || defaultProfileImg} alt="프로필 사진" />
          )}

          {isChangeProfile && (
            <img src={editIcon} alt="수정하기" className={styles.EditIcon} />
          )}
        </div>

        <div className={styles.InfoWrapper}>
          <span className={styles.MyName}>{nickname}</span>
          {!isChangeProfile && (
            <span className={styles.MyDepartment}>{email}</span>
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
