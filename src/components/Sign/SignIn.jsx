import * as Form from "@radix-ui/react-form";
import styled from "styled-components";

export default function SignIn() {
  return (
    <Form.Root>
      <Form.Field name="email" required>
        <Form.Label>Email</Form.Label>
        <Form.Control asChild>
          <input type="email" name="" id="" />
        </Form.Control>
        <Form.Message match="valueMissing">Yo email missing gang</Form.Message>
      </Form.Field>

      <FormSubmit>Edit Profile</FormSubmit>
    </Form.Root>
  );
}

const FormSubmit = styled(Form.Submit)`	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	padding: 0 15px;
	font-size: 15px;
	line-height: 1;
	font-weight: 500;
	height: 35px;
	width: 100%;
	background-color: white;
	color: green;
	box-shadow: 0 2px 10px black;
}`;
