import { AxiosError } from "axios";

export interface Project {
  id: number;
  user_id: number;
  title: string;
  icon_name: string;
  overview: string;
  tasks: string;
  notes: string;
  questions: string;
  role: number;
}

export interface TProjects {
  projects: Project[];
  error: AxiosError | null;
  pending: string;
}
