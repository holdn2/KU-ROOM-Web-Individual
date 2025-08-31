import Header from "../../shared/components/Header/Header";
import styles from "./Alarm.module.css";
import friendPlusIcon from "../../assets/homemenuicon/homeicon_plus_friend.png";
import noticeIcon from "../../assets/homemenuicon/homeicon_kcube_reserve.png";
import rankingIcon from "../../assets/homemenuicon/homeicon_search_location.png";

const dummyAlarmData = [
  {
    category: "친구",
    date: "3시간 전",
    content: "쿠룸 님이 친구 신청을 했어요. 친구 신청을 수락하시겠어요?",
    readStatus: false,
  },
  {
    category: "친구",
    date: "7시간 전",
    content: "쿠룸 님이 위치를 공유했어요. 친구 위치를 확인해보세요.",
    readStatus: true,
  },
  {
    category: "공지사항",
    date: "1일 전",
    content: "새로운 공지가 올라왔어요. 바로 확인해보세요!",
    readStatus: true,
  },
  {
    category: "공지사항",
    date: "6일 전",
    content: "‘입학식’에 대한 공지가 올라왔어요.",
    readStatus: false,
  },
  {
    category: "내 장소 랭킹",
    date: "2025. 01.03.",
    content: "‘상허연구관’이 가장 많이 방문한 장소가 되었어요.",
    readStatus: false,
  },
  {
    category: "내 장소 랭킹",
    date: "2024.11.25.",
    content: "내 장소 랭킹의 순위가 바뀌었어요!",
    readStatus: true,
  },
];

const Alarm = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "친구":
        return friendPlusIcon;
      case "공지사항":
        return noticeIcon;
      case "내 장소 랭킹":
        return rankingIcon;
      default:
        return "";
    }
  };
  return (
    <div>
      <Header>알림</Header>
      <div className={styles.AlarmContentWrapper}>
        {dummyAlarmData.map((item, index) => (
          <div
            key={index}
            className={`${styles.AlarmContainer} ${
              !item.readStatus ? styles.UnreadAlarm : ""
            }`}
          >
            <div className={styles.AlarmStateWrapper}>
              <div className={styles.AlarmCategoryWrapper}>
                <img
                  className={styles.AlarmStateIcon}
                  src={getCategoryIcon(item.category)}
                  alt={item.category + " 아이콘"}
                />
                <span className={styles.AlarmStateText}>{item.category}</span>
              </div>
              <span className={styles.AlarmStateText}>{item.date}</span>
            </div>
            <span className={styles.AlarmContent}>{item.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alarm;
