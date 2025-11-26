export const LOCATION_TOTAL_RANK_QUERY_KEY = {
  TOP3: (placeId: number) => ["location-total-ranks", "top3", placeId],
  TOTAL: (placeId: number) => ["location-total-ranks", "total", placeId],
  ME: (placeId: number) => ["location-total-ranks", "me", placeId],
};
