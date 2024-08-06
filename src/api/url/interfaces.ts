export type UrlsResponse = {
  data: {
    createdAt: string;
    original_url: string;
    short_url: string;
    updatedAt: string;
    id: string;
    category: string;
    user_id: string;
    username: string;
    views: number;
  }[];
  status: string;
  message?: string;
};

export type UrlResponse = {
  data: {
    createdAt: string;
    original_url: string;
    short_url: string;
    updatedAt: string;
    id: string;
    category: string;
    user_id: string;
    username: string;
    views: number;
  };
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
    category: string;
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
    category: string;
    short_url: string;
    user_id: string;
    views: number;
    created_at: string;
    updated_at: string;
  };
}

export enum UrlCategories {
  All = "All",
  Tech = "Tech",
  News = "News",
  Music = "Music",
  Sports = "Sports",
  Gaming = "Gaming",
  Movies = "Movies",
  Education = "Education",
  Science = "Science",
}
