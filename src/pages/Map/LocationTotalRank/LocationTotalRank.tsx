import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "@/shared/components/Header/Header";

import styles from "./LocationTotalRank.module.css";
import { LocationTop3RankType } from "@/shared/types/rankTypes";
import { useLocationTotalRank } from "./hooks/use-location-total-rank";
import TopRankModal from "@pages/Map/LocationTotalRank/components/TopRankModal/TopRankModal";
import TopRankSection from "@pages/Map/LocationTotalRank/components/TopRankSection/TopRankSection";
import LowRankSection from "@pages/Map/LocationTotalRank/components/LowRankSection/LowRankSection";
import MyRankSection from "./components/MyRankSection/MyRankSection";

const LocationTotalRank = () => {
  const { placeName } = useParams();
  const { state } = useLocation();
  const placeId = state?.placeId;

  // TODO: 추후 toast 및 접근 방지 추가
  // if (!placeId) {
  //   alert("장소 ID가 잘못되었습니다.");
  //   throw new Error();
  // }

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

  if (isPagePending) {
    // TODO:로딩 페이지 만들기
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <Header>{placeName}</Header>
      <div className={styles.TotalRankingPageWrapper}>
        <TopRankSection
          top3RankData={top3RankData}
          handleOpenModal={handleOpenModal}
        />
        <LowRankSection
          totalRankData={totalRankData}
          listBottomRef={listBottomRef}
        />
      </div>
      <MyRankSection myRankData={myRankData} />
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
