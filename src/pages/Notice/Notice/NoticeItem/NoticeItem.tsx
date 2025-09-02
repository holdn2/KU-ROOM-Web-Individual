import type React from "react";

import type { NoticeItem } from "../../types/noticeTypes";
import styles from "./NoticeItem.module.css";

interface NoticeItemProps {
  notice: NoticeItem;
  onItemClick: (noticeId: string) => void;
}

const NoticeItem: React.FC<NoticeItemProps> = ({ notice, onItemClick }) => {
  return (
    <button
      key={notice.id}
      className={styles["notice-item"]}
      onClick={() => onItemClick(notice.id)}
      type="button"
      aria-label={`공지사항: ${notice.title}, 날짜: ${notice.date}`}
    >
      <div className={styles["notice-content"]}>
        <h3 className={styles["notice-item-title"]}>{notice.title}</h3>
        <p className={styles["notice-item-date"]}>{notice.date}</p>
      </div>
    </button>
  );
};

export default NoticeItem;
