import { AlarmDataType } from "@pages/Alarm/types";
import {
  getCategory,
  getCategoryIcon,
} from "@pages/Alarm/utils/alarm-category";
import { formatDateTime } from "@pages/Alarm/utils/format-time";
import styles from "./AlarmItem.module.css";

interface AlarmItemProps {
  alarm: AlarmDataType;
}

const AlarmItem = ({ alarm }: AlarmItemProps) => {
  return (
    <div
      className={`${styles.AlarmContainer} ${
        !alarm.isChecked ? styles.UnreadAlarm : ""
      }`}
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
    </div>
  );
};

export default AlarmItem;
