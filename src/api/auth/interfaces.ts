export interface RegisterProperties {
  name: string;
  email: string;
  password: string;
}

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

export interface LoginProperties {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
  status: string;
  message?: string;
}

export interface ProfileResponse {
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

export interface ResfreshResponse {
  access_token: string;
  status: string;
  message?: string;
}
