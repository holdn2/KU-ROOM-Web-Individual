import { useEffect, useState } from "react";

import {
  cancelRequest,
  getSearchedNewFriends,
  requestFriend,
} from "@apis/friend";
import Header from "@components/Header/Header";

import FriendSearch from "../components/FriendSearch/FriendSearch";
import FriendModal from "../components/FriendModal/FriendModal";
import RequestedFriend from "./components/RequestedFriend/RequestedFriend";
import ReceivedFriend from "./components/ReceivedFriend/ReceivedFriend";
import SearchAddFriend from "./components/SearchAddFriend/SearchAddFriend";
import styles from "./FriendAdd.module.css";

interface SearchedFriend {
  userId: number;
  nickname: string;
  imageUrl: string;
  requestSent: boolean;
  requestReceived: boolean;
  isFriend: boolean;
}

const FriendAdd = () => {
  const [searchTarget, setSearchTarget] = useState("");

  const [refreshList, setRefreshList] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState<SearchedFriend[]>([]);
  const [trySearch, setTrySearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [hasRequested, setHasRequested] = useState(false);
  const [hasReceived, setHasReceived] = useState(false);

  const [acceptReceiveFriend, setAcceptReceiveFriend] = useState("");
  const [acceptReceiveFriendId, setAcceptReceiveFriendId] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    setTrySearch(false);
    setFilteredUsers([]);
  }, [searchTarget]);

  // 검색 시 로직. 서버에 요청해야함.
  const filteringSearch = async () => {
    try {
      const response = await getSearchedNewFriends(searchTarget);
      // console.log(response);
      // 이미 친구인 유저 제외
      const filtered = response.filter(
        (user: SearchedFriend) => !user.isFriend
      );
      setFilteredUsers(filtered);
    } catch (error) {
      console.error("친구 검색 실패 : ", error);
    }
  };

  // 엔터 시 검색 로직
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTrySearch(true);
      if (searchTarget.trim() === "") {
        setSearchTarget("");
        setIsSearchFocused(false);
        setFilteredUsers([]);
      } else {
        filteringSearch();
      }
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
  const handleDeleteRequest = async (id: number) => {
    try {
      const response = await cancelRequest(id);
      console.log(response);
      setRefreshList((prev) => !prev);
      if (filteredUsers.length > 0) await filteringSearch();
    } catch (error) {
      console.error("친구요청 취소 실패 :", error);
    }
  };

  // 검색 결과에서 친구 신청/취소. 서버에 데이터 요청 필요함. 서버와 연계 시 로직 변경 예정.
  const handleSendRequest = async (id: number) => {
    try {
      const response = await requestFriend(id);
      console.log(response);
      setRefreshList((prev) => !prev);
      await filteringSearch();
    } catch (error) {
      console.error("친구요청 실패 :", error);
    }
  };

  return (
    <>
      <Header>친구 추가</Header>
      <div className={styles.FriendAddPageWrapper}>
        <div className={styles.SearchBarContainer}>
          <FriendSearch
            searchTarget={searchTarget}
            setSearchTarget={(value) => {
              setSearchTarget(value);
              setFilteredUsers([]);
            }}
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
            handleSendRequest={handleSendRequest}
            handleDeleteRequest={handleDeleteRequest}
            setAcceptReceiveFriend={setAcceptReceiveFriend}
            setAcceptReceiveFriendId={setAcceptReceiveFriendId}
            setModalType={setModalType}
            setModalState={setModalState}
            refreshList={refreshList}
          />
        ) : (
          <div className={styles.FriendAddListWrapper}>
            {/* 보낸 요청 */}
            <RequestedFriend
              handleDeleteRequest={handleDeleteRequest}
              refreshList={refreshList}
              setHasRequested={setHasRequested}
            />
            {hasRequested && hasReceived && (
              <div className={styles.separator} />
            )}
            {/* 받은 요청 */}
            <ReceivedFriend
              setAcceptReceiveFriend={setAcceptReceiveFriend}
              setAcceptReceiveFriendId={setAcceptReceiveFriendId}
              setModalType={setModalType}
              setModalState={setModalState}
              refreshList={refreshList}
              setHasReceived={setHasReceived}
            />
          </div>
        )}
      </div>

      {/* 수락/거절 모달 */}
      <FriendModal
        editFriend={acceptReceiveFriend}
        editFriendId={acceptReceiveFriendId}
        modalState={modalState}
        modalType={modalType}
        setModalState={setModalState}
        setRefreshList={setRefreshList}
      />
    </>
  );
};

export default FriendAdd;
