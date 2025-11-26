import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "@/shared/components/Header/Header";
import Rank1Icon from "@assets/icon/ranking/rank1.png";
import Rank2Icon from "@assets/icon/ranking/rank2.png";
import Rank3Icon from "@assets/icon/ranking/rank3.png";

import styles from "./LocationTotalRank.module.css";
import TopRankModal from "./components/TopRankModal";
import { LocationTop3RankType } from "@/shared/types/rankTypes";
import { useLocationTotalRank } from "./hooks/use-location-total-rank";

const LocationTotalRank = () => {
  const { placeName } = useParams();
  const { state } = useLocation();
  const placeId = state?.placeId;

  const {
    listBottomRef,
    top3RankData,
    totalRankData,
    myRankData,
    isPagePending,
  } = useLocationTotalRank(placeId);

  const [modalState, setModalState] = useState(false);
  const [modalRankData, setModalRankData] = useState<
    LocationTop3RankType | undefined
  >(undefined);

  const handleOpenModal = (rankData: LocationTop3RankType) => {
    setModalState(true);
    setModalRankData(rankData);
  };
  const handleCloseModal = () => {
    setModalState(false);
    setModalRankData(undefined);
  };

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

  if (isPagePending) {
    // TODO:로딩 페이지 만들기
    return <div>로딩중...</div>;
  }

  // TODO : 지도 세부 정보 조회 시에도 top 관련 api 사용하도록 수정하기

  return (
    <div>
      <Header>{placeName}</Header>
      <div className={styles.TotalRankingPageWrapper}>
        <div className={styles.TopRankWrapper}>
          {top3RankData &&
            top3RankData.map((rankData) => (
              <button
                type="button"
                key={rankData.ranking}
                className={styles.TopRanksData}
                onClick={() => handleOpenModal(rankData)}
              >
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
                  <div className={styles.TopRanksNameWrapper}>
                    <span className={styles.TopRankerName}>
                      {rankData.nickname[0]}
                    </span>
                    {rankData.nickname.length > 1 && (
                      <span className={styles.RestCount}>
                        외 {rankData.nickname.length - 1}명
                      </span>
                    )}
                  </div>
                  <span className={styles.SharingCount}>
                    {rankData.sharingCount}회
                  </span>
                </div>
              </button>
            ))}
        </div>
        {totalRankData && (
          <div className={styles.LowRankWrapper}>
            {totalRankData.map((rankData) => (
              <div key={rankData.ranking} className={styles.LowRanksData}>
                <span className={styles.LowRanking}>{rankData.ranking}</span>
                <div className={styles.LowRanksInfo}>
                  <span className={styles.RankerName}>{rankData.nickname}</span>
                  <span className={styles.SharingCount}>
                    {rankData.sharingCount}회
                  </span>
                </div>
              </div>
            ))}
            <div
              ref={listBottomRef}
              style={{
                width: "100%",
                height: "1px",
              }}
            />
          </div>
        )}
      </div>

      {myRankData && (
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
      )}
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
