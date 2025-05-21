import React from "react";
import styles from "./FriendModal.module.css";
import ReactModal from "react-modal";
import cautionIcon from "../../../assets/icon/editFriend/cautionIcon.svg";
import Button from "../../Button/Button";
import {
  acceptRequest,
  friendBlock,
  friendDelete,
  friendReport,
  rejectRequest,
} from "../../../apis/friend";

interface FriendModalProps {
  editFriend: string;
  editFriendId: number;
  modalState: boolean;
  modalType: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const FriendModal: React.FC<FriendModalProps> = ({
  editFriend,
  editFriendId,
  modalState,
  modalType,
  setModalState,
}) => {
  const handleCloseModal = () => setModalState(false);

  // 서버에 각각에 대해 요청
  const handleEditFriend = async () => {
    switch (modalType) {
      case "delete":
        try {
          const response = await friendDelete(editFriendId.toString());
          console.log(response);
          console.log(editFriend, " 친구 삭제");
        } catch (error) {
          console.error("친구 삭제 중 오류 : ", error);
        }
        break;
      case "block":
        try {
          const response = await friendBlock(editFriendId);
          console.log(response);
          console.log(editFriend, " 친구 차단");
        } catch (error) {
          console.error("친구 차단 중 오류 : ", error);
        }
        break;
      case "report":
        try {
          const response = await friendReport(
            editFriendId,
            "아직 모릅니다 ㅎㅎ.."
          );
          console.log(response);
          console.log(editFriend, " 친구 신고");
        } catch (error) {
          console.error("친구 신고 중 오류 : ", error);
        }
        break;
      case "accept":
        try {
          const response = await acceptRequest(editFriendId);
          console.log(response);
          console.log(editFriend, "의 친구요청 수락");
        } catch (error) {
          console.error("친구 요청 수락 중 오류 : ", error);
        }
        break;
      case "refuse":
        try {
          const response = await rejectRequest(editFriendId);
          console.log(response);
          console.log(editFriend, "의 친구요청 거절");
        } catch (error) {
          console.error("친구 요청 거절 중 오류 : ", error);
        }
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
      case "accept":
        return (
          <span className={styles.BoldText}>친구요청을 수락하시겠습니까?</span>
        );
      case "refuse":
        return (
          <span className={styles.BoldText}>친구요청을 거절하시겠습니까?</span>
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
