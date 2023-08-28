import { TodoProps } from './TodoList';

interface Props {
  todo: TodoProps;
  deleteItem: Function;
  updateItem: Function;
}

const TodoItem = (props: Props) => {
  const { todo, deleteItem, updateItem } = props;

  const checkItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem({ ...todo, isChecked: e.target.checked });
  };

  return (
    <li className='todo-item d-flex'>
      <div className={`todo-content ${todo.isChecked && `checked`}`}>
        <input
          className='todo-check'
          type='checkbox'
          name='todo'
          checked={todo.isChecked}
          onChange={checkItem}
        />
        <label
          className='todo-name'
          htmlFor='todo'
        >
          {todo.name}
        </label>
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
