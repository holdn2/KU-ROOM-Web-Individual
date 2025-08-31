import { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import ProfileSection from "../../../components/MyProfile/ProfileSection";
import { AlarmSectionData } from "../../../shared/constant/sectionDatas";

const AlarmSetting = () => {
  // 키워드 더미 데이터
  const [keywords, setKeywords] = useState<{ keyword: string }[]>([
    { keyword: "입학식" },
    { keyword: "성적 삭제" },
    { keyword: "복학" },
    { keyword: "휴학" },
  ]);
  // 추후 서버와 연동 시에 수정 필요
  const handleDeleteKeyword = (target: string) => {
    // 삭제 시 서버에 알려야 함.
    setKeywords((prev) => prev.filter((k) => k.keyword !== target));
  };

  // 각 알림 상태
  const [toggleStates, setToggleStates] = useState(() => {
    const initialState: Record<string, boolean> = {};
    AlarmSectionData.forEach((section) =>
      section.contents.forEach((item) => {
        initialState[item] = false;
      })
    );
    return initialState;
  });
  const handleToggle = (item: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
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
