import type React from "react";
import type { NoticeItem } from "../../../../services/NoticeService";
import styles from "./NoticeList.module.css";

interface NoticeListProps {
  notices: NoticeItem[];
}

const NoticeList: React.FC<NoticeListProps> = ({ notices }) => {
  return (
    <div className={styles.noticeList}>
      {notices.map((notice, index) => (
        <div key={notice.id} className={styles.noticeItem}>
          <span className={styles.noticeNumber}>{index + 1}</span>
          <p className={styles.noticeTitle}>{notice.title}</p>
        </div>
      ))}
    </div>
  );
};

export default NoticeList;
