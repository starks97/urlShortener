export const baseUrl = import.meta.env.VITE_API_URL as string;

export const loggedIn = import.meta.env.VITE_LOGGED_IN_COOKIE_NAME as string;

import { UrlCategories } from "./api";

export const MenuPath = [
  ["/", "Home"],
  ["/dashboard", "Dashboard"],
  ["/auth/login", "Login"],
] as const;

export const DashboadMenuPath = [
  ["/", "Home"],
  ["/dashboard", "Dashboard"],
  ["/profile", "Profile"],
] as const;

export const searchParams = {
  search: { limit: 15, offset: 0, category: UrlCategories.All },
};
