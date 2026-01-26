import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { DepartmentUrlData, getNoticeOthersApi } from "@apis/notice";
import useToast from "@hooks/use-toast";

import { NOTICE_QUERY_KEY } from "../../queryKey";

export const useNoticeOthers = () => {
  const toast = useToast();
  const {
    data: noticeOtehrsData,
    isPending,
    isError,
  } = useQuery<DepartmentUrlData[]>({
    queryKey: NOTICE_QUERY_KEY.OTHERS,
    queryFn: () => getNoticeOthersApi(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isError) {
      toast.error("학과 정보 조회를 실패했습니다.");
    }
  }, [isError, toast]);

  return {
    noticeOtehrsData,
    isPending,
  };
};
