import { useState } from "react";
import { deleteTodos, getTodos, updateDone } from "../api/todosApi";

/* eslint-disable react/prop-types */
export default function Todo({ todo, setTodos, todos }) {
  const [isEdit, setEdit] = useState(false); //closure!
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.done}
        onChange={async (event) => {
          await updateDone(todo.id, todo.title, event.target.checked); //검색
          await getTodos().then((res) => setTodos(res));
        }}
      />
      {isEdit ? (
        <>
          <input type="text" />
        </>
      ) : (
        <span>{todo.title}</span>
      )}

      <button onClick={() => setEdit(!isEdit)}>수정</button>
      <button
        onClick={async () => {
          // 해당하는 todo를 todos에서 삭제한다.
          setTodos(todos.filter((element) => element.id !== todo.id));
          await deleteTodos(todo.id); // 검색!
          // await getTodos().then((res) => setTodos(res));
        }}
      >
        삭제
      </button>
    </div>
  );
}
