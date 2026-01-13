import { useEffect, useState } from "react";

import { getSentRequests } from "@apis/friend";
import defaultImg from "@assets/defaultProfileImg.svg";
import deleteIcon from "@assets/icon/deleteIcon.svg";

import styles from "./RequestedFriend.module.css";

interface Friend {
  requestId: number;
  fromUserId: number;
  fromUserNickname: string;
  imageUrl: string;
}

interface RequestedFriendProps {
  handleDeleteRequest: (id: number) => void;
  refreshList: boolean;
  setHasRequested: (value: boolean) => void;
}

const RequestedFriend = ({
  handleDeleteRequest,
  refreshList,
  setHasRequested,
}: RequestedFriendProps) => {
  const [requestList, setRequestList] = useState<Friend[]>([]);

  const fetchSentRequest = async () => {
    try {
      const response = await getSentRequests();
      console.log(response);
      const friends = response ?? [];
      if (!Array.isArray(friends)) {
        setRequestList([]);
        return [];
      }
      setRequestList(friends);
      return friends;
    } catch (error) {
      console.error("보낸 요청 조회 실패 : ", error);
    }
  };

  // 서버에서 보낸 요청 불러오기
  useEffect(() => {
    fetchSentRequest();
  }, [refreshList]);

  useEffect(() => {
    setHasRequested(requestList.length > 0);
  }, [requestList.length, setHasRequested]);

  return (
    !(requestList.length === 0) && (
      <div className={styles.RequestList}>
        <span className={styles.RequestTitle}>보낸 요청</span>
        {requestList.map((friend, index) => (
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
            <img
              className={styles.DeleteIcon}
              src={deleteIcon}
              alt="요청 삭제"
              onClick={() => handleDeleteRequest(friend.fromUserId)}
            />
          </div>
        ))}
      </div>
    )
  );
};

export default RequestedFriend;
