import React from "react";
import styles from "./SearchAddFriend.module.css";
import Button from "../../../components/Button/Button";
import noResultIcon from "../../../assets/icon/noResultSearch.svg";

// 검색 결과 렌더링
interface User {
  id: number;
  nickname: string;
  studentId: string;
  profileImg: string;
}

interface SearchAddFriendProps {
  searchTarget: string;
  trySearch: boolean;
  filteredUsers: User[];
  searchSentRequests: string[];
  handleSendRequest: (id: number) => void;
  handleDeleteRequest: (id: number) => void;
}

const SearchAddFriend: React.FC<SearchAddFriendProps> = ({
  searchTarget,
  trySearch,
  filteredUsers,
  searchSentRequests,
  handleSendRequest,
  handleDeleteRequest,
}) => {
  if (!searchTarget || !trySearch) return null;

  return (
    <div className={styles.SearchResultContainer}>
      {filteredUsers.length > 0 ? (
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
                {isSent ? (
                  <Button
                    onClick={() => handleDeleteRequest(user.id)}
                    size="xs"
                    variant="quaternary"
                  >
                    신청취소
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSendRequest(user.id)}
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
