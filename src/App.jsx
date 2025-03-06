import { useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { Github } from "lucide-react";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("dark");

  //Dark Mode logic

  const setDark = () => {
    setTheme("dark");
  };

  const setLight = () => {
    setTheme("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  const themeBtnClick = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // TODO logics

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{
        addTodo,
        deleteTodo,
        updateTodo,
        toggleComplete,
        todos,
        setDark,
        setLight,
      }}
    >
      <div
        className={`w-screen h-screen flex flex-col ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div
          className={`flex justify-evenly items-center w-screen shadow-inner text-center text-3xl font-mono h-16 ${
            theme === "dark" ? "border-b border-gray-400" : "border-b border-b-black"
          }`}
        >
          <h1 className="absolute left-1/2 transform -translate-x-1/2 font-bold font-mono">
            Retro To-Do
          </h1>
          <button onClick={themeBtnClick} className="ml-auto mr-8">
            {theme === "dark" ? <MdLightMode /> : <MdOutlineDarkMode />}
          </button>
        </div>
  
        {/* Main Content */}
        <div className="flex-grow p-2">
          <p className="flex justify-center items-center text-center text-2xl font-mono h-16 p-2">
            Manage your to-do list
          </p>
          <TodoForm />
          <div className="font-mono mt-4">
            {todos.map((todo) => (
              <TodoList key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
  
        {/* Footer */}
        <footer className="flex items-center justify-center font-mono space-x-3 text-sm h-12 border-t border-gray-400">
          <span>Made by Praneet.</span>
          <span>|</span>
          <a
            href="https://github.com/arkp1"
            target="_blank"
            className="flex items-center space-x-1"
          >
            <Github strokeWidth={1.25} width={20} />
            <span>Github</span>
          </a>
        </footer>
      </div>
    </TodoProvider>
  );
}

export default App;
