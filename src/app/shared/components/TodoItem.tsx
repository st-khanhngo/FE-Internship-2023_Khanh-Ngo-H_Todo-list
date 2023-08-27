const TodoItem = (props: any): any => {
	const { todo, deleteItem, updateItem } = props;

	const checkItem = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateItem({ ...todo, isChecked: e.target.checked });
	};

	return (
		<li className='todo-item d-flex'>
			<div className='todo-content'>
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
			<button
				className='btn btn-danger'
				onClick={() => deleteItem(todo.id)}
			>
				X
			</button>
		</li>
	);
};

export default TodoItem;
