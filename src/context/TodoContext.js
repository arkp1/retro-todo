import {createContext, useContext} from "react"


export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo Message",
            completed: false
        },
        {
            id: 2,
            todo: "Todo Message 2",
            completed: false
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
},
        {
            themeMode: "dark",
            setLight: () => {},
            setDark: () => {},  
        }

)

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider