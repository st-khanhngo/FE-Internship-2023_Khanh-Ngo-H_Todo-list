import { Tab, TodoProps } from '../../../core/models/todoProps';

interface FooterProps {
  todoList: TodoProps[];
  clearComplete: () => void;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
}

const TodoFooter = ({
  todoList,
  clearComplete,
  currentTab,
  setCurrentTab,
}: FooterProps) => {
  const tabs = [Tab.ALL, Tab.ACTIVE, Tab.COMPLETED];

  return (
    <div className='todo-footer d-flex'>
      <span>
        {
          todoList.filter((item: TodoProps) => item.isCompleted === false)
            .length
        }{' '}
        item(s) left
      </span>
      <ul className='d-flex'>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className='tab'
          >
            <span
              id={`${tab === currentTab && `active`}`}
              className='btn btn-primary'
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
          className='btn btn-primary btn-delete'
          onClick={clearComplete}
        >
          Clear completed
        </span>
      )}
    </div>
  );
};

export default TodoFooter;
