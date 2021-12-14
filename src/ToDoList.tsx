import { useForm } from "react-hook-form";
import styled from "styled-components";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  }; */

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  width: 80%;
  margin: 20px;
`;

interface Isubmit {
  id: string;
  FirstName?: string;
  LastName?: string;
  Email: string;
  passWord?: string;
  passWordAgain?: string;
  passWordcor?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Isubmit>({ defaultValues: { Email: "@naver.com" } });
  const onValid = (data: Isubmit) => {
    if (data.passWord !== data.passWordAgain) {
      setError(
        "passWordcor",
        { message: "Passwords do not match" },
        { shouldFocus: true }
      );
    }
  };
  console.log(errors);

  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("id", {
            required: "Your ID is Required",
            minLength: { value: 3, message: "Your ID is too short" },
            validate: {
              ViolentWords: (value) =>
                value.includes("violentWords")
                  ? "Don't type violent words"
                  : true,
              BadWords: (value) =>
                value.includes("BadWords") ? "Don't type Bad words" : true,
            },
          })}
          placeholder="ID"
        />
        <span style={{ color: "red" }}>{errors?.id?.message}</span>
        <input {...register("FirstName")} placeholder="First Name" />
        <input {...register("LastName")} placeholder="Last Name" />
        <input
          {...register("Email", {
            required: "your Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "only Naver Email is required",
            },
          })}
          placeholder="Email"
        />
        <span style={{ color: "red" }}> {errors?.Email?.message} </span>
        <input {...register("passWord")} placeholder="passWord" />
        <input
          {...register("passWordAgain")}
          placeholder="passWord Once Again"
        />
        <span style={{ color: "red" }}> {errors?.passWordcor?.message} </span>
        <button>Add</button>
      </Form>
    </div>
  );
}

export default ToDoList;
