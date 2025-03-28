import { useState } from "react";
import styles from "./HomeNotice.module.css";

const dummyHomeBookMarkData = [
  {
    title: "2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.05",
  },
  {
    title: "2025학년도 복학",
    date: "2025.03.14",
  },
  {
    title: "2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.05",
  },
  {
    title: "2025학년도 휴학",
    date: "2025.03.05",
  },
];

const dummyHomeRecentNoticeData = [
  {
    title: "2025학년도 2학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.05",
  },
  {
    title: "2025학년도 2학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.30",
  },
  {
    title: "2025학년도 휴학",
    date: "2025.03.05",
  },
];

const HomeNotice = () => {
  const [noticeState, setNoticeState] = useState("북마크");
  const toSeeBookmark = () => {
    setNoticeState("북마크");
  };
  const toSeeRecent = () => {
    setNoticeState("최신");
  };

  return (
    <div className={styles.HomeNoticeWrapper}>
      <div className={styles.HomeNoticeCategoryWrapper}>
        <button
          className={`${styles.CategoryTitle} ${
            noticeState !== "북마크" ? styles.CategoryInactive : ""
          }`}
          onClick={toSeeBookmark}
        >
          북마크
        </button>
        <button
          className={`${styles.CategoryTitle} ${
            noticeState !== "최신" ? styles.CategoryInactive : ""
          }`}
          onClick={toSeeRecent}
        >
          최신
        </button>
      </div>
      <div className={styles.HomeNoticeContentWrapper}>
        {noticeState === "북마크"
          ? dummyHomeBookMarkData.map((item, index) => (
              <div key={index} className={styles.HomeNoticeContent}>
                <span className={styles.HomeNoticeTitle}>{item.title}</span>
                <span className={styles.HomeNoticeDate}>{item.date}</span>
              </div>
            ))
          : dummyHomeRecentNoticeData.map((item, index) => (
              <div key={index} className={styles.HomeNoticeContent}>
                <span className={styles.HomeNoticeTitle}>{item.title}</span>
                <span className={styles.HomeNoticeDate}>{item.date}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default HomeNotice;
