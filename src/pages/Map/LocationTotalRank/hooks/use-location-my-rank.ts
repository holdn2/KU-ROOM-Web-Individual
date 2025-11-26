import { useQuery } from "@tanstack/react-query";

import { LOCATION_TOTAL_RANK_QUERY_KEY } from "../querykey/rank";
import { getLocationMyRank } from "../api";

export const useLocationMyRank = (placeId: number) => {
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
    // TODO : 토스트로 보여주기
    alert(`사용자 데이터 오류 : ${myRankError.message}`);
  }

  return {
    myRankData,
    isMyRankPending,
  };
};
