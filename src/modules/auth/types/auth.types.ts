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
  token: string;
  password: string;
}
