import { useQuery } from "@tanstack/react-query";
import {
  AlarmReadStatusResponseData,
  getAlarmReadStatus,
} from "@pages/Alarm/api";
import { ALARM_QUERY_KEY } from "../querykey/alarm";

export const useUnreadAlarm = () => {
  const { data: unreadAlarmData } = useQuery<AlarmReadStatusResponseData>({
    queryKey: ALARM_QUERY_KEY.READ_STATUS,
    queryFn: () => getAlarmReadStatus(),
  });

  return { unreadAlarmData };
};
