import {
  getLocationTotalRank,
  LocationTotalRankResponseData,
} from "@pages/Map/LocationTotalRank/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LOCATION_TOTAL_RANK_QUERY_KEY } from "../querykey/rank";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useLocationTopRank } from "./use-location-top-rank";
import { useLocationMyRank } from "./use-location-my-rank";

export const useLocationTotalRank = (placeId: number) => {
  const { ref: listBottomRef, inView } = useInView();

  const { top3RankData, isTop3Pending } = useLocationTopRank(placeId);
  const { myRankData, isMyRankPending } = useLocationMyRank(placeId);

  const {
    data: rowTotalRankData,
    isPending: isTotalRankPending,
    isError: isTotalRankError,
    error: totalRankError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<LocationTotalRankResponseData>({
    queryKey: LOCATION_TOTAL_RANK_QUERY_KEY.TOTAL(placeId),
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const lastKnown = pageParam === null ? undefined : String(pageParam);
      const response = await getLocationTotalRank(placeId, lastKnown);
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext && lastPage.nextCursor !== undefined) {
        return lastPage.nextCursor;
      }
    },
    retry: 1,
    staleTime: 1000 * 30,
  });

  const totalRankData =
    rowTotalRankData?.pages.flatMap((page) => page?.ranks || []) || [];

  if (isTotalRankError) {
    // TODO : 토스트로 보여주기
    alert(`전체 랭킹 데이터 오류 : ${totalRankError.message}`);
  }

  const isPagePending = isTop3Pending || isTotalRankPending || isMyRankPending;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    listBottomRef,
    top3RankData,
    myRankData,
    totalRankData,
    isPagePending,
  };
};
