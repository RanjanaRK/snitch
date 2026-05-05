export type JwtUser = {
  id: string;
  role: "buyer" | "seller";
};

export type GoogleUser = {
  id: string;
  displayName: string;
  emails: { value: string }[];
};
