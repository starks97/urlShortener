export const baseUrl = import.meta.env.VITE_API_URL as string;

export const serviceToken = import.meta.env
  .VITE_REFRESH_TOKEN_COOKIE_NAME as string;

export const serviceTokenValue = import.meta.env
  .VITE_REFRESH_TOKEN_VALUE as string;

export const loggedIn = import.meta.env.VITE_LOGGED_IN_COOKIE_NAME as string;
