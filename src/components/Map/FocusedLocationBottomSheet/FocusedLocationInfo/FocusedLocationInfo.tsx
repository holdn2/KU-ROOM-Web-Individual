import React from "react";
import styles from "./FocusedLocationInfo.module.css";

interface LocationDetailInfo {
  imgs: string[];
  title: string;
  subtit: string;
  friends: {
    nickname: string;
    profileImg: string;
  }[];
  info: string;
}

interface FocusedLocationInfo {
  detailInfo: LocationDetailInfo | null;
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
              {detailInfo.title}
            </span>
            <span className={styles.SubTitleText}>{detailInfo.subtit}</span>
          </div>
          <div className={styles.ContentWrapper}>
            {detailInfo.friends.length !== 0 && (
              <div className={styles.FriendWrapper}>
                <span className={styles.FriendTitle}>친구</span>
                <div className={styles.FriendContainer}>
                  {detailInfo.friends.map((friend, index) => (
                    <img
                      key={index}
                      className={styles.FriendProfileImg}
                      src={friend.profileImg}
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
                {detailInfo.info}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FocusedLocationInfo;
