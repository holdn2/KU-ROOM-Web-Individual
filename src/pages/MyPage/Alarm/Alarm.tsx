import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import ProfileSection from "../../../components/MyProfile/ProfileSection";

const sectionDatas: { title: string; contents: string[] }[] = [
  {
    title: "친구",
    contents: ["친구 신청", "친구 위치 공유"],
  },
  {
    title: "공지사항",
    contents: ["새로운 공지 업로드", "공지 키워드 알림"],
  },
  {
    title: "내 장소 랭킹",
    contents: ["순위 변동 알림"],
  },
];

const Alarm = () => {
  // 각 알림 상태
  const [toggleStates, setToggleStates] = useState(() => {
    const initialState: Record<string, boolean> = {};
    sectionDatas.forEach((section) =>
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
        {sectionDatas.map((data, index) => (
          <ProfileSection
            key={index}
            sectionData={data}
            isLastSection={index === sectionDatas.length - 1}
            isToggle={true}
            toggleStates={toggleStates}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Alarm;
