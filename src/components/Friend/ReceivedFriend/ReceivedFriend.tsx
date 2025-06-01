import React, { useEffect, useState } from "react";
import styles from "./ReceivedFriend.module.css";
import Button from "../../Button/Button";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import { getReceivedRequests } from "../../../apis/friend";
interface Friend {
  requestId: number;
  fromUserId: number;
  fromUserNickname: string;
  imageUrl: string;
}

interface ReceivedFriendProps {
  setAcceptReceiveFriend: (value: string) => void;
  setAcceptReceiveFriendId: (value: number) => void;
  setModalType: (value: string) => void;
  setModalState: (value: boolean) => void;
  refreshList: boolean;
}

const ReceivedFriend: React.FC<ReceivedFriendProps> = ({
  setAcceptReceiveFriend,
  setAcceptReceiveFriendId,
  setModalType,
  setModalState,
  refreshList,
}) => {
  const [receivedList, setReceivedList] = useState<Friend[]>([]);

  // 초기 요청. 서버에서 받은 요청 데이터 불러오기
  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await getReceivedRequests();
        console.log(response);
        const friends = response ?? [];
        if (!Array.isArray(friends)) {
          setReceivedList([]);
          return [];
        }
        setReceivedList(friends);
        return friends;
      } catch (error) {
        console.error("받은 요청 목록 조회 실패:", error);
      }
    };
    fetchReceivedRequests();
  }, [refreshList]);

  // 친구 요청 수락
  const handleAcceptRequest = (friend: Friend) => {
    setAcceptReceiveFriend(friend.fromUserNickname);
    setAcceptReceiveFriendId(friend.fromUserId);
    setModalType("accept");
    setModalState(true);
  };

  // 친구 요청 거절
  const handleRefuseRequest = (friend: Friend) => {
    setAcceptReceiveFriend(friend.fromUserNickname);
    setAcceptReceiveFriendId(friend.fromUserId);
    setModalType("refuse");
    setModalState(true);
  };
  return (
    !(receivedList.length === 0) && (
      <div className={styles.ReceivedList}>
        <span className={styles.ReceivedTitle}>받은 요청</span>
        {receivedList.map((friend, index) => (
          <div key={index} className={styles.EachFriendContainer}>
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

              <span className={styles.Nickname}>{friend.fromUserNickname}</span>
            </div>
            <div className={styles.AcceptRefuseBtnWrapper}>
              <Button onClick={() => handleAcceptRequest(friend)} size="xs">
                수락
              </Button>
              <Button
                onClick={() => handleRefuseRequest(friend)}
                size="xs"
                variant="quaternary"
              >
                거절
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default ReceivedFriend;
