import { useRef, useState } from 'react';
import { TodoProps } from '../../../core/models/todoProps';

interface Props {
  todo: TodoProps;
  deleteItem: Function;
  updateItem: Function;
}

const TodoItem = ({ todo, deleteItem, updateItem }: Props) => {
  const [editItem, setEditItem] = useState(false);
  const editInput = useRef<HTMLInputElement>(null);

  const checkItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem({ ...todo, isCompleted: e.target.checked });
  };

  function toggleShowEdit(): void {
    setEditItem(!editItem);
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
        {editItem ? (
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
