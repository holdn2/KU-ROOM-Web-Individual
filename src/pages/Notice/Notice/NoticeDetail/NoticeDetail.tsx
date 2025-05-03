import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import styles from "./NoticeDetail.module.css";
import bookmarkIcon from "../../../../assets/headericon/bookmark.svg";
import bookmarkFillIcon from "../../../../assets/headericon/bookmark-fill.svg";
import NoticeService from "../../../../services/NoticeService";

const NoticeDetail: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [noticeData, setNoticeData] = useState<{
    title: string;
    date: string;
  }>({
    title: "",
    date: "",
  });

  // 리다이렉트 URL 생성 함수
  const getRedirectUrl = (noticeId: string) => {
    // 실제 건국대학교 공지사항 URL 형식에 맞게 수정 필요
    return `https://www.konkuk.ac.kr/kr/cms/notice/detail.do?noticeId=${noticeId}`;
  };

  useEffect(() => {
    if (id) {
      // 공지사항 데이터 가져오기
      const notice = NoticeService.getNoticeById(id);
      if (notice) {
        setNoticeData({
          title: notice.title,
          date: notice.date,
        });
      }

      // 북마크 상태 확인
      setIsBookmarked(NoticeService.isBookmarked(id));
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleBookmark = () => {
    if (id) {
      // 북마크 상태 토글 처리
      const newBookmarkState = NoticeService.toggleBookmark(id);
      setIsBookmarked(newBookmarkState);
    }
  };

  const handleRedirect = () => {
    if (id) {
      window.open(getRedirectUrl(id), "_blank");
    }
  };

  return (
    <div className={styles["notice-detail-container"]}>
      <div className={styles["header-wrapper"]}>
        <Header>{category || "학사"}</Header>
        <button
          className={styles["back-button"]}
          onClick={handleGoBack}
          aria-label="뒤로가기"
          type="button"
        />
        <button
          className={styles["bookmark-button"]}
          onClick={toggleBookmark}
          aria-label={isBookmarked ? "북마크 제거" : "북마크 추가"}
          type="button"
        >
          <img
            src={isBookmarked ? bookmarkFillIcon : bookmarkIcon}
            alt="북마크"
          />
        </button>
      </div>

      <div className={styles["notice-content-wrapper"]}>
        <div className={styles["notice-header"]}>
          <h1 className={styles["notice-title"]}>{noticeData.title}</h1>
          <p className={styles["notice-date"]}>{noticeData.date}</p>
        </div>

        <div className={styles["notice-redirect"]}>
          <p>공지사항의 상세 내용을 확인하려면 아래 버튼을 클릭하세요.</p>
          <button
            className={styles["redirect-button"]}
            onClick={handleRedirect}
            type="button"
          >
            공지사항 원문 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
