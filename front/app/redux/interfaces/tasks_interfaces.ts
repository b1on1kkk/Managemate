import { AxiosError } from "axios";

export interface TTodo {
  id: number;
  checked: boolean;
  text: string;
}

export interface TTodoCard {
  id: number;
  sub_title: string;
  title: string;
  about: string;
  htag_color: string;
  show_more: boolean;
  todos: TTodo[];
}

export interface TBoard {
  id: number;
  title: string;
  open_add_modal: boolean;
  items: TTodoCard[];
}

export interface TaskDetailedInf {
  tasks: TBoard[];
  error: AxiosError | null | unknown;
  pending: string;
}

export interface parsedTodos {
  todo_inf: {
    id: number;
    sub_title: string;
    title: string;
    about: string;
    htag_color: string;
    show_more: boolean;
    todos: TTodo[];
  };
  board_id: number;
}
