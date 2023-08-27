import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';

const TodoList = (): React.ReactElement => {
	const [todoList, setTodoList]: any = useState(
		JSON.parse(localStorage.getItem('todo')!)
	);

	const [filterList, setFilterList] = useState(todoList);

	const [todoItem, setTodoItem] = useState('');
	const tabs = ['All', 'Active', 'Completed'];
	const [currentTab, setCurrentTab] = useState('All');

	useEffect(() => {
		setFilterList(todoList);
		localStorage.setItem('todo', JSON.stringify(todoList));
	}, [todoList]);

	function handleEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
		if (event.key === 'Enter' && todoItem) {
			setTodoList([
				...todoList,
				{ id: uuidv4(), name: todoItem, isChecked: false },
			]);
			setTodoItem('');
		}
	}

	function handleChangeInput(e: ChangeEvent<HTMLInputElement>): void {
		e.preventDefault();
		setTodoItem(e.target.value);
	}

	function deleteItem(id: string) {
		setTodoList(
			todoList.filter((todo: any) => {
				return todo.id !== id;
			})
		);
	}

	function updateItem(todo: any) {
		const newTodos = todoList.map((item: any) => {
			return item.id === todo.id ? todo : item;
		});
		setTodoList(newTodos);
	}

	function changeTab(tab: string): void {
		setCurrentTab(tab);
		switch (tab) {
			case 'All':
				setFilterList(todoList);
				break;
			case 'Active':
				setFilterList(todoList.filter((item: any) => item.isChecked === false));
				break;
			case 'Completed':
				setFilterList(todoList.filter((item: any) => item.isChecked === true));
				break;
			default:
				break;
		}
	}

	function deleteComplete(): void {
		const newList = todoList.filter((item: any) => item.isChecked === false);
		setTodoList(newList);
	}

	return (
		<div className='todo-list'>
			<input
				className='todo-input'
				type='text'
				value={todoItem}
				placeholder='What need to be done?'
				onChange={handleChangeInput}
				onKeyDown={handleEnter}
			/>
			<ul>
				{filterList.map((todo: any) => {
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

			<div className='todo-footer d-flex'>
				<span>
					{todoList.filter((item: any) => item.isChecked === false).length}{' '}
					items left
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
								onClick={() => changeTab(tab)}
							>
								{tab}
							</span>
						</li>
					))}
				</ul>
				{todoList.filter((item: any) => item.isChecked === true).length > 0 && (
					<span
						className='btn btn-primary'
						onClick={deleteComplete}
					>
						Clear completed
					</span>
				)}
			</div>
		</div>
	);
};

export default TodoList;
