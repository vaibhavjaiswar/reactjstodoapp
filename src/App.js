import React, {useState} from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import TodoList from './TodoList'
import DemoApp from './DemoApp/DemoApp'

function App() {
  
  const [todo, setTodo] = useState('')
  const [newTodo, setNewTodo] = useState(false)

  const setTodoText = (e) => {
    setTodo(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault()

    if(todo === '') {
      alert('Todo description required.')
      return false
    }

    const todoItem = {
      do: todo,
      done: false
    }

    axios.post('http://localhost:999/api/todo/addtodo', todoItem)
      .catch(err => console.log(err))
      .then(() => {
        setTodo('')
        setNewTodo(true)
      })

  }

  return (
    <BrowserRouter>
    <Switch>
    <Route path="/demo-app">
      <DemoApp />
    </Route>
    <Route path="/">
      <div id="App">
        <header>
          <h1>Todo List App</h1>
        </header>
        <main>
          <div id="todo-form">
            <h3>Add into Todo List</h3>
            <form id="todoForm">
              <label>Todo description : </label><br/>
              <div>
              <input type="text" value={todo} onChange={setTodoText} />
              <button id="submit-btn" onClick={submitForm}>Add Todo</button>
              </div>
            </form>
          </div>
          <TodoList todoAdded={newTodo} />
        </main>
      </div>
    </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;