import React from "react";
import styles from "./FriendModal.module.css";
import ReactModal from "react-modal";
import cautionIcon from "../../../assets/icon/editFriend/cautionIcon.svg";
import Button from "../../Button/Button";

interface FriendModalProps {
  editFriend: string;
  modalState: boolean;
  modalType: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const FriendModal: React.FC<FriendModalProps> = ({
  editFriend,
  modalState,
  modalType,
  setModalState,
}) => {
  const handleCloseModal = () => setModalState(false);

  // 서버에 각각에 대해 요청
  const handleEditFriend = () => {
    switch (modalType) {
      case "delete":
        console.log(editFriend, "삭제");
        break;
      case "block":
        console.log(editFriend, "차단");
        break;
      case "report":
        console.log(editFriend, "신고");
        break;
    }
    setModalState(false);
  };

  const renderModalContent = () => {
    const nicknameSpan = <span className={styles.Nickname}>{editFriend}</span>;

    switch (modalType) {
      case "delete":
        return (
          <>
            <span className={styles.InformText}>
              {nicknameSpan} 님을 친구 목록에서
              <br />
              삭제하시겠습니까?
            </span>
            <span className={styles.AdditionalInform}>
              다시 친구로 추가하실 수 있습니다.
            </span>
          </>
        );
      case "block":
        return (
          <span className={styles.InformText}>
            {nicknameSpan} 님을 차단하시겠습니까?
          </span>
        );
      case "report":
        return (
          <span className={styles.InformText}>
            {nicknameSpan} 님을 신고하시겠습니까?
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <ReactModal
      isOpen={modalState}
      className={styles.FriendModalContainer}
      overlayClassName={styles.Overlay}
      ariaHideApp={false}
    >
      <img className={styles.CautionIcon} src={cautionIcon} alt="느낌표" />
      <div className={styles.TextWrapper}>{renderModalContent()}</div>
      <div className={styles.ButtonWrapper}>
        <Button variant="tertiary" onClick={handleCloseModal} size="sm">
          취소
        </Button>
        <Button onClick={handleEditFriend} size="sm">
          확인
        </Button>
      </div>
    </ReactModal>
  );
};

export default FriendModal;
