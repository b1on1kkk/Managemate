import { AxiosError } from "axios";

export interface Users {
  id: number;
  name: string;
  mail: string;
  avatar: string;
}

export interface UserDetailedInf {
  users: Users[] | null;
  error: AxiosError | null | unknown;
}
