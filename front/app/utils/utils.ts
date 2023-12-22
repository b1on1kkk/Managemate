import type { parsedTodos, TBoard } from "../redux/interfaces/tasks_interfaces";
import type { Member } from "../redux/interfaces/member_interfaces";
import type { Users } from "../redux/interfaces/users_interfaces";
import type { Project } from "../redux/interfaces/projects_interfaces";

export function DevideIntoGroups(members: Member[]): [Member[], number] {
  const newArray: Member[] = [];
  let residue: number = 0;
  let counter = 0;

  for (let i = 0; i < members.length; i++) {
    counter++;
    if (counter === 5) {
      residue = members.length - i;
      break;
    }
    newArray.push(members[i]);
  }

  return [newArray, residue];
}

export function UpdateTasksState(
  new_board_id: number,
  tasks: TBoard[],
  to_change_task_id: number
) {
  const newProjectTasks: parsedTodos[] = [];

  tasks.forEach((task) => {
    task.items.forEach((todo) => {
      if (todo.id === to_change_task_id)
        newProjectTasks.push({ todo_inf: { ...todo }, board_id: new_board_id });
      else newProjectTasks.push({ todo_inf: { ...todo }, board_id: task.id });
    });
  });

  return JSON.stringify(newProjectTasks);
}

export function DoneProjectsCounter(tasks: TBoard[]) {
  let final_done = 0;
  let all_items = 0;

  tasks.forEach((task) => {
    all_items += task.items.length;

    task.items.forEach((cards) => {
      let done_counter = 0;
      const todos_length = cards.todos.length;

      cards.todos.forEach((todo) => {
        if (todo.checked) done_counter++;
      });

      if (done_counter === todos_length) final_done++;
    });
  });

  return ((final_done * 100) / all_items).toFixed(0);
}

export function FindProjectTitleById(
  project_id: number | null,
  projects: Project[]
): [string, string] | [] {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === project_id)
      return [projects[i].title, projects[i].icon_name];
  }
  return [];
}

export function FindUser(members: Member[], user_inf: Users) {
  return members.find((member) => member.id === user_inf.id);
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
