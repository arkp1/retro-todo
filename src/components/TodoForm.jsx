import React from 'react'
import { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoForm() {
     
    const [todo, setTodo] = useState("")

    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if(!todo) return 
        addTodo({todo, completed: false})
        setTodo("")
    }

  return (
    <div>
    <form onSubmit={add} className='flex w-full justify-center items-center'>
        <input type="text" 
        placeholder='Write here...'
        className='font-mono  w-11/12 border border-black/25 rounded-sm px-3 outline-none duration-150 bg-white/20 py-1.5'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit"
        className='rounded-r-sm px-3 py-1.5 border border-black/25 font-mono bg-white text-black'
        >Add</button>
    </form>
    </div>
  )
}

export default TodoForm