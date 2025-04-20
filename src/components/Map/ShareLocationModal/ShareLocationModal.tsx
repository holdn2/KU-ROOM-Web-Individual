import React from "react";
import styles from "./ShareLocationModal.module.css";
import ReactModal from "react-modal";
import Button from "../../Button/Button";
import cautionIcon from "../../../assets/icon/editFriend/cautionIcon.svg";

interface ShareLocationModalProps {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSharedLocation: (value: boolean) => void;
}

const ShareLocationModal: React.FC<ShareLocationModalProps> = ({
  modalState,
  setModalState,
  setIsSharedLocation,
}) => {
  const handleCloseModal = () => setModalState(false);

  // 서버에 각각 요청
  const handleClick = () => {
    console.log("서버에 공유 요청");
    setIsSharedLocation(true);
    setModalState(false);
  };

  return (
    <ReactModal
      isOpen={modalState}
      className={styles.LocationShareModalContainer}
      overlayClassName={styles.Overlay}
      ariaHideApp={false}
    >
      <img className={styles.CautionIcon} src={cautionIcon} alt="느낌표" />
      <div className={styles.TextWrapper}>
        <span className={styles.InformText}>내 위치를 공유하시겠습니까?</span>
        <span className={styles.AdditionalInform}>
          친구들에게 현재 위치가 공유됩니다.
        </span>
      </div>
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

export default ShareLocationModal;
