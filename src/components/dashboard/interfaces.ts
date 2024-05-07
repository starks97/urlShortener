import { UrlResponse } from "../../api";

export interface DashboardProps {
  urls: UrlResponse;
}

export interface UrlCardProps {
  created_at: string;
  original_url: string;
  short_url: string;
  updated_at: string;
  url_id: string;
  views: number;
}

export interface DashModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  data: UrlCardProps;
}

export type UrlUpdaterOptionsType = "original_url" | "short_url";

export interface UrlUpdaterProps {
  label: UrlUpdaterOptionsType;
  data: string;
  id: string;
}
