export interface SignupInput {
  email: string;
  password: string;
  name?: string;
}

export interface SigninInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  code: string;
  newPassword: string;
  email: string;
}

export interface VerifyEmailInput {
  code: string;
  email: string;
}

export interface AuthResponse {
  user: PublicUser;
  token?: string;
}

// WE CAN MOVE THIS TO USER TYPES / SHARED TYPES !
export interface PublicUser {
  id: string;
  email: string;
  name: string | null;
}
