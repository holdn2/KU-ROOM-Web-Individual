import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import defaultProfileImg from "@assets/defaultProfileImg.svg";
import editIcon from "@assets/icon/editpencil.svg";
import Button from "@components/Button/Button";

import { useUserProfile } from "../../hooks/use-user-profile";

import styles from "./MyProfileComponent.module.css";
import BottomSheet from "@/shared/components/BottomSheet/BottomSheet";
import useProfileImage from "../../hooks/use-profile-image";

interface MyProfileComponentProps {
  isChangeProfile: boolean;
}

const MyProfileComponent: React.FC<MyProfileComponentProps> = ({
  isChangeProfile,
}) => {
  const { userProfileData, isPendingUserProfile } = useUserProfile();

  const navigate = useNavigate();

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const {
    isOpen,
    handleOpenProfileImageSheet,
    handleCloseProfileImageSheet,
    handleChangeFile,
    handleApplyDefaultImage,
  } = useProfileImage();

  const goToProfileSetting = () => {
    navigate("/profilechange");
  };

  const handleClickImage = async () => {
    imageInputRef.current?.click();
  };

  const displayImage = userProfileData?.profileImage || defaultProfileImg;

  return (
    <>
      {isPendingUserProfile ? (
        <div>로딩중...</div>
      ) : (
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
                <>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                    onChange={handleChangeFile}
                    style={{ display: "none" }}
                  />
                  <button type="button" onClick={handleOpenProfileImageSheet}>
                    <img
                      className={styles.EditProfileImg}
                      src={displayImage}
                      alt="프로필 사진"
                    />
                  </button>
                </>
              ) : (
                <img
                  className={styles.ProfileImg}
                  src={displayImage}
                  alt="프로필 사진"
                />
              )}

              {isChangeProfile && (
                <img
                  src={editIcon}
                  alt="수정하기"
                  className={styles.EditIcon}
                />
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
          {!isChangeProfile && (
            <Button onClick={goToProfileSetting} variant="secondary">
              프로필 설정
            </Button>
          )}
        </div>
      )}
      <BottomSheet
        isOpen={isOpen}
        handleCloseBottomSheet={handleCloseProfileImageSheet}
        sheetHeight={200}
      >
        <div className={styles.SheetContentWrapper}>
          <div className={styles.SheetContent} onClick={handleClickImage}>
            앨범에서 사진/동영상 선택
          </div>
          <div className={styles.Separator} />
          <div
            className={styles.SheetContent}
            onClick={handleApplyDefaultImage}
          >
            기본 이미지 적용
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default MyProfileComponent;
