import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setTodos = useSetRecoilState(toDoState);
  const valueCategory = useRecoilValue(categoryState)

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const submitFn = ({ toDo }: IForm) => {
    setTodos((oldTodo) => [
      { text: toDo, id: Date.now(), category: valueCategory },
      ...oldTodo,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <input {...register("toDo")} type="text" placeholder="Add Todo" />
      <button>add</button>
    </form>
  );
}

export default CreateToDo;
