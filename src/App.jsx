import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: "",
    name: "",
    status: "todo", // can be 'inprogress' or 'completed'
  });

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.name.trim()) {
      setTodos([...todos, todo]);
      setTodo({ id: "", name: "", status: "todo" });
    }
  };

  const handleRemove = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
  };

  const handleStatus = (id) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, status: t.status === "todo" ? "completed" : "todo" };
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Todo App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo.name}
            onChange={(e) =>
              setTodo({
                ...todo,
                name: e.target.value,
                id: `${Date.now()}`,
              })
            }
          />
          <button type="submit">Go</button>
        </form>

        <ul className="allTodos">
          {todos.map((todo) => (
            <li className="singleTodo" key={todo.id}>
              <span
                className="todoText"
                style={{
                  textDecoration:
                    todo.status === "completed" ? "line-through" : "none",
                }}
              >
                {todo.name}
              </span>
              <button onClick={() => handleStatus(todo.id)}>
                {todo.status === "completed" ? "Completed" : "Todo"}
              </button>
              <button onClick={() => handleRemove(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
