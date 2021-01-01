import React from 'react'

function TodoItem(props) {

  const updateStatus = (id, doStr, done) => {
  	const todo = document.getElementById(id)
	todo.classList.add('fa-spinner')
	todo.classList.add('fa-spin')
	setTimeout(() => {
	  	// console.log("Update Status Item", id, doStr, done)
	  	props.updateStatus(id, {"do": doStr, "done": done})
	  	todo.classList.remove('fa-spinner')
		todo.classList.remove('fa-spin')
	}, 1000)
  }

  const deleteTodo = (id) => {
  	props.deleteTodo(id)
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