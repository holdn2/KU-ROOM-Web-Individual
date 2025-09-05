import { useState, useRef, useEffect, useMemo, useCallback } from "react";

import chatbot from "@assets/icon/chat-bot.svg";
import Header from "@components/Header/Header";
import BottomBar from "@components/BottomBar/BottomBar";
import NoticeList from "../components/NoticeList/NoticeList";
import { getCategoryId } from "@constant/categoryMapping";

import { getNotices, type NoticeResponse } from "../../../apis/notice";
import styles from "./Notice.module.css";

const Notice = () => {
  const tabs = useMemo(
    () => [
      "학사",
      "장학",
      "취창업",
      "국제",
      "학생",
      "일반",
      "신학",
      "도서관",
    ],
    []
  );
  const [activeTab, setActiveTab] = useState("학사");
  const [notices, setNotices] = useState<NoticeResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  const loadNoticesByCategory = useCallback(async () => {
    const categoryId = getCategoryId(activeTab);
    if (!categoryId) return;

    setLoading(true);
    try {
      const response = await getNotices({
        categoryId,
        size: 20,
      });
      console.log("API 응답:", response);
      console.log("응답 타입:", typeof response);
      console.log("배열 여부:", Array.isArray(response));
      setNotices(response);
    } catch (error) {
      console.error("공지사항 로드 실패:", error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadNoticesByCategory();
  }, [loadNoticesByCategory]);

  useEffect(() => {
    const activeTabIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabsRef.current[activeTabIndex];

    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  useEffect(() => {
    tabsRef.current = Array(tabs.length).fill(null);
  }, [tabs]);


  return (
    <div className={styles["notice-container"]}>
      <div className={styles["fixed-header"]}>
        <Header>공지사항</Header>
      </div>

      <div className={styles["category-section"]}>
        <div className={styles["notice-tabs-container"]}>
          <div className={styles["notice-tabs"]}>
            {tabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => {
                  tabsRef.current[index] = el;
                }}
                className={`${styles["notice-tab"]} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <div
            className={styles["active-tab-indicator"]}
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={styles["scrollable-content"]}>
        <NoticeList
          notices={notices}
          loading={loading}
          showBookmarkButton={false}
          showSortOptions={false}
          emptyMessage="공지사항이 없습니다."
        />
      </div>

      <button
        className={styles["chat-button"]}
        type="button"
        aria-label="챗봇 열기"
      >
        <img src={chatbot} alt="챗봇" />
      </button>

      <BottomBar />
    </div>
  );
};

export default Notice;