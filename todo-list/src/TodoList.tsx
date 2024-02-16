import "./TodoList.scss";
import React from "react";

type TodoListProps = {
  todos: string[];
  removeItem: (index: number) => void;
};
export default function TodoList({ todos, removeItem }: TodoListProps) {
  return (
    <>
      <h1>Todo List</h1>
      <span>
        Clicking on an item removes it - Showcases page was hydrated with client
        js
      </span>
      <ul>
        {todos.map((todo, index) => (
          <li onClick={() => removeItem(index)}>
            <span>todo item {todo}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
