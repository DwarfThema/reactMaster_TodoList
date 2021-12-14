import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

interface ITodos {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<ITodos[]>({
  key: "todo",
  default: [],
});

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm();

  const submitFn = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setTodos((oldTodo) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldTodo,
    ]);
  };

  const [toDos, setTodos] = useRecoilState(toDoState);

  return (
    <div>
      <h1>To-Do List</h1>
      <br />
      <form onSubmit={handleSubmit(submitFn)}>
        <input {...register("toDo")} type="text" placeholder="Add Todo" />
        <button>add</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}> {todo.text} </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
