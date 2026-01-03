import { useEffect, useState, useRef } from "react";

import Header from "@components/Header/Header";
import { AlarmSectionData } from "@constant/sectionDatas";
import { getKeywords, registerKeyword } from "@apis/search";
import useToast from "@/shared/hooks/use-toast";

import ProfileSection from "../components/ProfileSection/ProfileSection";

const AlarmSetting = () => {
  const toast = useToast();
  const [keywords, setKeywords] = useState<{ keyword: string }[]>([]);
  const hasLoadedKeywords = useRef(false);

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
      await registerKeyword(target);
      setKeywords((prev) => prev.filter((k) => k.keyword !== target));
      toast.info('키워드가 삭제되었어요');
    } catch (error) {
      console.error("키워드 삭제 실패:", error);
      toast.error('키워드 삭제에 실패했어요');
    }
  };

  // 각 알림 상태
  const [toggleStates, setToggleStates] = useState(() => {
    const initialState: Record<string, boolean> = {};
    AlarmSectionData.forEach((section) =>
      section.contents.forEach((item) => {
        initialState[item] = true;
      })
    );
    return initialState;
  });
  const handleToggle = (item: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
    if (item === "새로운 공지 업로드") {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "UNSUBSCRIBE_DEV",
          topic: "dev",
          isSubscribe: false,
        })
      );
    }
  };

  useEffect(() => {
    console.log(toggleStates);
  }, [toggleStates]);

  return (
    <div>
      <Header>알림 설정</Header>
      <div style={{ marginTop: "56px" }}>
        {AlarmSectionData.map((data, index) => (
          <ProfileSection
            key={index}
            sectionData={data}
            isLastSection={index === AlarmSectionData.length - 1}
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
