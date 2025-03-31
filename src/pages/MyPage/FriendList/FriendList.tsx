import Header from "../../../components/Header/Header";
import styles from "./FriendList.module.css";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import kebabIcon from "../../../assets/icon/kebabBtn.svg";
import { useEffect, useRef, useState } from "react";
import FriendEdit from "../../../components/Friend/FriendEdit/FriendEdit";
import FriendSearch from "../../../components/Friend/FriendSearch/FriendSearch";

const dummyFriendList = [
  {
    nickname: "쿠룸",
    profileImg: defaultImg,
  },
  {
    nickname: "쿠루미",
    profileImg: defaultImg,
  },
];

const FriendList = () => {
  const [editFriend, setEditFriend] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchNickname, setSearchNickname] = useState("");

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleFriendEdit = (nickname: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setPopupPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    setEditFriend(nickname);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    console.log("찾을 닉네임 : ", searchNickname);
  }, [searchNickname]);

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
            searchNickname={searchNickname}
            setSearchNickname={setSearchNickname}
            searchState="list"
          />
        </div>
        <div className={styles.FriendListWrapper}>
          {dummyFriendList.map((friend, index) => (
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
          ))}
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
          />
        </div>
      )}
    </div>
  );
};

export default FriendList;
