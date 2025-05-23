import type React from "react";
import styles from "./NoticeList.module.css";
import NoticeItem from "../NoticeItem/NoticeItem";
import type { NoticeItem as NoticeItemType } from "../../../../services/NoticeService";

interface NoticeListProps {
  notices: NoticeItemType[];
  onItemClick: (noticeId: string) => void;
}

const NoticeList: React.FC<NoticeListProps> = ({ notices, onItemClick }) => {
  if (notices.length === 0) {
    return (
      <div className={styles["empty-notices"]}>
        <p>공지사항이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles["notice-list"]}>
      {notices.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} onItemClick={onItemClick} />
      ))}
    </div>
  );
};

export default NoticeList;
