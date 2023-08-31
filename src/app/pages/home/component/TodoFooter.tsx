import { useDispatch } from 'react-redux';
import { Tab, TodoProps } from '../../../core/models/todoProps';
import { todoClear } from '../../../shared/redux/action';

interface FooterProps {
  todoList: TodoProps[];
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
}

const TodoFooter = ({ todoList, currentTab, setCurrentTab }: FooterProps) => {
  const tabs = [Tab.ALL, Tab.ACTIVE, Tab.COMPLETED];
  const dispatch = useDispatch();

  function clearComplete(): void {
    dispatch(todoClear());
  }

  return (
    <div className="todo-footer d-flex">
      <span>
        {todoList.filter((item) => item.isCompleted === false).length} item(s)
        left
      </span>
      <ul className="d-flex">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className="tab"
          >
            <span
              id={`${tab === currentTab && `active`}`}
              className="btn btn-primary"
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </span>
          </li>
        ))}
      </ul>
      {todoList.filter((item: TodoProps) => item.isCompleted === true).length >
        0 && (
        <span
          className="btn btn-primary btn-delete"
          onClick={clearComplete}
        >
          Clear completed
        </span>
      )}
    </div>
  );
};

export default TodoFooter;
