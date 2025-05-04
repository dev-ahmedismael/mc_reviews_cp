export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  domain: string;
  tenant_id: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface RegsiterResponse {
  message: string;
}
