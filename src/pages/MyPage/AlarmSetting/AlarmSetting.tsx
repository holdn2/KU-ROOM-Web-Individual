import { useEffect, useState, useRef } from "react";

import Header from "@components/Header/Header";
import { getKeywords, toggleKeyword } from "@apis/notice";
import useToast from "@hooks/use-toast";

import ProfileSection from "@pages/MyPage/components/ProfileSection/ProfileSection";
import ToggleAlarmButton from "@pages/MyPage/components/ToggleAlarmButton";

import { ALARM_SECTION_DATA } from "./constant/alarm";
import useAlarmSettingQuery from "./hooks/use-alarm-setting-query";
import useAlarmSettingMutation from "./hooks/use-alarm-setting-mutation";
import styles from "./AlarmSetting.module.css";
import { ALARM_CATEGORY } from "./types/alarm-type";

const AlarmSetting = () => {
  const toast = useToast();
  const [keywords, setKeywords] = useState<{ keyword: string }[]>([]);
  const hasLoadedKeywords = useRef(false);

  const { toggleStates, isPending } = useAlarmSettingQuery();
  const { updateAlarmActiveStatus } = useAlarmSettingMutation();

  useEffect(() => {
    const loadKeywords = async () => {
      if (hasLoadedKeywords.current) return;
      hasLoadedKeywords.current = true;

      try {
        const keywordList = await getKeywords();
        setKeywords(keywordList.map((keyword) => ({ keyword })));
      } catch (error) {
        console.error("키워드 조회 실패:", error);
      }
    };

    loadKeywords();
  }, []);

  const handleDeleteKeyword = async (target: string) => {
    try {
      await toggleKeyword(target);
      setKeywords((prev) => prev.filter((k) => k.keyword !== target));
      toast.info("키워드가 삭제되었어요");
    } catch (error) {
      console.error("키워드 삭제 실패:", error);
      toast.error("키워드 삭제에 실패했어요");
    }
  };

  const handleToggle = (item: string) => {
    let category: string;

    switch (item) {
      case "친구 신청":
        category = ALARM_CATEGORY.NEW_FRIEND_REQUEST;
        break;
      case "친구 위치 공유":
        category = ALARM_CATEGORY.NEW_FRIEND_PLACE_SHARING;
        break;
      case "새로운 공지 업로드":
        category = ALARM_CATEGORY.NEW_NOTICE;
        break;
      case "공지 키워드 알림":
        category = ALARM_CATEGORY.NEW_KEYWORD_NOTICE;
        break;
      case "순위 변동 알림":
        category = ALARM_CATEGORY.RENEW_RANK_PLACE;
        break;
      default:
        category = "";
        break;
    }
    updateAlarmActiveStatus(category);
  };

  if (isPending) {
    // TODO: 로딩 화면 보여주기
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <Header>알림 설정</Header>
      <div className={styles.AlarmSettingPage}>
        <div className={styles.EntireAlarmToggleSection}>
          <span className={styles.SectionTitle}>전체</span>
          <div className={styles.ContentWrapper}>
            <span className={styles.ContentName}>전체 알림</span>
            <ToggleAlarmButton isOn={false} onToggle={() => {}} />
          </div>
        </div>
        {ALARM_SECTION_DATA.map((data, index) => (
          <ProfileSection
            key={index}
            sectionData={{
              title: data.title,
              contents: data.contents.map((item) => item.name),
            }}
            isLastSection={index === ALARM_SECTION_DATA.length - 1}
            isToggle={true}
            toggleStates={toggleStates}
            onToggle={handleToggle}
            keywordData={keywords}
            onDeleteKeyword={handleDeleteKeyword}
          />
        ))}
      </div>
    </div>
  );
};

export default AlarmSetting;
