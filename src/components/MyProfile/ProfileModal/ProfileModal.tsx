import React from "react";
import styles from "./ProfileModal.module.css";
import ReactModal from "react-modal";
import Button from "../../Button/Button";
import cautionIcon from "../../../assets/icon/editFriend/cautionIcon.svg";
import { logoutApi, withdrawApi } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";

interface ProfileModalProps {
  modalState: boolean;
  modalType: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  modalState,
  modalType,
  setModalState,
}) => {
  const navigate = useNavigate();
  const handleCloseModal = () => setModalState(false);

  // 서버에 각각 요청
  const handleClick = async () => {
    switch (modalType) {
      case "logout":
        console.log("로그아웃 실행");
        setModalState(false);
        const logoutResponse = await logoutApi();
        console.log(logoutResponse);
        localStorage.clear();
        navigate("/login");

        break;
      case "withdraw":
        console.log("회원 탈퇴 실행");
        setModalState(false);
        const withdrawRepsonse = await withdrawApi();
        console.log(withdrawRepsonse);
        localStorage.clear();

        navigate("/login");
        break;
    }
  };
  const renderModalContent = () => {
    switch (modalType) {
      case "logout":
        return (
          <span className={styles.InformText}>로그아웃 하시겠습니까?</span>
        );
      case "withdraw":
        return (
          <>
            <span className={styles.InformText}>탈퇴하시겠습니까?</span>
            <span className={styles.AdditionalInform}>
              모든 정보는 삭제되며, 되돌릴 수 없습니다.
            </span>
          </>
        );
    }
  };
  return (
    <ReactModal
      isOpen={modalState}
      className={styles.ProfileModalContainer}
      overlayClassName={styles.Overlay}
      ariaHideApp={false}
    >
      <img className={styles.CautionIcon} src={cautionIcon} alt="느낌표" />
      <div className={styles.TextWrapper}>{renderModalContent()}</div>
      <div className={styles.ButtonWrapper}>
        <Button variant="tertiary" onClick={handleCloseModal} size="sm">
          취소
        </Button>
        <Button onClick={handleClick} size="sm">
          확인
        </Button>
      </div>
    </ReactModal>
  );
};

export default ProfileModal;
