import React from 'react'
import Todo from './todo'
export default function Todolist({todos, toggleTodo}) {
    return (
        // map over todo array and return elements of actual todos
        todos.map(todo => {
            // in order to not rerender every single to do element
            // can assign a key to each todo so that it only rerenders the 
            // todos that change
            return <Todo key ={todo.id} toggleTodo = {toggleTodo} todo={todo} />
        })
    )

}