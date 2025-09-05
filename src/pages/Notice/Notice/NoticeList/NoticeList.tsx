import type React from "react";

import NoticeItem from "../NoticeItem/NoticeItem";
import type { NoticeResponse } from "@apis/notice";
import styles from "./NoticeList.module.css";
interface NoticeListProps {
  notices: NoticeResponse[];
  onItemClick: (noticeId: number) => void;
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
