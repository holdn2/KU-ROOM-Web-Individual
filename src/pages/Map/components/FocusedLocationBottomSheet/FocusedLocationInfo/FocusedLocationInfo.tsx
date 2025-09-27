import React from "react";
import { useNavigate } from "react-router-dom";

import DefaultProfileImg from "@assets/defaultProfileImg.svg";
import Rank1Icon from "@assets/icon/ranking/rank1.png";
import Rank2Icon from "@assets/icon/ranking/rank2.png";
import Rank3Icon from "@assets/icon/ranking/rank3.png";
import ArrowRight from "@assets/nav/arrowRight.svg";
import { DetailPlaceData } from "@/shared/types";

import { totalRankMock } from "./total-rank-mock";
import styles from "./FocusedLocationInfo.module.css";

interface FocusedLocationInfo {
  detailInfo: DetailPlaceData | null;
  isExpandedFocusedSheet: boolean;
  setIsExpandedFocusedSheet: (value: boolean) => void;
}

const FocusedLocationInfo: React.FC<FocusedLocationInfo> = ({
  detailInfo,
  isExpandedFocusedSheet,
  setIsExpandedFocusedSheet,
}) => {
  const navigate = useNavigate();

  const handleNavigateToTotalRank = () => {
    navigate(`/map/location-total-rank/${detailInfo?.name}`);
  };

  return (
    <div className={styles.DetailInfoWrapper}>
      {detailInfo && (
        <>
          <div className={styles.TitleWrapper}>
            <span
              className={styles.TitleText}
              onClick={() => setIsExpandedFocusedSheet(true)}
            >
              {detailInfo.name}
            </span>
            <span className={styles.SubTitleText}>{detailInfo.subName}</span>
          </div>
          {isExpandedFocusedSheet && (
            <div className={styles.TotalRankWrapper}>
              {totalRankMock.map((rankData, index) => (
                <div key={rankData.name} className={styles.RankContainer}>
                  {index === 0 ? (
                    <img style={{ width: "43px" }} src={Rank1Icon} />
                  ) : index === 1 ? (
                    <img style={{ width: "43px" }} src={Rank2Icon} />
                  ) : (
                    <img style={{ width: "43px" }} src={Rank3Icon} />
                  )}
                  <span className={styles.Ranker}>{rankData.name}</span>
                </div>
              ))}
              <img
                className={styles.TotalRankNav}
                src={ArrowRight}
                onClick={handleNavigateToTotalRank}
              />
            </div>
          )}
          <div className={styles.ContentWrapper}>
            {detailInfo.friends.length !== 0 && (
              <div className={styles.FriendSectionWrapper}>
                <span className={styles.FriendTitle}>
                  {detailInfo.name}에 있는 친구
                </span>
                <div className={styles.FriendContainerWrapper}>
                  {detailInfo.friends.map((friend) => (
                    <div
                      key={friend.nickname}
                      className={styles.FriendContainer}
                    >
                      <img
                        className={styles.FriendProfileImg}
                        src={friend.profileURL ?? DefaultProfileImg}
                        alt={friend.nickname}
                      />
                      <span className={styles.FriendNickname}>
                        {friend.nickname}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.InfoWrapper}>
              <span className={styles.InfoTitle}>정보</span>
              <span
                className={`${styles.InfoContent} ${
                  !isExpandedFocusedSheet ? styles.InfoContentClamp : ""
                }`}
              >
                {detailInfo.content}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FocusedLocationInfo;
