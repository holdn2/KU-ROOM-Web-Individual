import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./NoticeDetail.module.css";
import bookmarkIcon from "../../assets/headericon/bookmark.svg";
import bookmarkFillIcon from "../../assets/headericon/bookmark-fill.svg";
import NoticeService from "../../services/NoticeService";

const NoticeDetail: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [noticeData, setNoticeData] = useState<{
    title: string;
    date: string;
    content: string;
  }>({
    title: "",
    date: "",
    content: "",
  });

  // 컴포넌트 마운트 시 공지사항 데이터 및 북마크 상태 불러오기
  useEffect(() => {
    if (id) {
      // 공지사항 데이터 가져오기
      const notice = NoticeService.getNoticeById(id);
      if (notice) {
        setNoticeData({
          title: notice.title,
          date: notice.date,
          content:
            notice.content ||
            `${notice.title}에 대한 상세 내용입니다.
          
교무처 학사팀에서는 2025학년도 1학기 학부 수강정정 및 초과과목 신청 및 처리 방법을 다음과 같이 안내합니다.

1. 수강정정 및 초과과목 신청/승인 기간: 3. 4.(화) 09:30 ~ 3. 10.(월) 17:00까지
※ 대상: 전체학생
※ 초과과목 추가 수강신청의 경우 교강사의 승인 및 시스템 입력까지 위 기한 내 완료되어야 함.

2. 수강정정 및 초과과목 신청, 처리 절차 및 방법

1) 수강인원 여석이 존재하는 교과목
☐ 학생: 온라인으로 수강신청 가능 (수강신청화면: http://sugang.konkuk.ac.kr)

2) 수강인원 초과 교과목
☐ 서울권역e러닝 교과목: 추가 수강신청 불가

☐ (위의 경우를 제외한 교과목의 경우) 학생
가. 수강신청 초과 교과목을 추가 수강신청 하고자 하는 학생은 '수강인원 초과 교과목 추가 수강신청 요청서(본 게시물에 첨부된 파일)'를 작성하여 담당 교강사에게 제출하여 승인을 얻어야 합니다.
※ 요청서를 첫 수업시간(수강정정기간 내)에 담당 교강사에게 직접 제출 원칙
※ 단, 첫 주차 수업이 비대면으로 진행되는 등 직접 제출이 불가한 경우, 강의계획서에 기재된 교강사 이메일로 제출 가능`,
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

        <div className={styles["notice-content"]}>
          {noticeData.content.split("\n\n").map((paragraph, idx) => {
            const paragraphId = `paragraph-${idx}-${paragraph.substring(0, 10).replace(/\s+/g, "-")}`;
            return (
              <p key={paragraphId} className={styles["content-paragraph"]}>
                {paragraph.split("\n").map((line, lineIdx) => {
                  const lineId = `line-${idx}-${lineIdx}-${line.substring(0, 8).replace(/\s+/g, "-")}`;
                  return (
                    <React.Fragment key={lineId}>
                      {line}
                      {lineIdx < paragraph.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
