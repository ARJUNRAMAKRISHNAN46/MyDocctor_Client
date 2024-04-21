export type UserReducerInitial = {
    loading: boolean;
  err: boolean | string;
  role: "user" | "admin" | "company" | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: null | any;
  message?: string;
  status?: string;
}

export interface ErrorPayload {
    message: string;
  }
  