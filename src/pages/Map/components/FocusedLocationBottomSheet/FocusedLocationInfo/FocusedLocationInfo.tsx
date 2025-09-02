import React from "react";

import DefaultProfileImg from "@assets/defaultProfileImg.svg";
import { DetailPlaceData } from "@/shared/types";

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
          <div className={styles.ContentWrapper}>
            {detailInfo.friends.length !== 0 && (
              <div className={styles.FriendSectionWrapper}>
                <span className={styles.FriendTitle}>친구</span>
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
