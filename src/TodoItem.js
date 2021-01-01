import React from 'react'
import axios from 'axios'

function TodoItem(props) {

  const updateStatus = (idStr, todoStr, status) => {
  	const todo = document.getElementById(idStr)
		// todo.classList.remove(`fa-${status?'check':'warning'}`)
		todo.classList.add('fa-spinner')
		todo.classList.add('fa-spin')
		// todo.classList.add('progress-cursor')
		
		axios.post('http://localhost:999/api/todo/update', {id: idStr, do: todoStr, done: !status})
		  .then(res => {
				todo.classList.remove('fa-spinner')
				todo.classList.remove('fa-spin')
				// todo.classList.remove('progress-cursor')
		  	// todo.classList.add(`fa-${status?'check':'warning'}`)
		  	props.reloadList()
		  })
		  .catch(err => console.log(err))
  }

  const deleteTodo = (id) => {

		axios.delete('http://localhost:999/api/todo/delete/'+id)
			.then(res => props.reloadList())
			.catch(err => console.log(err))

  }
  
  return (
	<div className='todo-item'>
	  <span>&emsp;{props.do}</span>
	  <div>
	  {
		props.done?
		<button onClick={() => updateStatus(props.id, props.do, props.done)} className='done-btn-done' title='Already Done.'>
			<i id={props.id} className='fa fa-check'></i>
		</button>:
		<button onClick={() => updateStatus(props.id, props.do, props.done)} className='done-btn-notdone' title='Mark as Done.'>
			<i id={props.id} className='fa fa-warning'></i>
		</button>
	  }
	  <button onClick={() => deleteTodo(props.id)} className='delete-btn' title='Delete this Todo.'><i className='fa fa-trash'></i></button>
	</div>
	</div>
  )
}

export default TodoItem