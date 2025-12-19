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
  category?: string;
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
        throw Error;
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

export const getBookmarks = async (
  params: BookmarkListParams = {}
): Promise<BookmarkResponse[]> => {
  const response = await noticeAxiosInstance.get<BookmarkListResponse>(
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

export interface KeywordToggleRequest {
  keyword: string;
}

export interface KeywordToggleResponse {
  code: number;
  status: string;
  message: string;
}

export const toggleKeyword = async (keyword: string): Promise<KeywordToggleResponse> => {
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
