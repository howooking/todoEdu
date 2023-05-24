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

  // input에 입력을 하였을 때(change가 발생)
  const handleOnChange = (event) => {
    setTodoTitle(event.target.value);
  };

  // submit이 발생하였을 때
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setTodoTitle("");
    await createTodo(todoTitle);
    await getTodos().then((res) => setTodos(res));
  };

  return (
    <>
      <h1 className="title">Todo!</h1>
      {/* map!!! */}
      {todos?.map((todo) => (
        <Todo todo={todo} setTodos={setTodos} todos={todos} key={todo.id} /> //props 전달
      ))}
      <form onSubmit={handleOnSubmit}>
        <input type="text" value={todoTitle} onChange={handleOnChange} />
      </form>
    </>
  );
}

export default App;
