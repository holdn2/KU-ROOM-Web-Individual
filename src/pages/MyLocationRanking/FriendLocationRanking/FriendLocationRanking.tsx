import { useLocation } from "react-router-dom";

import kuroomEmptyIcon from "@assets/icon/kuroom-icon/kuroom-gray.svg";
import rank1Icon from "@assets/icon/ranking/rank1.png";
import rank2Icon from "@assets/icon/ranking/rank2.png";
import rank3Icon from "@assets/icon/ranking/rank3.png";
import Header from "@components/Header/Header";

import useFriendRanking from "../hooks/use-friend-ranking";

import styles from "./FriendLocationRankin.module.css";

const FriendLocationRanking = () => {
  const location = useLocation();
  const friendNickname = location.state?.nickname;
  const friendId = location.state?.friendId;

  const { friendRankingData, isPending } = useFriendRanking(friendId);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return rank1Icon;
      case 1:
        return rank2Icon;
      case 2:
        return rank3Icon;
      default:
        return;
    }
  };

  if (isPending) {
    return <div>불러오는 중...</div>;
  }

  return (
    friendRankingData && (
      <div>
        <Header>{friendNickname}</Header>
        <div className={styles.FriendRankingContainer}>
          {friendRankingData.length === 0 ? (
            <div className={styles.EmptyViewContainer}>
              <img src={kuroomEmptyIcon} className={styles.EmptyIcon} />
              <span className={styles.EmptyText}>
                아직 위치를 공유하지 않았어요.
              </span>
            </div>
          ) : (
            // TODO: 우선 3위까지. 추후 변동 가능
            friendRankingData.slice(0, 3).map((item, index) => (
              <div key={index} className={styles.EachRankingContainer}>
                <img
                  className={styles.RankIcon}
                  src={getRankIcon(index)}
                  alt="랭킹 아이콘"
                />
                <div className={styles.EachRankingContentWrapper}>
                  <span className={styles.EachRankLocation}>{item.name}</span>
                  <span className={styles.EachRankCount}>
                    {item.sharingCount}회
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  );
};

export default FriendLocationRanking;
