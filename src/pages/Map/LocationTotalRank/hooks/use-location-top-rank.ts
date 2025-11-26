import { useQuery } from "@tanstack/react-query";
import { LOCATION_TOTAL_RANK_QUERY_KEY } from "../querykey/rank";
import { getLocationTop3Rank } from "../api";

export const useLocationTopRank = (placeId: number) => {
  const {
    data: top3RankData,
    isPending: isTop3Pending,
    isError: isTop3Error,
    error: top3Error,
  } = useQuery({
    queryKey: LOCATION_TOTAL_RANK_QUERY_KEY.TOP3(placeId),
    queryFn: () => getLocationTop3Rank(placeId),
    retry: 1,
    staleTime: 1000 * 30,
  });

  if (isTop3Error) {
    // TODO : 토스트로 보여주기
    alert(`1~3등 데이터 오류 : ${top3Error.message}`);
  }

  return {
    top3RankData,
    isTop3Pending,
  };
};
