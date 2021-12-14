import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setTodos = useSetRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const submitFn = ({ toDo }: IForm) => {
    setTodos((oldTodo) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
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
