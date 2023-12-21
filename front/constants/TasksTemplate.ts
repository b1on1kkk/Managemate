import { TTodoCard } from "@/app/redux/features/get_tasks.slice";

export const TASKS_TEMPLATE: {
  id: number;
  title: string;
  open_add_modal: boolean;
  items: TTodoCard[];
}[] = [
  {
    id: 1,
    title: "To Do",
    open_add_modal: false,
    items: []
  },
  {
    id: 2,
    title: "In Progress",
    open_add_modal: false,
    items: []
  },
  {
    id: 3,
    title: "Need Review",
    open_add_modal: false,
    items: []
  },
  {
    id: 4,
    title: "Done",
    open_add_modal: false,
    items: []
  }
];
