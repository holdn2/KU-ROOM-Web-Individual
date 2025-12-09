export const categoryMapping = {
  학사: 234,
  장학: 235,
  국제: 237,
  학생: 238,
  일반: 240,
  취창업: 4083,
  산학: 4214,
  도서관: 4274,
} as const;

export type CategoryName = keyof typeof categoryMapping;

export const getCategoryId = (categoryName: string): number | undefined => {
  return categoryMapping[categoryName as CategoryName];
};

export const getCategoryName = (categoryId: number): string | undefined => {
  return Object.keys(categoryMapping).find(
    (key) => categoryMapping[key as CategoryName] === categoryId
  );
};
