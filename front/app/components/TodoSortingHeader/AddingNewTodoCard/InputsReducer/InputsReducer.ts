export enum NewTodoCardKind {
  HTAG_COLOR = "HTAG_COLOR",
  HTAG_TASK = "HTAG_TASK",
  TITLE = "TITLE",
  SHORT_BIO = "SHORT_BIO",
  TODO_TITLE = "TODO_TITLE"
}

interface NewTodoCardAction {
  type: NewTodoCardKind;
  payload: string;
}

interface NewTodoCardState {
  htag_color: string;
  htag_task: string;
  max_htag_length: number;
  title: string;
  short_bio: string;
  todo_title: string;
}

export function NewTodoCardReducer(
  state: NewTodoCardState,
  action: NewTodoCardAction
) {
  const { type, payload } = action;
  switch (type) {
    case NewTodoCardKind.HTAG_COLOR:
      return {
        ...state,
        htag_color: payload
      };
    case NewTodoCardKind.HTAG_TASK:
      state.max_htag_length = 10;

      return {
        ...state,
        htag_task: payload,
        max_htag_length: state.max_htag_length - payload.length
      };
    case NewTodoCardKind.TITLE:
      return {
        ...state,
        title: payload
      };
    case NewTodoCardKind.SHORT_BIO:
      return {
        ...state,
        short_bio: payload
      };
    case NewTodoCardKind.TODO_TITLE:
      return {
        ...state,
        todo_title: payload
      };
    default:
      return state;
  }
}
