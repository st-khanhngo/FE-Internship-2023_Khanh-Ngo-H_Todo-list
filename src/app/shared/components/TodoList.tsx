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
		// setFilterList(todoList);
	}

	function updateItem(todo: any) {
		const newTodos = todoList.map((item: any) => {
			return item.id === todo.id ? todo : item;
		});
		setTodoList(newTodos);
		// setFilterList(newTodos);
	}

	function changeTab(tab: string): void {
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
		// setFilterList(newList);
	}

	return (
		<div>
			<input
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

			<span>
				{todoList.filter((item: any) => item.isChecked === false).length} items
				left
			</span>

			<ul>
				{tabs.map((tab, index) => (
					<li key={index}>
						<span onClick={() => changeTab(tab)}>{tab}</span>
					</li>
				))}
			</ul>

			<span onClick={deleteComplete}>Clear completed</span>
		</div>
	);
};

export default TodoList;
