import { useParams } from "react-router-dom";

import Header from "@/shared/components/Header/Header";
import Rank1Icon from "@assets/icon/ranking/rank1.png";
import Rank2Icon from "@assets/icon/ranking/rank2.png";
import Rank3Icon from "@assets/icon/ranking/rank3.png";
import { useUserStore } from "@/shared/stores/userStore";

import { totalRankMock } from "./total-rank-mock";
import styles from "./LocationTotalRank.module.css";

const LocationTotalRank = () => {
  const { location } = useParams();
  const getUserName = useUserStore((state) => state.getUserName);

  return (
    <div>
      <Header>{location}</Header>
      <div className={styles.TotalRankingPageWrapper}>
        {totalRankMock.total.map((ranker, index) => (
          <div key={index} className={styles.EachRankingContainer}>
            <img
              className={styles.RankIcon}
              src={
                index === 0 ? Rank1Icon : index === 1 ? Rank2Icon : Rank3Icon
              }
              alt="랭킹 아이콘"
            />
            <div className={styles.EachRankingContentWrapper}>
              <span className={styles.UserName}>{ranker.name}</span>
              <span className={styles.RankCount}>{ranker.count}회</span>
            </div>
          </div>
        ))}
        <div className={styles.DotsWrapper}>
          <div className={styles.moredots} />
          <div className={styles.moredots} />
          <div className={styles.moredots} />
        </div>
        <div className={styles.EachRankingContainer}>
          <span className={styles.RankText}>{totalRankMock.user.rank}위</span>
          <div className={styles.EachRankingContentWrapper}>
            <span className={styles.UserName}>{getUserName()}</span>
            <span className={styles.RankCount}>
              {totalRankMock.user.count}회
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTotalRank;
