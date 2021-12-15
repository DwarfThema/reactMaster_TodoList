import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, enumCategories, toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [nowCategory, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  }


  return (
    <div>
      <h1>To-Do List</h1>
      <br />
      <select value={nowCategory} onInput={onInput}>
        <option value={enumCategories.TO_DO}>To Do</option>
        <option value={enumCategories.DOING}>Doing</option>
        <option value={enumCategories.DONE}>Done</option>
      </select>
      <br />
      <CreateToDo />
      <ul>
        {toDos?.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
