import { ActionProps, Tab, TodoProps } from '../../core/models/todoProps';
import {
  CHANGE_TAB,
  TODO_ADD,
  TODO_CLEAR,
  TODO_DELETE,
  TODO_TOGGLE_STATUS,
  TODO_UPDATE,
} from './type';

export const todoAdd = (todoItem: TodoProps): ActionProps => {
  return {
    type: TODO_ADD,
    payload: todoItem,
  };
};

export const todoDelete = (id: number): ActionProps => {
  return {
    type: TODO_DELETE,
    payload: id,
  };
};

export const todoUpdate = (todoItem: TodoProps): ActionProps => {
  return {
    type: TODO_UPDATE,
    payload: todoItem,
  };
};

export const todoClear = (): ActionProps => {
  return {
    type: TODO_CLEAR,
  };
};

export const todoToggle = (status: boolean): ActionProps => {
  return {
    type: TODO_TOGGLE_STATUS,
    payload: status,
  };
};

export const changeCurrentTab = (tab: Tab): ActionProps => {
  return {
    type: CHANGE_TAB,
    payload: tab,
  };
};
