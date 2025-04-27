import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import BottomBar from '../../components/BottomBar/BottomBar';
import styles from './Bookmark.module.css';
import arrowBackIcon from '../../assets/nav/arrowback.svg';

interface BookmarkItem {
  id: string;
  category: string;
  title: string;
  date: string;
  timestamp: string;
}

const Bookmark: React.FC = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<Record<string, BookmarkItem>>({});
  const [sortedBookmarks, setSortedBookmarks] = useState<BookmarkItem[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("최신순"); // 기본값은 최신순

  useEffect(() => {
    // 로컬 스토리지에서 북마크 데이터 가져오기
    const storedBookmarks = JSON.parse(localStorage.getItem('noticeBookmarks') || '{}');
    setBookmarks(storedBookmarks);

    sortBookmarks(storedBookmarks, sortOrder);
  }, [sortOrder]);

  const sortBookmarks = (bookmarkData: Record<string, BookmarkItem>, order: string) => {
    const bookmarkArray = Object.values(bookmarkData) as BookmarkItem[];
    let sorted;
    
    if (order === "최신순") {
      sorted = bookmarkArray.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    } else {
      // 북마크 등록순 (오래된 순)
      sorted = bookmarkArray.sort((a, b) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
    }
    
    setSortedBookmarks(sorted);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "최신순" ? "북마크 등록순" : "최신순";
    setSortOrder(newOrder);
  };

  const navigateToNoticeDetail = (category: string, id: string) => {
    navigate(`/notice/${category}/${id}`);
  };

  return (
    <div className={styles['bookmark-container']}>
      <div className={styles['header-wrapper']}>
        <Header>북마크</Header>
        <div className={styles['back-button']} onClick={handleGoBack}>
          <img src={arrowBackIcon} alt="뒤로가기" />
        </div>
        <div className={styles['bookmark-setting']} onClick={toggleSortOrder}>
          {sortOrder} ▼
        </div>
      </div>

      <div className={styles['bookmark-content']}>
        {sortedBookmarks.length > 0 ? (
          <div className={styles['bookmark-list']}>
            {sortedBookmarks.map((bookmark) => (
              <div 
                key={bookmark.id} 
                className={styles['bookmark-item']}
                onClick={() => navigateToNoticeDetail(bookmark.category, bookmark.id)}
              >
                <div className={styles['bookmark-item-content']}>
                  <h3 className={styles['bookmark-item-title']}>{bookmark.title}</h3>
                  <p className={styles['bookmark-item-date']}>{bookmark.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles['empty-bookmarks']}>
            <p>북마크한 공지사항이 없습니다.</p>
          </div>
        )}
      </div>

      <BottomBar />
    </div>
  );
};

export default Bookmark;