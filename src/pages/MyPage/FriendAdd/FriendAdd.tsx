import { useEffect, useState } from "react";
import styles from "./FriendAdd.module.css";
import Header from "../../../components/Header/Header";
import FriendSearch from "../../../components/Friend/FriendSearch/FriendSearch";
import defaultImg from "../../../assets/defaultProfileImg.svg";
import deleteIcon from "../../../assets/icon/deleteIcon.svg";
import Button from "../../../components/Button/Button";
import FriendModal from "../../../components/Friend/FriendModal/FriendModal";

// 더미 데이터
const dummyRequestAdd = [
  { nickname: "쿠룸", profileImg: defaultImg },
  { nickname: "쿠루미", profileImg: defaultImg },
];
const dummyReceivedAdd = [
  { nickname: "쿠룸쿠룸", profileImg: defaultImg },
  { nickname: "쿠룸쿠루미", profileImg: defaultImg },
];
const dummySearchData = [
  { nickname: "건국", studentId: "202012345", profileImg: defaultImg },
  { nickname: "건쿠", studentId: "202512345", profileImg: defaultImg },
];

interface Friend {
  nickname: string;
  profileImg: string;
}

const FriendAdd = () => {
  const [requestList, setRequestList] = useState<Friend[]>([]);
  const [receivedList, setReceivedList] = useState<Friend[]>([]);
  const [searchTarget, setSearchTarget] = useState("");

  const [filteredUsers, setFilteredUsers] = useState<typeof dummySearchData>(
    []
  );
  const [trySearch, setTrySearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [searchSentRequests, setSearchSentRequests] = useState<string[]>([]); // 검색 결과에서 보낸 요청 추적

  const [editFriend, setEditFriend] = useState("");
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  // 초기 요청 데이터 불러오기
  useEffect(() => {
    setRequestList(dummyRequestAdd);
    setReceivedList(dummyReceivedAdd);
  }, []);

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

  // 친구 요청 수락
  const handleAcceptRequest = (nickname: string) => {
    setModalType("accept");
    setEditFriend(nickname);
    setModalState(true);
  };

  // 친구 요청 거절
  const handleRefuseRequest = (nickname: string) => {
    setModalType("refuse");
    setEditFriend(nickname);
    setModalState(true);
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

  // 보낸 요청 렌더링
  const renderRequestList = () => (
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

  // 받은 요청 렌더링
  const renderReceivedList = () => (
    <div className={styles.ReceivedList}>
      <span className={styles.RequestTitle}>받은 요청</span>
      {receivedList.map((friend, index) => (
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
              onClick={() => handleAcceptRequest(friend.nickname)}
              size="xs"
            >
              수락
            </Button>
            <Button
              onClick={() => handleRefuseRequest(friend.nickname)}
              size="xs"
              variant="quaternary"
            >
              거절
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  // 검색 결과 렌더링
  const renderSearchResults = () => (
    <div className={styles.SearchResultContainer}>
      {searchTarget &&
        trySearch &&
        (filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => {
            const isSent = searchSentRequests.includes(user.nickname);
            return (
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
                    onClick={() => handleSendRequest(user.nickname)}
                    size="xs"
                    variant={isSent ? "quaternary" : "primary"}
                  >
                    {isSent ? "신청취소" : "친구신청"}
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div>검색 결과가 없습니다.</div>
        ))}
    </div>
  );

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
          renderSearchResults()
        ) : (
          <div className={styles.FriendAddListWrapper}>
            {renderRequestList()}
            {renderReceivedList()}
          </div>
        )}
      </div>

      {/* 수락/거절 모달 */}
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
