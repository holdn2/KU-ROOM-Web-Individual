import Header from "@components/Header/Header";

import styles from "./Alarm.module.css";
import AlarmItem from "./components/alarm-item/AlarmItem";
import { useAlarmList } from "./hooks/use-alarm-list";

const Alarm = () => {
  const { listBottomRef, alarmList, isPending } = useAlarmList();

  return (
    <>
      <Header>알림</Header>
      <div className={styles.AlarmContentWrapper}>
        {isPending && <div>로딩중...</div>}
        {alarmList.map((alarm) => (
          <AlarmItem key={alarm.id} alarm={alarm} />
        ))}
        <div
          ref={listBottomRef}
          style={{
            width: "100%",
            height: "1px",
          }}
        />
      </div>
    </>
  );
};

export default Alarm;
