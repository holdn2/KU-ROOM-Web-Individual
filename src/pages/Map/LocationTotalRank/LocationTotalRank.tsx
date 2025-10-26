import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "@/shared/components/Header/Header";
// import Rank1Icon from "@assets/icon/ranking/rank1.png";
// import Rank2Icon from "@assets/icon/ranking/rank2.png";
// import Rank3Icon from "@assets/icon/ranking/rank3.png";

import styles from "./LocationTotalRank.module.css";

type LocationState = { placeId: number };

const LocationTotalRank = () => {
  // const navigate = useNavigate();
  const { place } = useParams();
  const location = useLocation();

  const placeId = (location.state as LocationState | null)?.placeId ?? [];

  useEffect(() => {
    // TODO: placeId를 통해 api 요청
    console.info(placeId);
  }, []);

  return (
    <div>
      <Header>{place}</Header>
      <div className={styles.TotalRankingPageWrapper}>
        <span>api 연동예정</span>
        {/* {top3Data.map((ranker) => (
          <div key={ranker.ranking} className={styles.EachRankingContainer}>
            <img
              className={styles.RankIcon}
              src={
                ranker.ranking === 1
                  ? Rank1Icon
                  : ranker.ranking === 2
                    ? Rank2Icon
                    : Rank3Icon
              }
              alt="랭킹 아이콘"
            />
            <div className={styles.EachRankingContentWrapper}>
              <div className={styles.NicknameWrapper}>
                {ranker.nickname.map((nickname) => (
                  <span key={nickname} className={styles.UserName}>
                    {nickname}
                  </span>
                ))}
              </div>

              <span className={styles.RankCount}>{ranker.sharingCount}회</span>
            </div>
          </div>
        ))}
        {myRank[0].ranking > 3 && (
          <>
            <div className={styles.DotsWrapper}>
              <div className={styles.moredots} />
              <div className={styles.moredots} />
              <div className={styles.moredots} />
            </div>
            <div className={styles.EachRankingContainer}>
              <span className={styles.RankText}>{myRank[0].ranking}위</span>
              <div className={styles.EachRankingContentWrapper}>
                <span className={styles.UserName}>{myRank[0].nickname}</span>
                <span className={styles.RankCount}>
                  {myRank[0].sharingCount}회
                </span>
              </div>
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default LocationTotalRank;
