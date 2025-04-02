import Header from "../../../components/Header/Header";
import styles from "./FriendList.module.css";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import kebabIcon from "../../../assets/icon/kebabBtn.svg";
import { useEffect, useRef, useState } from "react";
import FriendEdit from "../../../components/Friend/FriendEdit/FriendEdit";
import FriendSearch from "../../../components/Friend/FriendSearch/FriendSearch";
import FriendModal from "../../../components/Friend/FriendModal/FriendModal";

const dummyFriendList = [
  {
    nickname: "쿠룸",
    profileImg: defaultImg,
  },
  {
    nickname: "쿠루미",
    profileImg: defaultImg,
  },
  {
    nickname: "건국대",
    profileImg: defaultImg,
  },
  {
    nickname: "휴학생",
    profileImg: defaultImg,
  },
];

interface Friend {
  nickname: string;
  profileImg: string;
}

const FriendList = () => {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [editFriend, setEditFriend] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchNickname, setSearchNickname] = useState("");
  // 검색어가 포함된 친구 목록 필터링
  const filteredFriends = friendList.filter((friend) =>
    friend.nickname.includes(searchNickname)
  );

  // 친구 삭제, 차단, 신고하기 팝업 관련 상태
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement | null>(null);

  // 친구 관련 수정 모달 상태
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  // 케밥 버튼을 눌렀을 때 팝업이 뜨도록 하는 로직
  const handleFriendEdit = (nickname: string, event: React.MouseEvent) => {
    const friendContainer = (
      event.target as HTMLElement
    ).getBoundingClientRect();
    setPopupPosition({
      top: friendContainer.bottom + window.scrollY,
      left: friendContainer.left,
    });
    setEditFriend(nickname);
    setIsPopupOpen(true);
  };

  // 서버에서 친구 목록 가져오기
  useEffect(() => {
    setFriendList(dummyFriendList);
  }, []);

  // 팝업 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div>
      <Header>친구 목록</Header>
      <div className={styles.FriendListPageWrapper}>
        <div className={styles.SearchBarContainer}>
          <FriendSearch
            searchTarget={searchNickname}
            setSearchTarget={setSearchNickname}
            searchState="list"
          />
        </div>
        <div className={styles.FriendListWrapper}>
          {(searchNickname ? filteredFriends : friendList).map(
            (friend, index) => (
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
                  src={kebabIcon}
                  alt="설정"
                  onClick={(e) => handleFriendEdit(friend.nickname, e)}
                />
              </div>
            )
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: popupPosition.top + 15,
            left: popupPosition.left - 200,
            zIndex: 1000,
          }}
        >
          <FriendEdit
            editFriend={editFriend}
            onClose={() => setIsPopupOpen(false)}
            setModalType={setModalType}
            setModalState={setModalState}
          />
        </div>
      )}
      <FriendModal
        editFriend={editFriend}
        modalState={modalState}
        modalType={modalType}
        setModalState={setModalState}
      />
    </div>
  );
};

export default FriendList;
