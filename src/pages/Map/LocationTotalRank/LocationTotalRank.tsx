import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "@/shared/components/Header/Header";
import { getLocationTotalRank } from "@/apis/map";
// import Rank1Icon from "@assets/icon/ranking/rank1.png";
// import Rank2Icon from "@assets/icon/ranking/rank2.png";
// import Rank3Icon from "@assets/icon/ranking/rank3.png";

import styles from "./LocationTotalRank.module.css";

interface RankDataType {
  ranking: number;
  nickname: string[];
  sharingCount: number;
}

const LocationTotalRank = () => {
  const { placeName } = useParams();
  const { state } = useLocation();
  const placeId = state?.placeId;

  const [totalRankData, setTotalRankData] = useState<RankDataType[] | null>(
    null
  );

  const getCurrentLocationTotalRank = async () => {
    try {
      const response = await getLocationTotalRank(Number(placeId), 1, 5);
      setTotalRankData(response);
    } catch (error) {
      console.error("현재 위치 랭킹 조회 시 클라측 오류 : ", error);
    }
  };
  useEffect(() => {
    getCurrentLocationTotalRank();
  }, []);

  useEffect(() => {
    console.log(totalRankData);
  }, [totalRankData]);

  return (
    <div>
      <Header>{placeName}</Header>
      <div className={styles.TotalRankingPageWrapper}>
        <div className={styles.LowRankWrapper}>
          {totalRankData &&
            totalRankData.map((rankData) => (
              <div key={`${rankData.nickname}`} className={styles.LowRanksData}>
                <span className={styles.LowRanking}>{rankData.ranking}</span>
                <div className={styles.LowRanksInfo}>
                  <span className={styles.RankerName}>{rankData.nickname}</span>
                  <span className={styles.SharingCount}>
                    {rankData.sharingCount}회
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LocationTotalRank;
