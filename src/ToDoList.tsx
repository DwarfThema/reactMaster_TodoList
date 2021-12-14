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
  address?: string;
}

function ToDoList() {
  const {
    register: todoResister,
    handleSubmit,
    formState: { errors },
  } = useForm<Isubmit>({ defaultValues: { Email: "@naver.com" } });
  const onValid = (data: any) => {};
  console.log(errors);

  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...todoResister("id", {
            required: "Your ID is Required",
            minLength: { value: 20, message: "Your ID is too short" },
          })}
          placeholder="ID"
        />
        <span style={{ color: "red" }}>{errors?.id?.message}</span>
        <input {...todoResister("FirstName")} placeholder="First Name" />
        <input {...todoResister("LastName")} placeholder="Last Name" />
        <input
          {...todoResister("Email", {
            required: "your Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "only Naver Email is required",
            },
          })}
          placeholder="Email"
        />
        <span style={{ color: "red" }}> {errors?.Email?.message} </span>
        <input {...todoResister("passWord")} placeholder="passWord" />
        <input {...todoResister("address")} placeholder="address" />
        <button>Add</button>
      </Form>
    </div>
  );
}

export default ToDoList;
