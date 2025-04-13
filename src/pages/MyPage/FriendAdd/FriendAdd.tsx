import { useEffect, useState } from "react";
import styles from "./FriendAdd.module.css";
import Header from "../../../components/Header/Header";
import FriendSearch from "../../../components/Friend/FriendSearch/FriendSearch";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import FriendModal from "../../../components/Friend/FriendModal/FriendModal";
import RequestedFriend from "../../../components/Friend/RequestedFriend/RequestedFriend";
import ReceivedFriend from "../../../components/Friend/ReceivedFriend/ReceivedFriend";
import SearchAddFriend from "../../../components/Friend/SearchAddFriend/SearchAddFriend";

// 더미 데이터
const dummySearchData = [
  { nickname: "건국", studentId: "202012345", profileImg: defaultImg },
  { nickname: "건쿠", studentId: "202512345", profileImg: defaultImg },
];

const FriendAdd = () => {
  const [searchTarget, setSearchTarget] = useState("");

  const [filteredUsers, setFilteredUsers] = useState<typeof dummySearchData>(
    []
  );
  const [trySearch, setTrySearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [searchSentRequests, setSearchSentRequests] = useState<string[]>([]); // 검색 결과에서 보낸 요청 추적

  const [acceptReceiveFriend, setAcceptReceiveFriend] = useState("");
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    setTrySearch(false);
    setFilteredUsers([]);
  }, [searchTarget]);

  // 검색 시 필터링 로직
  const filteringSearch = () => {
    const result = dummySearchData.filter(
      (user) =>
        user.nickname.includes(searchTarget.trim()) ||
        user.studentId.includes(searchTarget.trim())
    );
    setFilteredUsers(result);
  };

  // 엔터 시 검색 로직
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTrySearch(true);
      filteringSearch();
    }
  };

  // 검색창에 입력 후 다른 곳 클릭했을 때(포커스 잃을 때) 검색되도록
  const handleBlurSearch = () => {
    setTrySearch(true);
    if (searchTarget.trim() === "") {
      setSearchTarget("");
      setIsSearchFocused(false);
      setFilteredUsers([]);
    } else {
      // 포커스를 잃었지만 검색 결과가 아직 없으면 자동 필터링
      filteringSearch();
    }
  };

  // 친구 요청 취소
  const handleDeleteRequest = (nickname: string) => {
    console.log(`${nickname}에게 보낸 요청 삭제`);
  };

  // 검색 결과에서 친구 신청/취소. 서버에 데이터 요청 필요함. 서버와 연계 시 로직 변경 예정.
  const handleSendRequest = (nickname: string) => {
    if (searchSentRequests.includes(nickname)) {
      setSearchSentRequests((prev) => prev.filter((name) => name !== nickname));
      handleDeleteRequest(nickname);
      console.log(`${nickname}에게 친구 신청 취소`);
    } else {
      setSearchSentRequests((prev) => [...prev, nickname]);
      console.log(`${nickname}에게 친구 신청`);
    }
  };

  return (
    <div>
      <Header>친구 추가</Header>
      <div className={styles.FriendAddPageWrapper}>
        <div className={styles.SearchBarContainer}>
          <FriendSearch
            searchTarget={searchTarget}
            setSearchTarget={(value) => {
              setSearchTarget(value);
              setFilteredUsers([]);
            }}
            searchState="add"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={handleBlurSearch}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        {isSearchFocused ? (
          // 검색 결과 렌더링
          <SearchAddFriend
            searchTarget={searchTarget}
            trySearch={trySearch}
            filteredUsers={filteredUsers}
            searchSentRequests={searchSentRequests}
            handleSendRequest={handleSendRequest}
          />
        ) : (
          <div className={styles.FriendAddListWrapper}>
            {/* 보낸 요청 */}
            <RequestedFriend />
            {/* 받은 요청 */}
            <ReceivedFriend
              setAcceptReceiveFriend={setAcceptReceiveFriend}
              setModalType={setModalType}
              setModalState={setModalState}
            />
          </div>
        )}
      </div>

      {/* 수락/거절 모달 */}
      <FriendModal
        editFriend={acceptReceiveFriend}
        modalState={modalState}
        modalType={modalType}
        setModalState={setModalState}
      />
    </div>
  );
};

export default FriendAdd;
