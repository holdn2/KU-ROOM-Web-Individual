import React from "react";
import styles from "./FriendContainer.module.css";
import kebabIcon from "../../../assets/icon/kebabBtn.svg";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import { openFriendEditPopup } from "../../../utils/friendUtils";

interface FriendContainerProps {
  friend: {
    id: number;
    nickname: string;
    profileImg: string;
  };
  setEditPopupState: React.Dispatch<
    React.SetStateAction<{
      isPopupOpen: boolean;
      popupPosition: { top: number; left: number };
      editFriend: string;
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
        {friend.profileImg === "" ? (
          <img
            className={styles.ProfileImg}
            src={defaultImg}
            alt="기본 프로필 사진"
          />
        ) : (
          <img
            className={styles.ProfileImg}
            src={friend.profileImg}
            alt="프로필 사진"
          />
        )}
        <span className={styles.Nickname}>{friend.nickname}</span>
      </div>
      <img
        src={kebabIcon}
        alt="설정"
        onClick={(e) =>
          openFriendEditPopup(e, friend.nickname, setEditPopupState)
        }
      />
    </div>
  );
};

export default FriendContainer;
