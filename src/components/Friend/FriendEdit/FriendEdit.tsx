import styles from "./FriendEdit.module.css";
import deleteFriendIcon from "../../../assets/icon/editFriend/deleteFriend.svg";
import blockFriendIcon from "../../../assets/icon/editFriend/blockFriend.svg";
import reportFriendIcon from "../../../assets/icon/editFriend/reportFriend.svg";
import React from "react";

interface FriendEditProps {
  editFriend: string;
  onClose: () => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const FriendEdit: React.FC<FriendEditProps> = ({
  onClose,
  setModalType,
  setModalState,
}) => {
  const handleDeleteFriend = () => {
    setModalType("delete");
    setModalState(true);
    onClose();
  };
  const handleBlockFriend = () => {
    setModalType("block");
    setModalState(true);
    onClose();
  };
  const handleReportFriend = () => {
    setModalType("report");
    setModalState(true);
    onClose();
  };
  return (
    <>
      <div className={styles.FriendEditPopupContainer}>
        <button
          className={styles.FriendEditButton}
          onClick={handleDeleteFriend}
        >
          <span className={styles.EditText}>삭제하기</span>
          <img src={deleteFriendIcon} alt="친구 삭제" />
        </button>
        <button className={styles.FriendEditButton} onClick={handleBlockFriend}>
          <span className={styles.EditText}>차단하기</span>
          <img src={blockFriendIcon} alt="친구 차단" />
        </button>
        <button
          className={styles.FriendEditButton}
          onClick={handleReportFriend}
        >
          <span className={styles.EditText} style={{ color: "#F14242" }}>
            신고하기
          </span>
          <img src={reportFriendIcon} alt="친구 신고" />
        </button>
      </div>
    </>
  );
};

export default FriendEdit;
