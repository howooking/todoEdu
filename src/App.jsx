import { useEffect, useState } from "react";
import "./App.css";
import { createTodo, getTodos } from "./api/todosApi";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    getTodos().then((res) => setTodos(res));
  }, []);

  return (
    <>
      <h1 className="title">Todo!</h1>
      {/* map!!! */}
      {todos?.map((todo) => (
        <Todo todo={todo} setTodos={setTodos} todos={todos} key={todo.id} /> //props 전달
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setTodoTitle("");
          await createTodo(todoTitle); // 삽입
          await getTodos().then((res) => setTodos(res));
        }}
      >
        <input
          type="text"
          value={todoTitle}
          onChange={(event) => {
            setTodoTitle(event.target.value);
          }}
        />
      </form>
    </>
  );
}

export default App;
