export type UserType = {
  _id: string;
  email: string;
  contact?: string;
  fullname: string;
  role: "buyer" | "seller";
};

export type AuthResponse = {
  success: boolean;
  message: string;
  user?: UserType;
};

export type AuthState = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
};
