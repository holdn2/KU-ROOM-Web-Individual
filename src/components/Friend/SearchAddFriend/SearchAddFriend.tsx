import React from "react";
import styles from "./SearchAddFriend.module.css";
import Button from "../../../components/Button/Button";
import noResultIcon from "../../../assets/icon/noResultSearch.svg";
import defaultImg from "../../../assets/defaultProfileImg.svg";

// 검색 결과 렌더링
interface SearchedFriend {
  userId: number;
  nickname: string;
  imageUrl: string;
  requestSent: boolean;
  isFriend: boolean;
}
interface SearchAddFriendProps {
  searchTarget: string;
  trySearch: boolean;
  filteredUsers: SearchedFriend[];
  handleSendRequest: (id: number) => void;
  handleDeleteRequest: (id: number) => void;
}

const SearchAddFriend: React.FC<SearchAddFriendProps> = ({
  searchTarget,
  trySearch,
  filteredUsers,
  handleSendRequest,
  handleDeleteRequest,
}) => {
  if (!searchTarget || !trySearch) return null;

  return (
    <div className={styles.SearchResultContainer}>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, index) => {
          return (
            <div key={index} className={styles.EachFriendContainer}>
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
