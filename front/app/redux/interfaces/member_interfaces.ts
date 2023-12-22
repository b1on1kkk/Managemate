import { AxiosError } from "axios";

export interface Member {
  id: number;
  name: string;
  mail: string;
}

export interface MemberDetailedInf {
  members: Member[] | null;
  error: AxiosError | null | unknown;
  pending: string;
}
