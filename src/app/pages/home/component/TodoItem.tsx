import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TodoProps } from '../../../core/models/todoProps';
import { todoDelete, todoUpdate } from '../../../redux/action';

interface TodoItemProps {
  todo: TodoProps;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditItem, setIsEditItem] = useState(false);
  const dispatch = useDispatch();

  const editInput = useRef<HTMLInputElement>(null);

  const checkItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem({ ...todo, isCompleted: e.target.checked });
  };

  function toggleShowEdit(): void {
    setIsEditItem(!isEditItem);
  }

  function handleChangeName(
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === 'Enter' && editInput) {
      handleSaveEdit();
    }
  }

  function handleSaveEdit(): void {
    toggleShowEdit();
    updateItem({ ...todo, name: editInput.current!.value.trim() });
  }

  function updateItem(todo: TodoProps): void {
    dispatch(todoUpdate(todo));
  }

  function deleteItem(id: number): void {
    dispatch(todoDelete(id));
  }

  return (
    <li className="todo-item d-flex">
      <div className={`todo-content ${todo.isCompleted && `checked`}`}>
        <input
          className="todo-check"
          type="checkbox"
          name="todo"
          checked={todo.isCompleted}
          onChange={checkItem}
        />
        {isEditItem ? (
          <input
            className="input todo-edit"
            ref={editInput}
            defaultValue={todo.name}
            onKeyUp={handleChangeName}
            onBlur={handleSaveEdit}
            autoFocus
          ></input>
        ) : (
          <label
            className="todo-name"
            htmlFor="todo"
            onClick={toggleShowEdit}
          >
            {todo.name}
          </label>
        )}
      </div>
      <span
        className="btn btn-danger"
        onClick={() => deleteItem(todo.id)}
      >
        x
      </span>
    </li>
  );
};

export default TodoItem;
