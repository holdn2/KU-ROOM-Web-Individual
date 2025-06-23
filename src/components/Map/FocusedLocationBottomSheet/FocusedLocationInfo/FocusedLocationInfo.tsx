import React from "react";
import styles from "./FocusedLocationInfo.module.css";
import { DetailPlaceData } from "../../../../../types/mapTypes";

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
              {detailInfo.mainTitle}
            </span>
            <span className={styles.SubTitleText}>{detailInfo.subTitle}</span>
          </div>
          <div className={styles.ContentWrapper}>
            {detailInfo.friendList.length !== 0 && (
              <div className={styles.FriendWrapper}>
                <span className={styles.FriendTitle}>친구</span>
                <div className={styles.FriendContainer}>
                  {detailInfo.friendList.map((friend, index) => (
                    <img
                      key={index}
                      className={styles.FriendProfileImg}
                      src={friend.profileURL}
                      alt={friend.nickname}
                    />
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
                {detailInfo.text}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FocusedLocationInfo;
