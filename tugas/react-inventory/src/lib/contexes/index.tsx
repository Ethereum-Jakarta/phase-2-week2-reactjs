import { createContext, Dispatch, SetStateAction } from "react";
import type ApiClient from "../api";
import type { LoginStatus } from "../constants";
import { NotificationItems } from "../types";

export const LoginInformationContext = createContext<{
  fetchSelft(): Promise<unknown>;
  loginStatus: LoginStatus;
  self?: Awaited<ReturnType<ApiClient["fetchProfile"]>>["data"] | null;
  setSelf: Dispatch<SetStateAction<Awaited<ReturnType<ApiClient["fetchProfile"]>>["data"] | null>>;
  setLoginStatus: Dispatch<SetStateAction<LoginStatus>>;
} | null>(null);

export const NotificationContext = createContext<{
  addNotification(item: Omit<NotificationItems, "timestamp">): unknown;
  items: NotificationItems[];
} | null>(null);
