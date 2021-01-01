import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import TodoItem from './TodoItem'

function TodoList(props) {

  const [todoList, setTodoList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:999/api/todo/')
      .then(res => setTodoList(res.data))
      .then(() => setLoading(false))
      .catch(err => console.log(err))

    if(props.todoAdded) {
      reloadList()
    }
  }, [props])

  const reloadList = () => {
    axios.get('http://localhost:999/api/todo/')
      .then(res => setTodoList(res.data))
      .catch(err => console.log(err))
  }

  return (
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
        todoList.map(data => <TodoItem do={data.do} done={data.done} key={data._id} id={data._id} reloadList={reloadList} />)
      }
      <div id="clientside-todo">
        <h4><Link to="/demo-app">If not loading click here for Client Side version (for demo purpose).</Link></h4>
      </div>
    </div>
  )
}

export default TodoList