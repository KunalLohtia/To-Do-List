import React, {useState, useRef, useEffect} from 'react'
import Todolist from './Todolist';
import { v4 as uuidv4 } from 'uuid';
// give todos array a key
const LOCAL_STORAGE_KEY = 'todoApp.todos'

/* usestate hook
use state represents how we change states of app */
/* import todolist means taking that component into the app */
// App.js is a common naming convention for the main or root component of a React application. It's where the structure and layout of your application are defined. In a typical React project created using tools like Create React App, App.js is the starting point for building the user interface.

/* useref hook 
reference elements inside html, use it to obtain user input
*/

/* uuid
import this library so that we can use a function that
gives a random key id for each todo (function is called uuid/v4)
*/

/*
hook in react that manages side effects of the app 
*/

function App() {
  // setting use state to null initially 

  // todos is every todo in the todo state,
  // set todos is the function that updates the todos
  // each todo has id, name, and complete status
  const [todos, setTodos] = useState([])

  // used to get access to input ref element
  const todoNameRef = useRef()

  // to load todos, called right when component loads
  // so provide it with empty array as well since that is the start of the 
  // app state
  useEffect(() => {
    // retrieve saved todos from local storage
    // use json to parse
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // takes in function and array of todos
  // anytime array changes, save todos to local storage
  useEffect(() => {
    // give it the todos array key as well as string of todos
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // function that allows us to toggle the checkboxes of the todos
  // takes in id of the todo to toggle the checkbox for
  function toggleTodo(id){
    // create a copy of the todo array so that we don't mess up current todo list
    const newTodo = [...todos]
    // find todo w/ id we are looking for to modify its checkbox
    const todo = newTodo.find(todo => todo.id === id)
    // once you find todo with id, set its complete flag to its opposite
    // allows user to check and uncheck checkbox respectively
    todo.complete = !(todo.complete)
    // update todos to new todos based on the copy we have made
    setTodos(newTodo)

  }


  // add to do button handler function 
  // takes in event
  function handleAddTodo(e) {
    // retrieve value of element we are currently referencing
    // which in this case is the input
    const name = todoNameRef.current.value
    if (name === '') return
    // use set todos function to take in prev todos function
    // which gives prev todos and we can add new todo after

    setTodos(prevTodos => {
      return [...prevTodos, {id:uuidv4(), name: name, complete:false}]
    })
    // clear out input entered for the todo
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => (!todo.complete))
    setTodos(newTodos)
  }

  return (
    /* the <> and </> represent fragment where we can return multiple things. without wrapping them in a parent element. It's a way to group elements without introducing an extra DOM element. */

    /* <Todolist /> renders a TodoList component. TodoList is a React component that displays a list of todo items or tasks.*/

    // add todo button has on click listener that is connected to handle add to do function
    <>

    <Todolist todos = {todos} toggleTodo = {toggleTodo}/>
    <input ref = {todoNameRef} /> 
    <button onClick={handleAddTodo}> Add Todo</button>
    <button onClick={handleClearTodos}> Clear Completed</button>
    <div> {todos.filter(todo => !todo.complete.length)} left to do</div>
    </>
  )
}

export default App;
