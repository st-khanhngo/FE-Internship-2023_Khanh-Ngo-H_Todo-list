import { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import {
  StorageKey,
  saveToLocalStorage,
} from '../../../shared/utils/localStorageUtils';
import { Tab, TodoProps } from '../../../core/models/todoProps';
import TodoFooter from './TodoFooter';
import { useDispatch, useSelector } from 'react-redux';
import { todoAdd, todoToggle } from '../../../shared/redux/action';

const TodoList = (): React.ReactElement => {
  const todoList = useSelector((state: any) => state.todoList);
  const dispatch = useDispatch();

  const [listStatus, setListStatus] = useState(true);
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.ALL);
  const todoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveToLocalStorage(StorageKey.TODO, todoList);
  }, [todoList]);

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    const todoItem: string = todoInput.current!.value.trim();
    if (event.key === 'Enter' && todoItem) {
      dispatch(todoAdd({ id: Date.now(), name: todoItem, isCompleted: false }));
      todoInput.current!.value = '';
    }
  }

  function toggleStatus(listStatus: boolean): void {
    dispatch(todoToggle(listStatus));
    setListStatus(!listStatus);
  }

  const changeTab: Record<Tab, () => TodoProps[]> = {
    [Tab.ALL]: () => todoList,
    [Tab.ACTIVE]: () =>
      todoList.filter((item: TodoProps) => item.isCompleted === false),
    [Tab.COMPLETED]: () =>
      todoList.filter((item: TodoProps) => item.isCompleted === true),
  };

  return (
    <div className="todo-wrapper">
      <i
        className="icon icon-check-all"
        onClick={() => toggleStatus(listStatus)}
      ></i>
      <input
        className="todo-input"
        type="text"
        ref={todoInput}
        autoFocus
        placeholder="What need to be done?"
        onKeyUp={handleEnter}
      />
      <ul className="todo-list">
        {changeTab[currentTab]().map((todo: TodoProps) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </ul>
      {todoList.length > 0 && (
        <TodoFooter
          todoList={todoList}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
    </div>
  );
};

export default TodoList;
