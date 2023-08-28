import { useState } from 'react';
import { TodoProps } from '../../../core/models/todoProps';

interface Props {
  todo: TodoProps;
  deleteItem: Function;
  updateItem: Function;
}

const TodoItem = ({ todo, deleteItem, updateItem }: Props) => {
  const [editItem, setEditItem] = useState(false);
  const [todoEdit, setTodoEdit] = useState(todo.name);

  const checkItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem({ ...todo, isCompleted: e.target.checked });
  };

  function handleEdit(): void {
    setEditItem(!editItem);
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>): void {
    setTodoEdit(event.target.value);
  }

  function handleSaveEdit(
    event: React.FocusEvent<HTMLInputElement, Element>
  ): void {
    handleEdit();
    updateItem({ ...todo, name: todoEdit });
  }

  return (
    <li className='todo-item d-flex'>
      <div className={`todo-content ${todo.isCompleted && `checked`}`}>
        <input
          className='todo-check'
          type='checkbox'
          name='todo'
          checked={todo.isCompleted}
          autoFocus
          onChange={checkItem}
        />
        {editItem ? (
          <input
            className='input todo-edit'
            value={todoEdit}
            onChange={handleChangeName}
            onBlur={handleSaveEdit}
            autoFocus
          ></input>
        ) : (
          <label
            className='todo-name'
            htmlFor='todo'
            onClick={handleEdit}
          >
            {todo.name}
          </label>
        )}
      </div>
      <span
        className='btn btn-danger'
        onClick={() => deleteItem(todo.id)}
      >
        x
      </span>
    </li>
  );
};

export default TodoItem;
