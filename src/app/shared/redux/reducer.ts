import { TodoProps } from '../../core/models/todoProps';
import { StorageKey, getLocalStorage } from '../utils/localStorageUtils';
import {
  TODO_ADD,
  TODO_CLEAR,
  TODO_DELETE,
  TODO_TOGGLE_STATUS,
  TODO_UPDATE,
} from './type';

const initialState = {
  todoList: getLocalStorage(StorageKey.TODO),
};

export const todoReducer = (state = initialState, action: any) => {
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
    default:
      return state;
  }
};
