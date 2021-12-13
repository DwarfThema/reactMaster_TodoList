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
  width: 400px;
`;

function ToDoList() {
  const { register: todoResister, watch } = useForm();
  console.log(watch());

  return (
    <div>
      <Form>
        <input {...todoResister("ID")} placeholder="ID" />
        <input {...todoResister("First Name")} placeholder="First Name" />
        <input {...todoResister("Last Name")} placeholder="Last Name" />
        <input {...todoResister("Email")} placeholder="Email" />
        <input {...todoResister("passWord")} placeholder="passWord" />
        <input {...todoResister("address")} placeholder="address" />
        <button>Add</button>
      </Form>
    </div>
  );
}

export default ToDoList;
