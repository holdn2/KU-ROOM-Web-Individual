import axios from "axios";

export interface NoticeResponse {
  id: number;
  categoryId: number;
  categoryName: string;
  title: string;
  link: string;
  content: string;
  pubDate: string;
  author: string;
  description: string;
  isBookMarked: boolean;
  bookmarkId?: number;
}

export interface PageableSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: PageableSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface NoticeListResponse {
  content: NoticeResponse[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: PageableSort;
  numberOfElements: number;
  empty: boolean;
}

export interface NoticeListParams {
  category?: string;
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface BookmarkResponse {
  bookmarkId: number;
  noticeId: number;
  noticeName: string;
  noticePubDate: string;
  bookmarkDate: string;
  categoryId?: number;
}

export interface BookmarkApiResponse {
  code: number;
  status: string;
  message: string;
  data: BookmarkResponse[];
}

export interface BookmarkListParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface NoticeDetailData {
  id: number;
  content: string;
  link: string;
  title: string;
  pubdate: string;
  isBookmark: boolean;
  bookmarkId?: number;
}

export interface NoticeDetailApiResponse {
  code: number;
  status: string;
  message: string;
  data: NoticeDetailData;
}

const NOTICE_BASE_URL = "https://kuroom.shop";

const noticeAxiosInstance = axios.create({
  baseURL: NOTICE_BASE_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

noticeAxiosInstance.interceptors.request.use(
  (config) => {
    let token: string | null = null;
    if (typeof window !== "undefined") {
      try {
        token = localStorage.getItem("accessToken");
      } catch (_) {
        token = null;
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getNotices = async (
  params: NoticeListParams = {}
): Promise<NoticeListResponse> => {
  const response = await noticeAxiosInstance.get<NoticeListResponse>(
    "/api/v1/notices",
    {
      params: {
        category: params.category,
        keyword: params.keyword,
        page: params.page || 0,
        size: params.size || 20,
        sort: params.sort,
      },
    }
  );
  return response.data;
};

export const getBookmarks = async (): Promise<BookmarkResponse[]> => {
  const response = await noticeAxiosInstance.get<BookmarkApiResponse>(
    "/api/v1/bookmark"
  );
  return response.data.data;
};

export interface AddBookmarkRequest {
  noticeId: number;
}

export interface AddBookmarkData {
  bookmarkId: number;
}

export interface AddBookmarkApiResponse {
  code: number;
  status: string;
  message: string;
  data: AddBookmarkData;
}

export const addBookmark = async (noticeId: number): Promise<number> => {
  const response = await noticeAxiosInstance.post<AddBookmarkApiResponse>(
    "/api/v1/bookmark",
    {
      noticeId,
    }
  );
  return response.data.data.bookmarkId;
};

export interface RemoveBookmarkApiResponse {
  code: number;
  status: string;
  message: string;
}

export const removeBookmark = async (bookmarkId: number): Promise<void> => {
  await noticeAxiosInstance.delete<RemoveBookmarkApiResponse>(
    `/api/v1/bookmark/${bookmarkId}`
  );
};

export const getNoticeDetail = async (
  noticeId: string
): Promise<NoticeDetailData> => {
  try {
    const response = await noticeAxiosInstance.get<NoticeDetailApiResponse>(
      `/api/v1/notices/${noticeId}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("공지사항 상세 조회 실패:", error);
    throw error;
  }
};

export interface KeywordToggleRequest {
  keyword: string;
}

export interface KeywordToggleResponse {
  code: number;
  status: string;
  message: string;
}

export const toggleKeyword = async (
  keyword: string
): Promise<KeywordToggleResponse> => {
  const response = await noticeAxiosInstance.post<KeywordToggleResponse>(
    "/api/v1/notices/keyword",
    {
      keyword,
    }
  );
  return response.data;
};

export interface KeywordListResponse {
  code: number;
  status: string;
  message: string;
  data: {
    keywords: string[];
  };
}

export const getKeywords = async (): Promise<string[]> => {
  const response = await noticeAxiosInstance.get<KeywordListResponse>(
    "/api/v1/notices/keyword"
  );
  return response.data.data.keywords;
};

export interface PopularNoticeResponse {
  code: number;
  status: string;
  message: string;
  data: NoticeResponse[];
}

export const getPopularNotices = async (): Promise<NoticeResponse[]> => {
  const response = await noticeAxiosInstance.get<PopularNoticeResponse>(
    "/api/v1/notices/popular"
  );
  return response.data.data;
};
