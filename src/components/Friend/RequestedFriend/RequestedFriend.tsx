import { useEffect, useState } from "react";
import styles from "./RequestedFriend.module.css";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";

// 더미 데이터
const dummyRequestAdd = [
  { id: 1, nickname: "쿠룸", profileImg: defaultImg },
  { id: 2, nickname: "쿠루미", profileImg: defaultImg },
];

interface Friend {
  id: number;
  nickname: string;
  profileImg: string;
}
interface RequestedFriendProps {
  handleDeleteRequest: (id: number) => void;
}

const RequestedFriend = ({ handleDeleteRequest }: RequestedFriendProps) => {
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
            onClick={() => handleDeleteRequest(friend.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RequestedFriend;
