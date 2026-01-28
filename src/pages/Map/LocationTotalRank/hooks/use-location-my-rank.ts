import { useQuery } from "@tanstack/react-query";

import { LOCATION_TOTAL_RANK_QUERY_KEY } from "../querykey/rank";
import { getLocationMyRank } from "../api";
import useToast from "@/shared/hooks/use-toast";

export const useLocationMyRank = (placeId: number) => {
  const toast = useToast();

  const {
    data: myRankData,
    isPending: isMyRankPending,
    isError: isMyRankError,
    error: myRankError,
  } = useQuery({
    queryKey: LOCATION_TOTAL_RANK_QUERY_KEY.ME(placeId),
    queryFn: () => getLocationMyRank(placeId),
    retry: 1,
    staleTime: 1000 * 30,
  });

  if (isMyRankError) {
    toast.error(`사용자 데이터 오류 : ${myRankError.message}`);
  }

  return {
    myRankData,
    isMyRankPending,
  };
};
