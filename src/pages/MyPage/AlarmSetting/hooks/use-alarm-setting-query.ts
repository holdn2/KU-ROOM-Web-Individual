import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useToast from "@hooks/use-toast";

import { ALARM_QUERY_KEY } from "@pages/Alarm/querykey/alarm";
import { getAlarmActiveStatusApi } from "@pages/MyPage/AlarmSetting/api";
import { ALARM_SECTION_DATA } from "@pages/MyPage/AlarmSetting/constant/alarm";
import useAlarmSettingMutation from "@pages/MyPage/AlarmSetting/hooks/use-alarm-setting-mutation";
import { ALARM_CATEGORY } from "@pages/MyPage/AlarmSetting/types/alarm-type";

export default function useAlarmSettingQuery() {
  const navigate = useNavigate();
  const toast = useToast();
  const { updateAlarmActiveStatus } = useAlarmSettingMutation();

  const {
    data: disabledAlarmTypes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ALARM_QUERY_KEY.SETTING,
    queryFn: () => getAlarmActiveStatusApi(),
  });

  if (isError || !disabledAlarmTypes) {
    toast.error("기존 알림 설정을 가져오는데 실패했습니다.");
    navigate("/myinfo");
  }

  // 각 알림 상태
  const toggleStates: Record<string, boolean> = {};

  ALARM_SECTION_DATA.forEach((section) =>
    section.contents.forEach((item) => {
      const selected = disabledAlarmTypes ?? [];
      const hasAnyCategory = item.category.some((c) => selected.includes(c));

      toggleStates[item.name] = !hasAnyCategory;
    })
  );

  const isAllAlarmOn = Object.values(toggleStates).every(Boolean);

  const handleToggle = (item: string) => {
    const category = ALARM_SECTION_DATA.flatMap(
      (section) => section.contents
    ).find((content) => content.name === item)?.category;

    if (!category) {
      console.error(`Unknown alarm item: ${item}`);
      return;
    }
    updateAlarmActiveStatus([...category]);
  };

  const handleToggleAll = () => {
    // disabledAlarmTypes가 undefined이면 페이지 이동
    const update = isAllAlarmOn
      ? Object.values(ALARM_CATEGORY)
      : [...disabledAlarmTypes!];
    updateAlarmActiveStatus(update);
  };

  return {
    isAllAlarmOn,
    toggleStates,
    isPending,
    handleToggle,
    handleToggleAll,
  };
}
