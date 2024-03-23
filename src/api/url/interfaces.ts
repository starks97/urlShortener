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
