import Header from "../../../components/Header/Header";
import styles from "./FriendList.module.css";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import { useEffect, useRef, useState } from "react";
import FriendEdit from "../../../components/Friend/FriendEdit/FriendEdit";
import FriendSearch from "../../../components/Friend/FriendSearch/FriendSearch";
import FriendModal from "../../../components/Friend/FriendModal/FriendModal";
import { useOutsideClick } from "../../../utils/friendUtils";
import FriendContainer from "../../../components/Friend/FriendContainer/FriendContainer";

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
  const [searchNickname, setSearchNickname] = useState("");

  // 검색어가 포함되어 필터링된 친구 목록
  const filteredFriends = friendList.filter((friend) =>
    friend.nickname.includes(searchNickname)
  );

  // 친구 수정 관련 상태
  const [editPopupState, setEditPopupState] = useState<{
    isPopupOpen: boolean;
    popupPosition: { top: number; left: number };
    editFriend: string;
  }>({
    isPopupOpen: false,
    popupPosition: { top: 0, left: 0 },
    editFriend: "",
  });

  // 친구 삭제, 차단, 신고하기 팝업 관련 상태
  const popupRef = useRef<HTMLDivElement | null>(null);

  // 친구 관련 수정 모달 상태
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  // 서버에서 친구 목록 가져오기
  useEffect(() => {
    setFriendList(dummyFriendList);
  }, []);

  // 팝업 외부 클릭 시 닫기
  useEffect(() => {
    useOutsideClick(popupRef, editPopupState.isPopupOpen, () => {
      setEditPopupState((prev) => ({
        ...prev,
        isPopupOpen: false,
      }));
    });
  }, [editPopupState.isPopupOpen]);

  return (
    <div>
      <Header>친구 목록</Header>
      <div className={styles.FriendListPageWrapper}>
        <div className={styles.SearchBarContainer}>
          <FriendSearch
            searchTarget={searchNickname}
            setSearchTarget={setSearchNickname}
          />
        </div>
        <div className={styles.FriendListWrapper}>
          {(searchNickname ? filteredFriends : friendList).map(
            (friend, index) => (
              <div key={index}>
                <FriendContainer
                  friend={friend}
                  setEditPopupState={setEditPopupState}
                />
              </div>
            )
          )}
        </div>
      </div>

      {editPopupState.isPopupOpen && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: editPopupState.popupPosition.top,
            left: editPopupState.popupPosition.left,
            zIndex: 100,
          }}
        >
          <FriendEdit
            editFriend={editPopupState.editFriend}
            onClose={() =>
              setEditPopupState((prev) => ({
                ...prev,
                isPopupOpen: false,
              }))
            }
            setModalType={setModalType}
            setModalState={setModalState}
          />
        </div>
      )}
      <FriendModal
        editFriend={editPopupState.editFriend}
        modalState={modalState}
        modalType={modalType}
        setModalState={setModalState}
      />
    </div>
  );
};

export default FriendList;
