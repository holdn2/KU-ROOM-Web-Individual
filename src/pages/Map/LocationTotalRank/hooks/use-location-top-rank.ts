import { useQuery } from "@tanstack/react-query";
import { LOCATION_TOTAL_RANK_QUERY_KEY } from "../querykey/rank";
import { getLocationTop3Rank } from "../api";
import useToast from "@/shared/hooks/use-toast";

export const useLocationTopRank = (placeId: number) => {
  const toast = useToast();

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
    toast.error(top3Error.message);
  }

  return {
    top3RankData,
    isTop3Pending,
  };
};
