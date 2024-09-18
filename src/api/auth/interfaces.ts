export interface RegisterResponse {
  data: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  status: string;
  message?: string;
}

export interface LoginResponse {
  status: string;
  message?: string;
}

export interface ProfileResponse {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  status: string;
  message?: string;
}

export interface ResfreshResponse {
  access_token: string;
  status: string;
  message?: string;
}

export interface SessionStatusResponse {
  status: "valid" | "refresh" | "login";
}
