import { ActionProps, Tab, TodoProps } from '../core/models/todoProps';
import { StorageKey, getLocalStorage } from '../shared/utils/localStorageUtils';
import {
  CHANGE_TAB,
  TODO_ADD,
  TODO_CLEAR,
  TODO_DELETE,
  TODO_TOGGLE_STATUS,
  TODO_UPDATE,
} from './type';

const initialState = {
  todoList: getLocalStorage(StorageKey.TODO),
  currentTab: Tab.ALL,
};

export const todoReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case TODO_ADD:
      return {
        ...state,
        todoList: [{ ...action.payload }, ...state.todoList],
      };
    case TODO_DELETE:
      return {
        ...state,
        todoList: state.todoList.filter((item: TodoProps) => {
          return item.id !== action.payload;
        }),
      };
    case TODO_UPDATE:
      return {
        ...state,
        todoList: state.todoList.map((item: TodoProps) => {
          return item.id === action.payload.id ? action.payload : item;
        }),
      };
    case TODO_CLEAR:
      return {
        ...state,
        todoList: state.todoList.filter(
          (item: TodoProps) => item.isCompleted === false
        ),
      };
    case TODO_TOGGLE_STATUS:
      return {
        ...state,
        todoList: state.todoList.map((item: TodoProps) => ({
          ...item,
          isCompleted: action.payload,
        })),
      };
    case CHANGE_TAB:
      return {
        ...state,
        currentTab: action.payload,
      };
    default:
      return state;
  }
};
