import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import defaultProfileImg from "@assets/defaultProfileImg.svg";
import editIcon from "@assets/icon/editpencil.svg";
import Button from "@components/Button/Button";
import { useUserStore } from "@stores/userStore";
import useToast from "@hooks/use-toast";
import BottomSheet from "@components/BottomSheet/BottomSheet";

import styles from "./MyProfileComponent.module.css";

interface MyProfileComponentProps {
  isChangeProfile: boolean;
}

const MyProfileComponent: React.FC<MyProfileComponentProps> = ({
  isChangeProfile,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  // 로컬 미리보기 URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const toast = useToast();

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

  const handleOpenProfileImageSheet = () => {
    setIsOpen(true);
  };
  const handleCloseProfileImageSheet = () => {
    setIsOpen(false);
  };

  const handleClickImage = () => {
    imageInputRef.current?.click();
  };

  const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/svg+xml"]);
  const ALLOWED_EXT = new Set(["png", "jpg", "jpeg", "svg"]);

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = (file.name.split(".").pop() ?? "").toLowerCase();

    const okByMime = file.type ? ALLOWED_MIME.has(file.type) : false;
    const okByExt = ALLOWED_EXT.has(ext);

    // 이미지 파일만 허용 체크
    if (!okByMime && !okByExt) {
      toast.error("JPG, JPEG, PNG, SVG 파일만 업로드할 수 있어요.");
      e.target.value = "";
      return;
    }

    // 미리 보기
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return localUrl;
    });

    // TODO: 여기서 서버 업로드 로직 연결

    e.target.value = "";
    setIsOpen(false);
  };

  const handleApplyDefaultImage = () => {
    // TODO: 서버에 기본 이미지 적용 요청
    console.log("기본 이미지 적용");
  };

  const displayImage = previewUrl || imageUrl || defaultProfileImg;

  return (
    <>
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
                  accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
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
