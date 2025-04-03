import { useEffect, useState } from "react";
import styles from "./FriendAdd.module.css";
import Header from "../../../components/Header/Header";
import FriendSearch from "../../../components/Friend/FriendSearch/FriendSearch";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";
import Button from "../../../components/Button/Button";
import FriendModal from "../../../components/Friend/FriendModal/FriendModal";

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
const dummySearchData = [
  {
    nickname: "건국",
    studentId: "202012345",
    profileImg: defaultImg,
  },
  {
    nickname: "건쿠",
    studentId: "202512345",
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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [editFriend, setEditFriend] = useState("");
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  // 서버에서 친구 추가 관련 목록 가져오기
  useEffect(() => {
    setRequestAddFriend(dummyRequestAdd);
    setReceiveAddFriend(dummyReceivedAdd);
  }, []);

  const filteredUsers = dummySearchData.filter(
    (user) =>
      user.nickname.includes(searchTarget) ||
      user.studentId.includes(searchTarget)
  );

  const deleteRequest = (nickname: string) => {
    console.log(nickname, "에게 보낸 요청 삭제");
  };

  const acceptRequest = (nickname: string) => {
    setModalType("accept");
    setEditFriend(nickname);
    setModalState(true);
  };
  const refuseRequest = (nickname: string) => {
    setModalType("refuse");
    setEditFriend(nickname);
    setModalState(true);
  };

  const sendRequest = (nickname: string) => {
    console.log(nickname, "에게 친구 신청");
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
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              if (searchTarget === "") {
                setIsSearchFocused(false);
              }
            }}
          />
        </div>
        {!isSearchFocused ? (
          <>
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
                    </div>
                    <div className={styles.AcceptRefuseBtnWrapper}>
                      <Button
                        onClick={() => acceptRequest(friend.nickname)}
                        size="xs"
                      >
                        수락
                      </Button>
                      <Button
                        onClick={() => refuseRequest(friend.nickname)}
                        size="xs"
                        variant="quaternary"
                      >
                        거절
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          searchTarget && (
            <div className={styles.SearchResultContainer}>
              {filteredUsers.map((user, index) => (
                <div key={index} className={styles.EachFriendContainer}>
                  <div className={styles.FriendProfileWrapper}>
                    <img
                      className={styles.ProfileImg}
                      src={user.profileImg}
                      alt="프로필 사진"
                    />
                    <span className={styles.Nickname}>{user.nickname}</span>
                  </div>
                  <div className={styles.SendRequestBtnWrapper}>
                    <Button
                      onClick={() => sendRequest(user.nickname)}
                      size="xs"
                    >
                      친구신청
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <FriendModal
        editFriend={editFriend}
        modalState={modalState}
        modalType={modalType}
        setModalState={setModalState}
      />
    </div>
  );
};

export default FriendAdd;
