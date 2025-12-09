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

export const addBookmark = async (noticeId: number): Promise<void> => {
  await noticeAxiosInstance.post(`/api/v1/notices/${noticeId}/bookmark`);
};

export const removeBookmark = async (noticeId: number): Promise<void> => {
  await noticeAxiosInstance.delete(`/api/v1/notices/${noticeId}/bookmark`);
};

export const getNoticeDetailHtml = async (noticeId: string): Promise<string> => {
  try {
    const response = await noticeAxiosInstance.get<string>(
      `/api/v1/notices/${noticeId}`,
      {
        headers: {
          'Accept': 'text/html'
        },
        responseType: 'text',
        validateStatus: (status: number) => status >= 200 && status < 300
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("HTML 콘텐츠 조회 실패:", error);
    throw error;
  }
};
