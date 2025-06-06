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
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
  filteringSearch?: () => Promise<void>;
}

const FriendModal: React.FC<FriendModalProps> = ({
  editFriend,
  editFriendId,
  modalState,
  modalType,
  setModalState,
  setRefreshList,
  filteringSearch,
}) => {
  const handleCloseModal = () => setModalState(false);

  // 서버에 각각에 대해 요청
  const handleEditFriend = async () => {
    try {
      switch (modalType) {
        case "accept":
          await acceptRequest(editFriendId);
          break;
        case "refuse":
          await rejectRequest(editFriendId);
          break;
        case "delete":
          await friendDelete(editFriendId.toString());
          break;
        case "block":
          await friendBlock(editFriendId);
          break;
        case "report":
          await friendReport(editFriendId, "아직 모릅니다 ㅎㅎ..");
          break;
      }

      console.log(`${editFriend}의 ${modalType} 완료`);
    } catch (error) {
      console.error(`친구 ${modalType} 중 오류:`, error);
    } finally {
      setModalState(false);
      setRefreshList((prev) => !prev);
      if (filteringSearch) await filteringSearch(); // UI 재반영
    }
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
