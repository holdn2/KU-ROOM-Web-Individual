import type React from "react";

import notificationIcon from "@assets/icon/notice/search/bell.svg";

import styles from "./NotificationBadge.module.css";

interface NotificationBadgeProps {
  keyword: string;
  isSubscribed: boolean;
  onToggle: () => void;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  keyword,
  isSubscribed,
  onToggle,
}) => {
  return (
    <div className={styles.notificationContainer}>
      {isSubscribed ? (
        <button
          className={styles.subscribedBadge}
          onClick={onToggle}
          type="button"
        >
          <img src={notificationIcon} alt="알림" className={styles.icon} />
          <span className={styles.badgeText}>알림 받는 중</span>
        </button>
      ) : (
        <button
          className={styles.subscribeBadge}
          onClick={onToggle}
          type="button"
        >
          <img src={notificationIcon} alt="알림" className={styles.icon} />
          <span className={styles.badgeText}>{keyword} 알림 받기</span>
        </button>
      )}
    </div>
  );
};

export default NotificationBadge;
