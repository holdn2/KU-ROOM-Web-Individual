import type { NoticeResponse } from "@apis/notice";
import { useMemo } from "react";
import styles from "./NoticeContent.module.css";

interface NoticeContentProps {
  notice: NoticeResponse;
}

export const NoticeContent = ({ notice }: NoticeContentProps) => {
  const dateText = useMemo(() => {
    const d = new Date(notice.pubDate);
    return Number.isNaN(d.getTime())
      ? notice.pubDate
      : d.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
  }, [notice.pubDate]);

  return (
    <div className={styles["notice-content-wrapper"]}>
      <div className={styles["notice-header"]}>
        <h1 className={styles["notice-title"]}>{notice.title}</h1>
        <p className={styles["notice-date"]}>{dateText}</p>
      </div>

      <div className={styles["notice-content"]}>
        {notice.content ? (
          <div
            className={styles["notice-html-content"]}
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />
        ) : (
          <div className={styles["no-content-message"]}>
            <p>콘텐츠가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
