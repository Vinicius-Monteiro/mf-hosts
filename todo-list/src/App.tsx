import React, { useState } from "react";
import ReactDOM from "react-dom";
import TodoList from "./TodoList";

const App = () => {
  const [todos, setTodos] = useState(["Breakfast", "Lunch", "Dinner"]);

  const removeItem = (index: number) => {
    setTodos((oldValue) =>
      oldValue.slice(0, index).concat(oldValue.slice(index + 1))
    );
  };

  return (
    <div>
      <TodoList todos={todos} removeItem={removeItem} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
