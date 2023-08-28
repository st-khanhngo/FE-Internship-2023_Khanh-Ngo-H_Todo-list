import TodoList from './component/TodoList';

const Home = () => {
  return (
    <div className='home-page'>
      <div className='container'>
        <h1 className='header-title'>TODO LIST</h1>
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
