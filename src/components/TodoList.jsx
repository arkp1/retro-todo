import React from 'react'
import { useTodo } from '../context/TodoContext'
import { useState } from 'react'


export default function TodoList({todo}) {

    const   {updateTodo, deleteTodo, toggleComplete} = useTodo()

    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)

    const editTodo = () => {
        updateTodo(todo.id, {...todo, todo: todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        return toggleComplete(todo.id)
    }

  return (
    <div className='flex justify-center items-center'>
    <div className={`flex border w-11/12 border-black/10 rounded-sm px-3 py-1.5 gap-x-3 shadow-sm
         shadow-white/50 duration-300 border-b-gray-500
            ${todo.completed ? "": ""}`}>
        <input 
        type="checkbox"
        className='cursor-pointer'
        checked={todo.completed}
        onChange={toggleCompleted}
        />
        <input 
        type='text'
        className={`border border-white outline-none w-full bg-transparent read-only:outline-none read-only:border-none rounded-lg
         ${isTodoEditable ? "border-gray-400 px-2": "border-transparent"}
         ${todo.completed ? "line-through" : ""}
         `}
         value={todoMsg}
         onChange={(e) => setTodoMsg(e.target.value)}
         readOnly={!isTodoEditable}
        />
        <button
        className='font-mono inline-flex w-10 h-8 rounded-sm text-sm text-black border border-black/10 justify-center 
        items-center bg-white hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={() => {
            if(todo.completed) return
            if(isTodoEditable) {
                editTodo()
            }
            else setIsTodoEditable(prev => !prev)
        }}
        disabled={todo.completed}
        >
          {isTodoEditable ? "save" : "edit"}
        </button>
        <button
         className='font-mono inline-flex w-8 h-8 rounded-sm text-sm border border-black/10 
         justify-center items-center text-black
        bg-white hover:bg-gray-100 shrink-01'
        onClick={() => deleteTodo(todo.id)}
        >
        X
        </button>
        </div>
        </div>
  )
}
