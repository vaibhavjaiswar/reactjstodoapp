import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import TodoItem from './DemoTodoItem'
// import TodoList from './DemoTodoList'

function DemoApp() {

	const [todo, setTodo] = useState('')
	const [todoList, setTodoList] = useState([])
	const [loading, setLoading] = useState(true)
	const [count, setCount] = useState(0)

	let DB = [
	{"do" : "Withdraw money from ATM.", "done" : true },
	{"do" : "Buy Blue Paint.", "done" : true },
	{"do" : "Wake up at 6:00 AM.", "done" : true },
	{"do" : "Send mails...", "done" : false },
	{"do" : "Paint the home.", "done" : true },
	{"do" : "Learn MERN.", "done" : false },
	{"do" : "Complete this Todo Demo.", "done" : true }
	]

	useEffect(() => {
		setTimeout(() => {
			setTodoList(DB)
			setLoading(false)
		}, 1000)
	},[])

	const changeTodo = (e) => {
		setTodo(e.target.value)
	}

	const submitForm = (e) => {
		e.preventDefault()
		let todo = document.getElementById('todo-str').value

		if(todo === '') {
			alert('Todo description required.')
			return false
		}

		setTimeout(() => {
			setTodo(todo)
			document.getElementById('todo-str').value = ""
			let temp = todoList
			temp.push({"do": todo, "done": false})
			console.log(temp)
			console.log(todoList)
			setTodoList(temp)
		    setCount(count+1)
		}, 500)
	}

	const updateStatus = (id, item) => {
	    // console.log("Update status List", item)
	    let temp = todoList
	    // console.log("Temp Todo List", temp[id])
	    temp[id] = {"do": item.do, "done": !item.done}
	    // console.log("Now temp will be", temp[id])
	    setTodoList(temp)
	    // console.log("New Todo List", todoList[id])
	    setCount(count+1)
	}

	const deleteTodo = (id) => {
		let temp = todoList
		temp.splice(id, 1)
		setTodoList(temp)
		setCount(count+1)
	}

	return(
		<div id="App">
		<header>
			<h1>Todo List App (Demo)</h1>
		</header>
		<main>
		<div id="todo-form">
		<h3>Add into Todo List</h3>
		<form id="todoForm">
			<label>Todo description : </label><br/>
			<div>
			<input id="todo-str" type="text" value={todo} onChange={changeTodo} />
			<button id="submit-btn" onClick={submitForm}>Add Todo</button>
			</div>
		</form>
		</div>
		<div id="todo-list">
		<h3>Current Todo List</h3>
		<div id="hints">
		<div>
			<button className="done-btn-done"><i className="fa fa-check"></i></button><h4>Done</h4>
		</div>
		<div>
			<button className="done-btn-notdone"><i className="fa fa-warning"></i></button><h4>To be done</h4>
		</div>
		<div>
			<button className="delete-btn"><i className="fa fa-trash"></i></button><h4>Delete</h4>
		</div>
		</div>
		{
			loading ?
			<div id="loading">Loading...<i className="fa fa-spinner fa-spin"></i></div> :
			todoList.map((data,i) => <TodoItem do={data.do} done={data.done} key={i} id={i}
				updateStatus={updateStatus}
				deleteTodo={deleteTodo}
				count={count} />)
		}
		<div id="clientside-todo">
		<h4><Link to="/">Click here to return to Original.</Link></h4>
		</div>
		</div>
		</main>
		</div>
	)
}

export default DemoApp