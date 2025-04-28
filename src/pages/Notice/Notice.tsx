import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Notice.module.css";
import Select from "../../components/profilesetting/Select/Select";
import BottomSheet from "../../components/profilesetting/BottomSheet/BottomSheet";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import chatbot from "../../assets/icon/chat-bot.svg";
import { departments, colleges } from "../../constants/dummyData";
import NoticeService, {
  initializeBookmarks,
} from "../../services/NoticeService";
import type { NoticeItem } from "../../services/NoticeService";

type DepartmentsType = {
  [key: string]: string[];
};

const Notice = () => {
  const navigate = useNavigate();
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
      "학과",
      "외부",
    ],
    []
  );
  const [activeTab, setActiveTab] = useState("학사");
  const [selectedDepartment, setSelectedDepartment] = useState("국어국문학과");
  const [isDepartmentBottomSheetOpen, setIsDepartmentBottomSheetOpen] =
    useState(false);
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  // 외부 탭을 위한 카테고리 상태
  const externalCategories = useMemo(() => ["사람인", "원티드"], []);
  const [selectedExternalCategory, setSelectedExternalCategory] = useState(
    externalCategories[0]
  );
  const [
    isExternalCategoryBottomSheetOpen,
    setIsExternalCategoryBottomSheetOpen,
  ] = useState(false);

  const typedDepartments = departments as DepartmentsType;

  const allDepartments = useMemo(() => {
    const allDepts: string[] = [];
    for (const college of colleges) {
      if (typedDepartments[college]) {
        allDepts.push(...typedDepartments[college]);
      }
    }
    return allDepts;
  }, [typedDepartments]);

  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  // 북마크 데이터 초기화
  useEffect(() => {
    initializeBookmarks();
  }, []);

  // 카테고리에 따른 공지사항 로드 함수
  const loadNoticesByCategory = useCallback(() => {
    if (activeTab === "학과") {
      // 학과 공지사항은 선택된 학과에 맞게 필터링
      const departmentNotices =
        NoticeService.getNoticesByDepartment(selectedDepartment);
      setNotices(departmentNotices.length > 0 ? departmentNotices : []);
    } else if (activeTab === "외부") {
      // 외부 공지사항은 선택된 카테고리에 맞게 필터링
      const externalNotices = NoticeService.getNoticesByExternalSource(
        selectedExternalCategory
      );
      setNotices(externalNotices.length > 0 ? externalNotices : []);
    } else {
      // 해당 카테고리 공지사항 필터링
      const categoryNotices = NoticeService.getNoticesByCategory(activeTab);
      setNotices(categoryNotices);
    }
  }, [activeTab, selectedDepartment, selectedExternalCategory]);

  // 탭이 변경될 때마다 해당 카테고리의 공지사항 로드
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

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
    setIsDepartmentBottomSheetOpen(false);
  };

  const handleOpenDepartmentBottomSheet = () => {
    setIsDepartmentBottomSheetOpen(true);
  };

  const handleExternalCategorySelect = (category: string) => {
    setSelectedExternalCategory(category);
    setIsExternalCategoryBottomSheetOpen(false);
  };

  const handleOpenExternalCategoryBottomSheet = () => {
    setIsExternalCategoryBottomSheetOpen(true);
  };

  const navigateToNoticeDetail = (noticeId: string) => {
    navigate(`/notice/${activeTab}/${noticeId}`);
  };

  useEffect(() => {
    tabsRef.current = Array(tabs.length).fill(null);
  }, [tabs]);

  const handleSelectKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

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
        {activeTab === "학과" && (
          <div className={styles["department-selector"]}>
            <button
              className={styles["select-wrapper"]}
              onClick={handleOpenDepartmentBottomSheet}
              onKeyDown={(e) =>
                handleSelectKeyDown(e, handleOpenDepartmentBottomSheet)
              }
              type="button"
              aria-label="학과 선택 메뉴 열기"
            >
              <Select
                label=""
                value={selectedDepartment}
                placeholder="학과 선택"
                onClick={handleOpenDepartmentBottomSheet}
              />
            </button>
          </div>
        )}

        {activeTab === "외부" && (
          <div className={styles["department-selector"]}>
            <button
              className={styles["select-wrapper"]}
              onClick={handleOpenExternalCategoryBottomSheet}
              onKeyDown={(e) =>
                handleSelectKeyDown(e, handleOpenExternalCategoryBottomSheet)
              }
              type="button"
              aria-label="카테고리 선택 메뉴 열기"
            >
              <Select
                label=""
                value={selectedExternalCategory}
                placeholder="카테고리 선택"
                onClick={handleOpenExternalCategoryBottomSheet}
              />
            </button>
          </div>
        )}

        <div className={styles["notice-list"]}>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <button
                key={notice.id}
                className={styles["notice-item"]}
                onClick={() => navigateToNoticeDetail(notice.id)}
                type="button"
                aria-label={`공지사항: ${notice.title}, 날짜: ${notice.date}`}
              >
                <div className={styles["notice-content"]}>
                  <h3 className={styles["notice-item-title"]}>
                    {notice.title}
                  </h3>
                  <p className={styles["notice-item-date"]}>{notice.date}</p>
                </div>
              </button>
            ))
          ) : (
            <div className={styles["empty-notices"]}>
              <p>공지사항이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <BottomSheet
        isOpen={isDepartmentBottomSheetOpen}
        onClose={() => setIsDepartmentBottomSheetOpen(false)}
        onApply={() => handleDepartmentSelect(selectedDepartment)}
        title="학과 선택"
        selectedItem={selectedDepartment}
      >
        <div className={styles["bottom-sheet-list"]}>
          {allDepartments.map((department) => (
            <button
              type="button"
              key={department}
              className={`${styles["bottom-sheet-item"]} ${selectedDepartment === department ? styles.selected : ""}`}
              onClick={() => setSelectedDepartment(department)}
              aria-label={`${department} 선택`}
            >
              {department}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isExternalCategoryBottomSheetOpen}
        onClose={() => setIsExternalCategoryBottomSheetOpen(false)}
        onApply={() => handleExternalCategorySelect(selectedExternalCategory)}
        title="카테고리 선택"
        selectedItem={selectedExternalCategory}
      >
        <div className={styles["bottom-sheet-list"]}>
          {externalCategories.map((category) => (
            <button
              type="button"
              key={category}
              className={`${styles["bottom-sheet-item"]} ${selectedExternalCategory === category ? styles.selected : ""}`}
              onClick={() => setSelectedExternalCategory(category)}
              aria-label={`${category} 선택`}
            >
              {category}
            </button>
          ))}
        </div>
      </BottomSheet>

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
