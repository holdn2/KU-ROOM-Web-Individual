import React from "react";
import styles from "./SearchAddFriend.module.css";
import Button from "../../../shared/components/Button/Button";
import noResultIcon from "../../../assets/icon/noResultSearch.svg";
import defaultImg from "../../../assets/defaultProfileImg.svg";

// 검색 결과 렌더링
interface SearchedFriend {
  userId: number;
  nickname: string;
  imageUrl: string;
  requestSent: boolean;
  requestReceived: boolean;
  isFriend: boolean;
}
interface SearchAddFriendProps {
  searchTarget: string;
  trySearch: boolean;
  filteredUsers: SearchedFriend[];
  handleSendRequest: (id: number) => void;
  handleDeleteRequest: (id: number) => void;
  setAcceptReceiveFriend: (value: string) => void;
  setAcceptReceiveFriendId: (value: number) => void;
  setModalType: (value: string) => void;
  setModalState: (value: boolean) => void;
  refreshList: boolean;
}

const SearchAddFriend: React.FC<SearchAddFriendProps> = ({
  searchTarget,
  trySearch,
  filteredUsers,
  handleSendRequest,
  handleDeleteRequest,
  setAcceptReceiveFriend,
  setAcceptReceiveFriendId,
  setModalType,
  setModalState,
  refreshList,
}) => {
  if (!searchTarget || !trySearch) return null;

  // 친구 요청 수락
  const handleAcceptRequest = (friend: SearchedFriend) => {
    setAcceptReceiveFriend(friend.nickname);
    setAcceptReceiveFriendId(friend.userId);
    setModalType("accept");
    setModalState(true);
  };

  // 친구 요청 거절
  const handleRefuseRequest = (friend: SearchedFriend) => {
    setAcceptReceiveFriend(friend.nickname);
    setAcceptReceiveFriendId(friend.userId);
    setModalType("refuse");
    setModalState(true);
  };

  return (
    <div className={styles.SearchResultContainer}>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => {
          return (
            <div
              key={`${user.userId}-${refreshList}`}
              className={styles.EachFriendContainer}
            >
              <div className={styles.FriendProfileWrapper}>
                {user.imageUrl ? (
                  <img
                    className={styles.ProfileImg}
                    src={user.imageUrl}
                    alt="프로필 사진"
                  />
                ) : (
                  <img
                    className={styles.ProfileImg}
                    src={defaultImg}
                    alt="프로필 사진"
                  />
                )}

                <span className={styles.Nickname}>{user.nickname}</span>
              </div>
              {user.requestReceived ? (
                <div className={styles.AcceptRefuseBtnWrapper}>
                  <Button onClick={() => handleAcceptRequest(user)} size="xs">
                    수락
                  </Button>
                  <Button
                    onClick={() => handleRefuseRequest(user)}
                    size="xs"
                    variant="quaternary"
                  >
                    거절
                  </Button>
                </div>
              ) : (
                <div className={styles.SendRequestBtnWrapper}>
                  {user.requestSent ? (
                    <Button
                      onClick={() => handleDeleteRequest(user.userId)}
                      size="xs"
                      variant="quaternary"
                    >
                      신청취소
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSendRequest(user.userId)}
                      size="xs"
                      variant="primary"
                    >
                      친구신청
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className={styles.NoSearchResultWrapper}>
          <img
            className={styles.NoSearchResultIcon}
            src={noResultIcon}
            alt="검색 결과 없음"
          />
          <span className={styles.NoSearchResultText}>검색 결과가 없어요!</span>
        </div>
      )}
    </div>
  );
};

export default SearchAddFriend;
