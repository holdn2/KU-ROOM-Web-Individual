import styles from "./FriendEdit.module.css";
import deleteFriendIcon from "../../../assets/icon/editFriend/deleteFriend.svg";
import blockFriendIcon from "../../../assets/icon/editFriend/blockFriend.svg";
import reportFriendIcon from "../../../assets/icon/editFriend/reportFriend.svg";
import React from "react";

interface FriendEditProps {
  editFriend: string;
  onClose: () => void;
}

const FriendEdit: React.FC<FriendEditProps> = ({ editFriend, onClose }) => {
  const handleDeleteFriend = () => {
    console.log(editFriend, " 삭제");
    onClose();
  };
  const handleBlockFriend = () => {
    console.log(editFriend, " 차단");
    onClose();
  };
  const handleReportFriend = () => {
    console.log(editFriend, " 신고");
    onClose();
  };
  return (
    <div className={styles.FriendEditPopupContainer}>
      <button className={styles.FriendEditButton} onClick={handleDeleteFriend}>
        <span className={styles.EditText}>삭제하기</span>
        <img src={deleteFriendIcon} alt="친구 삭제" />
      </button>
      <button className={styles.FriendEditButton} onClick={handleBlockFriend}>
        <span className={styles.EditText}>차단하기</span>
        <img src={blockFriendIcon} alt="친구 차단" />
      </button>
      <button className={styles.FriendEditButton} onClick={handleReportFriend}>
        <span className={styles.EditText} style={{ color: "#F14242" }}>
          신고하기
        </span>
        <img src={reportFriendIcon} alt="친구 신고" />
      </button>
    </div>
  );
};

export default FriendEdit;
