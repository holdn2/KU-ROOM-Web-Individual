import React, { useEffect, useState } from "react";
import styles from "./ReceivedFriend.module.css";
import Button from "../../Button/Button";
import defaultImg from "../../../assets/defaultProfileImg.svg";

// 더미 데이터
const dummyReceivedAdd = [
  { nickname: "쿠룸쿠룸", profileImg: defaultImg },
  { nickname: "쿠룸쿠루미", profileImg: defaultImg },
];

interface Friend {
  nickname: string;
  profileImg: string;
}

interface ReceivedFriendProps {
  setAcceptReceiveFriend: (value: string) => void;
  setModalType: (value: string) => void;
  setModalState: (value: boolean) => void;
}

const ReceivedFriend: React.FC<ReceivedFriendProps> = ({
  setAcceptReceiveFriend,
  setModalType,
  setModalState,
}) => {
  const [receivedList, setReceivedList] = useState<Friend[]>([]);

  // 초기 요청. 서버에서 받은 요청 데이터 불러오기
  useEffect(() => {
    setReceivedList(dummyReceivedAdd);
  }, []);

  // 친구 요청 수락
  const handleAcceptRequest = (nickname: string) => {
    setAcceptReceiveFriend(nickname);
    setModalType("accept");
    setModalState(true);
  };

  // 친구 요청 거절
  const handleRefuseRequest = (nickname: string) => {
    setAcceptReceiveFriend(nickname);
    setModalType("refuse");
    setModalState(true);
  };
  return (
    <div className={styles.ReceivedList}>
      <span className={styles.ReceivedTitle}>받은 요청</span>
      {receivedList.map((friend, index) => (
        <div key={index} className={styles.EachFriendContainer}>
          <div className={styles.FriendProfileWrapper}>
            <img
              className={styles.ProfileImg}
              src={friend.profileImg}
              alt="프로필 사진"
            />
            <span className={styles.Nickname}>{friend.nickname}</span>
          </div>
          <div className={styles.AcceptRefuseBtnWrapper}>
            <Button
              onClick={() => handleAcceptRequest(friend.nickname)}
              size="xs"
            >
              수락
            </Button>
            <Button
              onClick={() => handleRefuseRequest(friend.nickname)}
              size="xs"
              variant="quaternary"
            >
              거절
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceivedFriend;
