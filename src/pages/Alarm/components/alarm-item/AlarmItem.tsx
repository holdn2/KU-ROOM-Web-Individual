import { AlarmDataType, AlarmType } from "@pages/Alarm/types";
import {
  getCategory,
  getCategoryIcon,
} from "@pages/Alarm/utils/alarm-category";
import { formatDateTime } from "@pages/Alarm/utils/format-time";
import styles from "./AlarmItem.module.css";
import { useCheckAlarm } from "../../hooks/use-check-alarm";
import { useNavigate } from "react-router-dom";
import useToast from "@/shared/hooks/use-toast";

interface AlarmItemProps {
  alarm: AlarmDataType;
}

const AlarmItem = ({ alarm }: AlarmItemProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { checkAlarm } = useCheckAlarm();

  const handleCheckAlarm = () => {
    checkAlarm({ alarmId: alarm.id, alarmCategory: alarm.alarmCategory });
    handleNavigate();
  };

  const handleNavigate = () => {
    switch (alarm.alarmType) {
      case AlarmType.NEW_FRIEND_REQUEST:
        navigate("/friendadd");
        break;
      case AlarmType.NEW_FRIEND_PLACE_SHARING:
        // TODO: 친구 칩이 클릭된 상태로 되도록 수정
        navigate("/map");
        break;
      case AlarmType.NEW_NOTICE:
        navigate(`/notice/${alarm.dataId}`);
        break;
      case AlarmType.NEW_KEYWORD_NOTICE:
        // TODO: 해당 키워드가 입력된 채로 공지사항 검색 페이지로 이동되도록 수정
        navigate("/search");
        break;
      case AlarmType.RENEW_RANK_PLACE:
      case AlarmType.RENEW_TOP_RANK_PLACE:
        navigate("/mylocationranking");
        break;
      default:
        toast.error("잘못된 알림입니다.");
        navigate("/");
    }
  };
  return (
    <button
      type="button"
      className={`${styles.AlarmContainer} ${
        !alarm.isChecked ? styles.UnreadAlarm : ""
      }`}
      onClick={handleCheckAlarm}
    >
      <div className={styles.AlarmStateWrapper}>
        <div className={styles.AlarmCategoryWrapper}>
          <img
            className={styles.AlarmStateIcon}
            src={getCategoryIcon(alarm.alarmType)}
            alt={getCategory(alarm.alarmType) + " 아이콘"}
          />
          <span className={styles.AlarmGrayText}>
            {getCategory(alarm.alarmType)}
          </span>
        </div>
        <span className={styles.AlarmGrayText}>
          {formatDateTime(alarm.createdAt)}
        </span>
      </div>
      <span className={styles.AlarmMessage}>{alarm.message}</span>
    </button>
  );
};

export default AlarmItem;
