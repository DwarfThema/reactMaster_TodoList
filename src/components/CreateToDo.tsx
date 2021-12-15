import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atom";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [nowTodos, setTodos] = useRecoilState(toDoState);
  const valueCategory = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const submitFn = ({ toDo }: IForm) => {
    setTodos((oldTodo) => [
      { text: toDo, id: Date.now(), category: valueCategory },
      ...oldTodo,
    ]);
    console.log(nowTodos);

    setValue("toDo", "");
  };

  useEffect(() => {
    const save = () => {
      localStorage.setItem("Todo", JSON.stringify(nowTodos));
    };
    save();
  }, [submitFn]);

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <input {...register("toDo")} type="text" placeholder="Add Todo" />
      <button>add</button>
    </form>
  );
}

export default CreateToDo;
