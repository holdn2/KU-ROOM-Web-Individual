import { useEffect, useState } from "react";
import styles from "./FriendAdd.module.css";
import Header from "../../../components/Header/Header";
import FriendSearch from "../../../components/Friend/FriendSearch/FriendSearch";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";

const dummyRequestAdd = [
  {
    nickname: "쿠룸",
    profileImg: defaultImg,
  },
  {
    nickname: "쿠루미",
    profileImg: defaultImg,
  },
];
const dummyReceivedAdd = [
  {
    nickname: "쿠룸쿠룸",
    profileImg: defaultImg,
  },
  {
    nickname: "쿠룸쿠루미",
    profileImg: defaultImg,
  },
];

interface Friend {
  nickname: string;
  profileImg: string;
}

const FriendAdd = () => {
  const [requestAddFriend, setRequestAddFriend] = useState<Friend[]>([]);
  const [receiveAddFriend, setReceiveAddFriend] = useState<Friend[]>([]);
  const [searchTarget, setSearchTarget] = useState("");

  // 서버에서 친구 추가 관련 목록 가져오기
  useEffect(() => {
    setRequestAddFriend(dummyRequestAdd);
    setReceiveAddFriend(dummyReceivedAdd);
  }, []);

  const deleteRequest = (nickname: string) => {
    console.log(nickname, "에게 보낸 요청 삭제");
  };

  return (
    <div>
      <Header>친구 추가</Header>
      <div className={styles.FriendAddPageWrapper}>
        <div className={styles.SearchBarContainer}>
          <FriendSearch
            searchTarget={searchTarget}
            setSearchTarget={setSearchTarget}
            searchState="add"
          />
        </div>
        <div className={styles.FriendAddListWrapper}>
          <div className={styles.RequestList}>
            <span className={styles.RequestTitle}>보낸 요청</span>
            {requestAddFriend.map((friend, index) => (
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
                  alt="설정"
                  onClick={() => deleteRequest(friend.nickname)}
                />
              </div>
            ))}
          </div>
          <div className={styles.ReceivedList}>
            <span className={styles.RequestTitle}>받은 요청</span>
            {receiveAddFriend.map((friend, index) => (
              <div key={index} className={styles.EachFriendContainer}>
                <div className={styles.FriendProfileWrapper}>
                  <img
                    className={styles.ProfileImg}
                    src={friend.profileImg}
                    alt="프로필 사진"
                  />
                  <span className={styles.Nickname}>{friend.nickname}</span>
                  <div className={styles.AcceptRefuseBtnWrapper}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendAdd;
