import React from "react";
import { useNavigate } from "react-router-dom";

import defaultProfileImg from "@assets/defaultProfileImg.svg";
import editIcon from "@assets/icon/editpencil.svg";
import Button from "@components/Button/Button";

import { useUserProfile } from "../../hooks/use-user-profile";

import styles from "./MyProfileComponent.module.css";

interface MyProfileComponentProps {
  isChangeProfile: boolean;
}

const MyProfileComponent: React.FC<MyProfileComponentProps> = ({
  isChangeProfile,
}) => {
  const { userProfileData, isPendingUserProfile } = useUserProfile();

  const navigate = useNavigate();

  const profileImage = userProfileData?.profileImage || defaultProfileImg;

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
      {isPendingUserProfile ? (
        <div>로딩중...</div>
      ) : (
        <div className={styles.MyProfileInfoWrapper}>
          <div className={styles.ImgWrapper}>
            {isChangeProfile ? (
              <button onClick={() => console.log("프로필 사진 변경")}>
                <img
                  src={profileImage}
                  alt="프로필 사진"
                  style={{ borderRadius: "65px", border: "2px solid #009733" }}
                />
              </button>
            ) : (
              <img src={profileImage} alt="프로필 사진" />
            )}

            {isChangeProfile && (
              <img src={editIcon} alt="수정하기" className={styles.EditIcon} />
            )}
          </div>

          <div className={styles.InfoWrapper}>
            <span className={styles.MyName}>{userProfileData?.nickname}</span>
            {!isChangeProfile && (
              <span className={styles.MyDepartment}>
                {userProfileData?.email}
              </span>
            )}
          </div>
        </div>
      )}

      {!isChangeProfile && (
        <Button onClick={goToProfileSetting} variant="secondary">
          프로필 설정
        </Button>
      )}
    </div>
  );
};

export default MyProfileComponent;
