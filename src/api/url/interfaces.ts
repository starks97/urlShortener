export type UrlResponse = {
  data: {
    created_at: string;
    original_url: string;
    short_url: string;
    updated_at: string;
    url_id: string;
    user_id: string;
    username: string;
    views: number;
  }[];
  status: string;
  message?: string;
};

export interface RedirectResponse {
  data: {
    original_url: string;
  };
  status: string;
  message?: string;
}

export interface CreateUrlResponse {
  status: string;
  message?: string;
  data: {
    id: string;
    original_url: string;
    short_url: string;
    user_id: string;
    views: number;
    created_at: string;
    updated_at: string;
  };
}

export interface UpdateUrlResponse {
  status: string;
  message?: string;
  data: {
    id: string;
    original_url: string;
    short_url: string;
    user_id: string;
    views: number;
    created_at: string;
    updated_at: string;
  };
}
