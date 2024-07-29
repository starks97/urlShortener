import { UrlsResponse } from "../../api";

export interface DashboardProps {
  urls: UrlsResponse;
}

export interface UrlCardProps {
  createdAt: string;
  original_url: string;
  short_url: string;
  updatedAt: string;
  id: string;
  views: number;
  category: string;
}

export interface DashModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  data: UrlCardProps;
}

export type UrlUpdaterOptionsType = "original_url" | "short_url" | "category";

export interface UrlUpdaterProps {
  label: UrlUpdaterOptionsType;
  data: string;
  id: string;
}
