import { TodoProps } from '../../core/models/todoProps';
import {
  TODO_ADD,
  TODO_CLEAR,
  TODO_COMPLETE,
  TODO_DELETE,
  TODO_UPDATE,
} from './type';

export const todoAdd = (todoItem: TodoProps) => {
  return {
    type: TODO_ADD,
    payload: todoItem,
  };
};

export const todoDelete = (id: number) => {
  return {
    type: TODO_DELETE,
    payload: id,
  };
};

export const todoUpdate = (todoItem: TodoProps) => {
  return {
    type: TODO_UPDATE,
    payload: todoItem,
  };
};

export const todoClear = () => {
  return {
    type: TODO_CLEAR,
  };
};

export const todoComplete = () => {
  return {
    type: TODO_COMPLETE,
  };
};
