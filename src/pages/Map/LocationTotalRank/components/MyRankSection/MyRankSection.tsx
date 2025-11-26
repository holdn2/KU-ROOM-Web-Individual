import { LocationTotalRankType } from "@/shared/types/rankTypes";
import styles from "./MyRankSection.module.css";

interface MyRankSectionProps {
  myRankData?: LocationTotalRankType;
}

export default function MyRankSection({ myRankData }: MyRankSectionProps) {
  return (
    myRankData && (
      <div className={styles.MyRankContainer}>
        <span className={styles.LowRanking}>
          {myRankData.ranking === -1 ? "-" : myRankData.ranking}
        </span>
        <div className={styles.LowRanksInfo}>
          <span className={styles.RankerName}>{myRankData.nickname}</span>
          <span className={styles.SharingCount}>
            {myRankData.sharingCount}회
          </span>
        </div>
      </div>
    )
  );
}
