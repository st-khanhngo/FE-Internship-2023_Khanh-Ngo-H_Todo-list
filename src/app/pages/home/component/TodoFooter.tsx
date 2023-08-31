import { useDispatch, useSelector } from 'react-redux';

import { StateProps, Tab, TodoProps } from '../../../core/models/todoProps';
import { changeCurrentTab, todoClear } from '../../../redux/action';

const TodoFooter = () => {
  const todoList = useSelector((state: StateProps) => state.todoList);
  const currentTab = useSelector((state: StateProps) => state.currentTab);

  const dispatch = useDispatch();

  const tabs = [Tab.ALL, Tab.ACTIVE, Tab.COMPLETED];

  function clearComplete(): void {
    dispatch(todoClear());
  }

  function setCurrentTab(tab: Tab) {
    dispatch(changeCurrentTab(tab));
  }

  return (
    <div className="todo-footer d-flex">
      <span>
        {todoList.filter((item) => !item.isCompleted).length} item(s) left
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
      {todoList.filter((item: TodoProps) => item.isCompleted).length > 0 && (
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
