import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "@/shared/components/Header/Header";
import { getLocationTotalRank } from "@/apis/map";
import Rank1Icon from "@assets/icon/ranking/rank1.png";
import Rank2Icon from "@assets/icon/ranking/rank2.png";
import Rank3Icon from "@assets/icon/ranking/rank3.png";

import styles from "./LocationTotalRank.module.css";
import TopRankModal from "./TopRankModal";

export interface RankDataType {
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
  const [modalState, setModalState] = useState(false);
  const [modalRankData, setModalRankData] = useState<RankDataType | undefined>(
    undefined
  );

  const handleOpenModal = (rankData: RankDataType) => {
    setModalState(true);
    setModalRankData(rankData);
  };
  const handleCloseModal = () => {
    setModalState(false);
    setModalRankData(undefined);
  };

  const getCurrentLocationTotalRank = async () => {
    try {
      const response = await getLocationTotalRank(Number(placeId), 1, 10);
      setTotalRankData(response);
    } catch (error) {
      console.error("현재 위치 랭킹 조회 시 클라측 오류 : ", error);
    }
  };
  useEffect(() => {
    getCurrentLocationTotalRank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(totalRankData);
  }, [totalRankData]);

  const rankIconBg = (ranking: number) => {
    switch (ranking) {
      case 1:
        return "#F8DDDC";
      case 2:
        return "#DEE9FB";
      case 3:
        return "#FCEED7";
    }
  };
  const rankIcon = (ranking: number) => {
    switch (ranking) {
      case 1:
        return Rank1Icon;
      case 2:
        return Rank2Icon;
      case 3:
        return Rank3Icon;
    }
  };

  return (
    <div>
      <Header>{placeName}</Header>
      <div className={styles.TotalRankingPageWrapper}>
        {totalRankData && (
          <>
            <div className={styles.TopRankWrapper}>
              {totalRankData.slice(0, 3).map((rankData) => (
                <div key={rankData.ranking} className={styles.TopRanksData}>
                  <div
                    className={styles.RankIconSection}
                    style={{
                      backgroundColor: `${rankIconBg(rankData.ranking)}`,
                    }}
                  >
                    <img
                      className={styles.RankIcon}
                      src={rankIcon(rankData.ranking)}
                      alt="등수 아이콘"
                    />
                  </div>
                  <div className={styles.TopRanksInfo}>
                    <button
                      type="button"
                      className={styles.TopRanksNameWrapper}
                      onClick={() => handleOpenModal(rankData)}
                    >
                      <span className={styles.TopRankerName}>
                        {rankData.nickname[0]}
                      </span>
                      {/* {rankData.nickname.length > 1 && ( */}
                      <span className={styles.RestCount}>
                        외 {rankData.nickname.length - 1}명
                      </span>
                      {/* )} */}
                    </button>
                    <span className={styles.SharingCount}>
                      {rankData.sharingCount}회
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.LowRankWrapper}>
              {totalRankData.slice(3).map((rankData) => (
                <div key={rankData.ranking} className={styles.LowRanksData}>
                  <span className={styles.LowRanking}>{rankData.ranking}</span>
                  <div className={styles.LowRanksInfo}>
                    <span className={styles.RankerName}>
                      {rankData.nickname}
                    </span>
                    <span className={styles.SharingCount}>
                      {rankData.sharingCount}회
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <TopRankModal
        modalState={modalState}
        placeName={placeName}
        rankData={modalRankData}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default LocationTotalRank;
