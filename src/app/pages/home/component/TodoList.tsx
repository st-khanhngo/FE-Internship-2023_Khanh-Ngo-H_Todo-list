import { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import {
  StorageKey,
  getLocalStorage,
  saveToLocalStorage,
} from '../../../shared/utils/localStorageUtils';
import { Tab, TodoProps } from '../../../core/models/todoProps';
import TodoFooter from './TodoFooter';

const TodoList = (): React.ReactElement => {
  const [todoList, setTodoList] = useState<TodoProps[]>(
    getLocalStorage(StorageKey.TODO)
  );

  const todoInput = useRef<HTMLInputElement>(null);
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.ALL);

  useEffect(() => {
    saveToLocalStorage(StorageKey.TODO, todoList);
  }, [todoList]);

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    const todoItem: string = todoInput.current!.value.trim();
    if (event.key === 'Enter' && todoItem) {
      setTodoList([
        ...todoList,
        { id: Date.now(), name: todoItem, isCompleted: false },
      ]);
      todoInput.current!.value = '';
    }
  }

  function deleteItem(id: number) {
    setTodoList(
      todoList.filter((todo: TodoProps) => {
        return todo.id !== id;
      })
    );
  }

  function updateItem(todo: TodoProps) {
    const newTodos = todoList.map((item: TodoProps) => {
      return item.id === todo.id ? todo : item;
    });
    setTodoList(newTodos);
  }

  const changeTab: Record<Tab, () => TodoProps[]> = {
    [Tab.ALL]: () => todoList,
    [Tab.ACTIVE]: () =>
      todoList.filter((item: TodoProps) => item.isCompleted === false),
    [Tab.COMPLETED]: () =>
      todoList.filter((item: TodoProps) => item.isCompleted === true),
  };

  function clearComplete(): void {
    setTodoList(
      todoList.filter((item: TodoProps) => item.isCompleted === false)
    );
  }

  return (
    <div className="todo-list">
      <input
        className="todo-input"
        type="text"
        ref={todoInput}
        placeholder="What need to be done?"
        onKeyUp={handleEnter}
      />
      <ul>
        {changeTab[currentTab]().map((todo: TodoProps) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          );
        })}
      </ul>

      <TodoFooter
        todoList={todoList}
        clearComplete={clearComplete}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
};

export default TodoList;
