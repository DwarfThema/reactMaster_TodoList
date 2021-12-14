import { useForm } from "react-hook-form";
import styled from "styled-components";

interface ITodo {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm();

  const submitFn = (data: ITodo) => {
    console.log(data);
    setValue("toDo", "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitFn)}>
        <input {...register("toDo")} type="text" placeholder="Add Todo" />
        <button>add</button>
      </form>
    </div>
  );
}

export default ToDoList;
