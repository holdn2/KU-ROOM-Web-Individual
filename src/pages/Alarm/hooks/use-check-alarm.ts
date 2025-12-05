import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/shared/hooks/use-toast";
import { checkAlarmApi, CheckAlarmParams } from "@pages/Alarm/api";
import { ALARM_QUERY_KEY } from "@pages/Alarm/querykey/alarm";

export const useCheckAlarm = () => {
  const toast = useToast();
  const qc = useQueryClient();
  const { mutate: checkAlarm } = useMutation({
    mutationFn: (params: CheckAlarmParams) => checkAlarmApi(params),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ALARM_QUERY_KEY.ALARM_LIST,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkAlarm };
};
