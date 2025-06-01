import Header from "../../../components/Header/Header";
import styles from "./FriendList.module.css";
import { useEffect, useRef, useState } from "react";
import FriendEdit from "../../../components/Friend/FriendEdit/FriendEdit";
import FriendSearch from "../../../components/Friend/FriendSearch/FriendSearch";
import FriendModal from "../../../components/Friend/FriendModal/FriendModal";
import { useOutsideClick } from "../../../utils/friendUtils";
import FriendContainer from "../../../components/Friend/FriendContainer/FriendContainer";
import { getAllFriends } from "../../../apis/friend";
import { useNavigate } from "react-router-dom";
// import PullToRefresh from "../../../components/PullToRefresh/PullToRefresh";
// import { reissueTokenApi } from "../../../apis/axiosInstance";

interface Friend {
  id: number;
  nickname: string;
  imageUrl: string;
}

const FriendList = () => {
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [searchNickname, setSearchNickname] = useState("");

  const [refreshList, setRefreshList] = useState(false);

  // const getNewToken = async () => {
  //   try {
  //     await reissueTokenApi();
  //   } catch (error) {
  //     console.error("토큰 재발급 실패 : ", error);
  //     navigate("/login");
  //   }
  // };

  // 검색어가 포함되어 필터링된 친구 목록
  const filteredFriends = friendList.filter((friend) =>
    friend.nickname.includes(searchNickname)
  );

  // 친구 수정 관련 상태
  const [editPopupState, setEditPopupState] = useState<{
    isPopupOpen: boolean;
    popupPosition: { top: number; left: number };
    editFriend: string;
    editFriendId: number;
  }>({
    isPopupOpen: false,
    popupPosition: { top: 0, left: 0 },
    editFriend: "",
    editFriendId: 0,
  });

  // 친구 삭제, 차단, 신고하기 팝업 관련 상태
  const popupRef = useRef<HTMLDivElement | null>(null);

  // 친구 관련 수정 모달 상태
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  // 서버에서 친구 목록 가져오기
  useEffect(() => {
    const getMyFriends = async () => {
      try {
        const response = await getAllFriends();
        console.log(response);
        const friends = response ?? [];
        if (!Array.isArray(friends)) {
          setFriendList([]);
          return [];
        }
        setFriendList(friends);

        return friends;
      } catch (error) {
        console.error("친구 목록 불러오기 실패", error);
      }
    };

    getMyFriends();
  }, [refreshList]);

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
      {/* <PullToRefresh onRefresh={getNewToken} maxDistance={80}> */}
      <div className={styles.FriendListPageWrapper}>
        <div className={styles.SearchBarContainer}>
          <FriendSearch
            searchTarget={searchNickname}
            setSearchTarget={setSearchNickname}
          />
        </div>
        <div className={styles.FriendListWrapper}>
          {friendList.length === 0 ? (
            <div className={styles.NoFriendsContainer}>
              <span>현재 친구가 없습니다!</span>
              <span
                className={styles.ToFriendAdd}
                onClick={() => navigate("/friendadd")}
              >
                친구 추가하러 가기
              </span>
            </div>
          ) : (
            (searchNickname ? filteredFriends : friendList).map(
              (friend, index) => (
                <div key={index}>
                  <FriendContainer
                    friend={friend}
                    setEditPopupState={setEditPopupState}
                  />
                </div>
              )
            )
          )}
        </div>
      </div>
      {/* </PullToRefresh> */}

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
        editFriendId={editPopupState.editFriendId}
        modalState={modalState}
        modalType={modalType}
        setModalState={setModalState}
        setRefreshList={setRefreshList}
      />
    </div>
  );
};

export default FriendList;
