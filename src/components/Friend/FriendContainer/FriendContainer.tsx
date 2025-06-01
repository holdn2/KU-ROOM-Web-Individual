import React from "react";
import styles from "./FriendContainer.module.css";
import kebabIcon from "../../../assets/icon/kebabBtn.svg";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import { openFriendEditPopup } from "../../../utils/friendUtils";

interface FriendContainerProps {
  friend: {
    id: number;
    nickname: string;
    imageUrl: string;
  };
  setEditPopupState: React.Dispatch<
    React.SetStateAction<{
      isPopupOpen: boolean;
      popupPosition: { top: number; left: number };
      editFriend: string;
      editFriendId: number;
    }>
  >;
}

const FriendContainer: React.FC<FriendContainerProps> = ({
  friend,
  setEditPopupState,
}) => {
  return (
    <div className={styles.EachFriendContainer}>
      <div className={styles.FriendProfileWrapper}>
        {friend.imageUrl ? (
          <img
            className={styles.ProfileImg}
            src={friend.imageUrl}
            alt="프로필 사진"
          />
        ) : (
          <img
            className={styles.ProfileImg}
            src={defaultImg}
            alt="프로필 사진"
          />
        )}
        <span className={styles.Nickname}>{friend.nickname}</span>
      </div>
      <img
        src={kebabIcon}
        alt="설정"
        onClick={(e) =>
          openFriendEditPopup(e, friend.nickname, friend.id, setEditPopupState)
        }
      />
    </div>
  );
};

export default FriendContainer;
