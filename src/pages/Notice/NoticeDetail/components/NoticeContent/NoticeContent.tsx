import type { NoticeResponse } from "@apis/notice";
import { useMemo } from "react";
import { formatDescription } from "../../utils/textFormatter";
import { NOTICE_DETAIL_MESSAGES } from "../../constants";
import styles from "./NoticeContent.module.css";

interface NoticeContentProps {
  notice: NoticeResponse;
  onOriginalLinkClick: () => void;
}

export const NoticeContent = ({ notice, onOriginalLinkClick }: NoticeContentProps) => {
  const formattedParagraphs = useMemo(() => formatDescription(notice.description), [notice.description]);
  const dateText = useMemo(() => {
    const d = new Date(notice.pubDate);
    return Number.isNaN(d.getTime())
      ? notice.pubDate
      : d.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
  }, [notice.pubDate]);

  return (
    <div className={styles["notice-content-wrapper"]}>
      <div className={styles["notice-header"]}>
        <h1 className={styles["notice-title"]}>{notice.title}</h1>
        <p className={styles["notice-date"]}>{dateText}</p>
      </div>

      <div className={styles["notice-content"]}>
        {formattedParagraphs.length > 0 ? (
          formattedParagraphs.map((paragraph) => {
            switch (paragraph.type) {
              case 'section':
                return (
                  <div key={paragraph.key} className={styles["section"]}>
                    <h2 className={styles["section-title"]}>{paragraph.content}</h2>
                  </div>
                );
              case 'subtitle':
                return (
                  <div key={paragraph.key} className={styles["subsection"]}>
                    <h3 className={styles["subtitle"]}>{paragraph.content}</h3>
                  </div>
                );
              case 'list':
                return (
                  <div key={paragraph.key} className={styles["list-item-section"]}>
                    <p className={styles["list-item-text"]}>{paragraph.content}</p>
                  </div>
                );
              case 'bullet':
                return (
                  <div key={paragraph.key} className={styles["bullet-section"]}>
                    <p className={styles["bullet-text"]}>{paragraph.content}</p>
                  </div>
                );
              case 'notice':
                return (
                  <div key={paragraph.key} className={styles["notice-section"]}>
                    <p className={styles["notice-text"]}>{paragraph.content}</p>
                  </div>
                );
              case 'special':
                return (
                  <div key={paragraph.key} className={styles["special-title-section"]}>
                    <h2 className={styles["special-title"]}>{paragraph.content}</h2>
                  </div>
                );
              case 'dash-list':
                return (
                  <div key={paragraph.key} className={styles["dash-list-section"]}>
                    <p className={styles["dash-list-text"]}>{paragraph.content}</p>
                  </div>
                );
              case 'line-break':
                return <div key={paragraph.key} className={styles["line-break"]} />;
              default:
                return (
                  <div key={paragraph.key} className={styles["paragraph"]}>
                    <p>{paragraph.content}</p>
                  </div>
                );
            }
          })
        ) : (
          <div className={styles["no-content-message"]}>
            <p>내용이 없습니다.</p>
          </div>
        )}

        <div className={styles["original-link-section"]}>
          <button
            className={styles["original-link-button"]}
            onClick={onOriginalLinkClick}
            type="button"
          >
            {NOTICE_DETAIL_MESSAGES.ORIGINAL_LINK_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
};