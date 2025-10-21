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

export interface NoticeListResponse {
  content: NoticeResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface NoticeListParams {
  categoryId?: number;
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface BookmarkResponse {
  id: number;
  title: string;
  pubDate: string;
  bookmarked: boolean;
  link?: string;
}

export interface BookmarkListResponse {
  content: BookmarkResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface BookmarkListParams {
  page?: number;
  size?: number;
  sort?: string[];
}

const NOTICE_LIST_BASE_URL = "https://kuis.shop";
const NOTICE_DETAIL_BASE_URL = "https://kuroom.shop";

const noticeListAxiosInstance = axios.create({
  baseURL: NOTICE_LIST_BASE_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

const noticeDetailAxiosInstance = axios.create({
  baseURL: NOTICE_DETAIL_BASE_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

const addAuthInterceptor = (instance: any) => {
  instance.interceptors.request.use(
    (config: any) => {
      let token: string | null = null;
      if (typeof window !== "undefined") {
        try {
          token = localStorage.getItem("accessToken");
        } catch (_) {
          throw Error;
        }
      }
      if (token) {
        if (!config.headers) config.headers = {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );
};

addAuthInterceptor(noticeListAxiosInstance);
addAuthInterceptor(noticeDetailAxiosInstance);

export const getNotices = async (
  params: NoticeListParams = {}
): Promise<NoticeListResponse> => {
  const response = await noticeListAxiosInstance.get<NoticeListResponse>(
    "/api/v1/notices",
    {
      params: {
        categoryId: params.categoryId,
        keyword: params.keyword,
        page: params.page || 0,
        size: params.size || 20,
        sort: params.sort,
      },
    }
  );
  return response.data;
};

export const getBookmarks = async (
  params: BookmarkListParams = {}
): Promise<BookmarkResponse[]> => {
  const response = await noticeListAxiosInstance.get<BookmarkListResponse>(
    "/api/v1/notices/bookmarks",
    {
      params: {
        page: params.page || 0,
        size: params.size || 20,
        sort: params.sort,
      },
    }
  );
  return response.data.content;
};

export const addBookmark = async (noticeId: number): Promise<void> => {
  await noticeListAxiosInstance.post(`/api/v1/notices/${noticeId}/bookmark`);
};

export const removeBookmark = async (noticeId: number): Promise<void> => {
  await noticeListAxiosInstance.delete(`/api/v1/notices/${noticeId}/bookmark`);
};

export const getNoticeDetailHtml = async (noticeId: string): Promise<string> => {
  try {
    const response = await noticeDetailAxiosInstance.get<string>(
      `/api/v1/notices/${noticeId}`,
      {
        headers: {
          'Accept': 'text/html'
        },
        responseType: 'text',
        validateStatus: (status) => status >= 200 && status < 300
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("HTML 콘텐츠 조회 실패:", error);
    throw error;
  }
};
