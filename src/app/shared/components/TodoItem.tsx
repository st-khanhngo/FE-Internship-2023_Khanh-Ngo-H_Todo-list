const TodoItem = (props: any): any => {
	const { todo, deleteItem, updateItem } = props;

	const checkItem = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateItem({ ...todo, isChecked: e.target.checked });
	};

	return (
		<li>
			<input
				type='checkbox'
				name='todo'
				checked={todo.isChecked}
				onChange={checkItem}
			/>
			<label htmlFor='todo'>{todo.name}</label>
			<button onClick={() => deleteItem(todo.id)}>X</button>
		</li>
	);
};

export default TodoItem;
