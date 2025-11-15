import { LoginType } from "../stores/userStore";

const MyPageSectionData: { title: string; contents: string[] }[] = [
  {
    title: "친구",
    contents: ["친구 추가", "친구 목록"],
  },
  {
    title: "앱 정보",
    contents: ["약관 및 정책", "개인정보 처리방침", "앱버전", "고객 센터"],
  },
  {
    title: "설정",
    contents: ["알림 설정", "로그아웃", "탈퇴하기"],
  },
];

const AlarmSectionData: { title: string; contents: string[] }[] = [
  {
    // TODO: 친구 신청 없애기 (10/13)
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

const getProfileChangeSectionData = (loginType: LoginType) => {
  return [
    {
      // TODO: 소셜로그인일 때 이메일, 아이디, 비밀번호 변경하기 안보이도록 처리해야함
      title: "프로필",
      contents:
        loginType === "social"
          ? ["이메일"]
          : ["이메일", "아이디", "비밀번호 변경하기", "닉네임 변경하기"],
    },
    {
      title: "개인정보",
      contents: ["학번", "학과"],
    },
  ];
};

export { MyPageSectionData, AlarmSectionData, getProfileChangeSectionData };
