import { useEffect, useState } from "react";
import styles from "./RequestedFriend.module.css";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";

// 더미 데이터
const dummyRequestAdd = [
  { nickname: "쿠룸", profileImg: defaultImg },
  { nickname: "쿠루미", profileImg: defaultImg },
];

interface Friend {
  nickname: string;
  profileImg: string;
}

const RequestedFriend = () => {
  const handleDeleteRequest = (nickname: string) => {
    console.log(`${nickname}에게 보낸 요청 삭제`);
  };

  const [requestList, setRequestList] = useState<Friend[]>([]);

  // 서버에서 보낸 요청 불러오기
  useEffect(() => {
    setRequestList(dummyRequestAdd);
  }, []);

  return (
    <div className={styles.RequestList}>
      <span className={styles.RequestTitle}>보낸 요청</span>
      {requestList.map((friend, index) => (
        <div key={index} className={styles.EachFriendContainer}>
          <div className={styles.FriendProfileWrapper}>
            <img
              className={styles.ProfileImg}
              src={friend.profileImg}
              alt="프로필 사진"
            />
            <span className={styles.Nickname}>{friend.nickname}</span>
          </div>
          <img
            className={styles.DeleteIcon}
            src={deleteIcon}
            alt="요청 삭제"
            onClick={() => handleDeleteRequest(friend.nickname)}
          />
        </div>
      ))}
    </div>
  );
};

export default RequestedFriend;
