import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "@components/Header/Header";
import BookmarkIcon from "@assets/headericon/bookmark.svg";
import BookmarkFillIcon from "@assets/headericon/bookmark-fill.svg";
import { getNotices, addBookmark, removeBookmark, type NoticeResponse } from "@apis/notice";
import styles from "./NoticeDetail.module.css";

const NoticeDetail: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<NoticeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        
        // 전체 공지사항을 가져와서 해당 ID의 공지사항 찾기
        const allNotices = await getNotices({ size: 1000 }); // 충분히 많은 수로 설정
        const foundNotice = allNotices.find(n => n.id === parseInt(id));
        
        if (foundNotice) {
          setNotice(foundNotice);
        } else {
          setError("공지사항을 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("공지사항을 불러오는데 실패했습니다.");
        console.error("Failed to fetch notice detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBookmarkToggle = async () => {
    if (!notice) return;
    
    try {
      if (notice.isBookMarked) {
        await removeBookmark(notice.id);
      } else {
        await addBookmark(notice.id);
      }
      
      // 북마크 상태 업데이트
      setNotice(prev => prev ? { ...prev, isBookMarked: !prev.isBookMarked } : null);
    } catch (error) {
      console.error('북마크 토글 실패:', error);
    }
  };

  const handleOriginalLinkClick = () => {
    if (notice?.link) {
      window.open(notice.link, '_blank');
    }
  };


  const formatDescription = (description: string) => {
    if (!description) return null;

    // HTML을 분석해서 p태그와 span태그 구조 파악
    const parseHtmlContent = (html: string) => {
      // p 태그를 줄바꿈으로 처리하고, span 내용을 추출
      let processedHtml = html
        // 특수 문자 디코딩
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');

      // p태그를 줄바꿈으로 변환 (빈 p태그는 줄바꿈으로)
      processedHtml = processedHtml
        .replace(/<p[^>]*>\s*<\/p>/gi, '\n\n') // 빈 p태그 -> 두 줄바꿈 (문단 분리)
        .replace(/<p[^>]*>/gi, '\n\n')         // p태그 시작 -> 두 줄바꿈
        .replace(/<\/p>/gi, '')                // p태그 끝 제거
        .replace(/^\n+/, '')                   // 맨 앞의 줄바꿈 제거
        .replace(/\n{3,}/g, '\n\n');           // 3개 이상의 줄바꿈을 2개로 제한

      // span 태그 내용만 추출
      processedHtml = processedHtml
        .replace(/<span[^>]*>/gi, '')   // span 시작 태그 제거
        .replace(/<\/span>/gi, '');      // span 끝 태그 제거

      // 기타 HTML 태그 제거
      processedHtml = processedHtml
        .replace(/<[^>]*>/g, '')        // 나머지 HTML 태그 제거
        .replace(/\n\s*\n+/g, '\n\n')   // 중복 줄바꿈 정리
        .trim();

      return processedHtml;
    };

    const cleanText = parseHtmlContent(description);

    // 다양한 기준으로 문단 나누기
    const paragraphs = cleanText
      .replace(/\\\\/g, '\n\n')  // 백슬래시 두 개를 줄바꿈으로
      .replace(/\\/g, '\n')      // 백슬래시 하나를 줄바꿈으로
      .split(/(\s{2,}|\n{1,})/)  // 두 개 이상의 공백 또는 줄바꿈으로 분리
      .filter(p => p.trim().length > 0)
      .map(p => p.trim());

    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();
      
      // 빈 문단은 공백으로 처리
      if (trimmedParagraph === '') {
        return <div key={index} className={styles["line-break"]} />;
      }
      
      // ※로 시작하는 주의사항
      if (/^※/.test(trimmedParagraph)) {
        return (
          <div key={index} className={styles["notice-section"]}>
            <p className={styles["notice-text"]}>{trimmedParagraph}</p>
          </div>
        );
      }

      // ❍로 시작하는 항목
      if (/^❍/.test(trimmedParagraph)) {
        return (
          <div key={index} className={styles["bullet-section"]}>
            <p className={styles["bullet-text"]}>{trimmedParagraph}</p>
          </div>
        );
      }

      // 【】로 둘러싸인 제목
      if (/^【.*】/.test(trimmedParagraph)) {
        return (
          <div key={index} className={styles["special-title-section"]}>
            <h4 className={styles["special-title"]}>{trimmedParagraph}</h4>
          </div>
        );
      }

      // - 로 시작하는 리스트 항목
      if (/^-\s/.test(trimmedParagraph)) {
        return (
          <div key={index} className={styles["dash-list-section"]}>
            <p className={styles["dash-list-text"]}>{trimmedParagraph}</p>
          </div>
        );
      }
      
      // 번호로 시작하는 큰 제목 (1., 2., 3. 등)
      if (/^\d+\.\s*[가-힣\s]+$/.test(trimmedParagraph)) {
        return (
          <div key={index} className={styles["section"]}>
            <h3 className={styles["section-title"]}>{trimmedParagraph}</h3>
          </div>
        );
      }
      
      // 소제목 (가., 나., 다. 등)
      if (/^[가-나-다-라-마-바-사]\.\s*/.test(trimmedParagraph)) {
        return (
          <div key={index} className={styles["subsection"]}>
            <h4 className={styles["subtitle"]}>{trimmedParagraph}</h4>
          </div>
        );
      }
      
      // URL이 포함된 텍스트
      if (/https?:\/\/[^\s]+/.test(trimmedParagraph)) {
        const parts = trimmedParagraph.split(/(https?:\/\/[^\s]+)/);
        return (
          <div key={index} className={styles["paragraph"]}>
            <p>
              {parts.map((part, partIndex) => {
                if (/^https?:\/\//.test(part)) {
                  return (
                    <a 
                      key={partIndex} 
                      href={part} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles["link"]}
                    >
                      {part}
                    </a>
                  );
                }
                return part;
              })}
            </p>
          </div>
        );
      }
      
      // 일반 문단
      return (
        <div key={index} className={styles["paragraph"]}>
          <p>{trimmedParagraph}</p>
        </div>
      );
    });
  };

  return (
    <div className={styles["notice-detail-container"]}>
      <div className={styles["header-wrapper"]}>
        <Header>{notice?.categoryName || category || "학사"}</Header>
        <button
          className={styles["back-button"]}
          onClick={handleGoBack}
          aria-label="뒤로가기"
          type="button"
        />
        {notice && (
          <button
            className={styles["bookmark-button"]}
            onClick={handleBookmarkToggle}
            aria-label={`북마크 ${notice.isBookMarked ? '해제' : '추가'}`}
            type="button"
          >
            <img
              src={notice.isBookMarked ? BookmarkFillIcon : BookmarkIcon}
              alt={notice.isBookMarked ? "북마크됨" : "북마크"}
            />
          </button>
        )}
      </div>

      <div className={styles["notice-content-wrapper"]}>
        {loading ? (
          <div className={styles["loading-indicator"]}>
            <p>공지사항을 불러오는 중입니다...</p>
          </div>
        ) : error ? (
          <div className={styles["error-message"]}>
            <p>{error}</p>
            <button onClick={handleGoBack} type="button">
              뒤로가기
            </button>
          </div>
        ) : notice ? (
          <>
            <div className={styles["notice-header"]}>
              <h1 className={styles["notice-title"]}>{notice.title}</h1>
              <p className={styles["notice-date"]}>{notice.pubDate.split(' ')[0]}</p>
            </div>

            <div className={styles["notice-content"]}>
              {notice.link ? (
                <>
                  <div className={styles["notice-description"]}>
                    {notice.description ? formatDescription(notice.description) : (
                      <div className={styles["no-content-message"]}>
                        <p>원본 페이지에서 전체 내용을 확인하세요.</p>
                      </div>
                    )}
                  </div>
                  <div className={styles["original-link-section"]}>
                    <button 
                      className={styles["original-link-button"]}
                      onClick={handleOriginalLinkClick}
                      type="button"
                    >
                      원본 페이지에서 보기
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles["notice-description"]}>
                  {notice.description ? formatDescription(notice.description) : (
                    <p>공지사항 내용을 불러오는 중입니다...</p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeDetail;