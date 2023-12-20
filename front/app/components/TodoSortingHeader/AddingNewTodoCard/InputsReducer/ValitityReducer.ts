export interface NewTodoValidityState {
  htag_task: boolean;
  title: boolean;
  short_bio: boolean;
}

export interface NewTodoValidityAction {
  payload: {
    text: string;
    key: string;
  };
}

export function ProfileValidityReducer(
  state: NewTodoValidityState,
  action: NewTodoValidityAction
) {
  const { key, text } = action.payload;

  return {
    ...state,
    [key]: text.length > 0 ? false : true
  };
}
