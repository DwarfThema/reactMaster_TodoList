import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { enumCategories, ITodos, toDoState } from "../atom";

function ToDo({ text, category, id }: ITodos) {
  const setToDo = useSetRecoilState(toDoState);
  const nowToDo = useRecoilValue(toDoState);
  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDo((oldToDo) => {
      const findIndex = oldToDo.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as ITodos["category"] };
      return [
        ...oldToDo.slice(0, findIndex),
        newToDo,
        ...oldToDo.slice(findIndex + 1),
      ];
    });
  };

  const delTodo = () => {
    setToDo((oldToDos) => {
      const findIndex = oldToDos.findIndex((todo) => todo.id === id);
      return [
        ...oldToDos.slice(0, findIndex),
        ...oldToDos.slice(findIndex + 1),
      ];
    });
    localStorage.setItem("Todo", JSON.stringify(nowToDo));
  };

  return (
    <li>
      <span>{text}</span>
      {category !== enumCategories.DOING && (
        <button name={enumCategories.DOING} onClick={changeCategory}>
          Doing
        </button>
      )}
      {category !== enumCategories.TO_DO && (
        <button name={enumCategories.TO_DO} onClick={changeCategory}>
          To Do
        </button>
      )}
      {category !== enumCategories.DONE && (
        <button name={enumCategories.DONE} onClick={changeCategory}>
          Done
        </button>
      )}
      <button onClick={delTodo}>❌</button>
    </li>
  );
}

export default ToDo;
