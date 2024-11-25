import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

export default function SignIn({ setOpen }) {
  const [error, setError] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Extract the form values
    const formDataObject = {
      email: formData.get("login_email"),
      password: formData.get("login_password"),
    };

    const url = "http://localhost:8080/users/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      const data = await response.json();

      if (!response.ok) {
        throw Error(`There was an error(${response.status}): ${data.error}`);
      }

      setOpen(false);

      console.log(data);
    } catch (error) {
      event.target.reset();
      setError(true);
      console.error(error);
    }
  }

  return (
    <FormRoot id="formLogin" onSubmit={handleSubmit}>
      <FormField name="login_email" required>
        <LabelMessageWrapper>
          <FormLabel>Email</FormLabel>
          <FormMessage match="valueMissing">Yo email missing gang</FormMessage>
          <FormMessage match="typeMismatch">
            That's not an email gang
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            autoComplete="username"
            type="email"
            placeholder="Enter your email"
            required
          />
        </FormControl>
      </FormField>
      <FormField name="login_password" required>
        <LabelMessageWrapper>
          <FormLabel>Password</FormLabel>
          <FormMessage match="valueMissing">
            Yo password missing gang
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            autoComplete="current-password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </FormControl>
      </FormField>

      <Form.Submit>Sign In</Form.Submit>
      {error && <ErrorMessage>This is an error message</ErrorMessage>}
    </FormRoot>
  );
}

const shakeAnimation = keyframes`
0% { transform: translateX(0); }
25% { transform: translateX(-5px); }
50% { transform: translateX(5px); }
75% { transform: translateX(-5px); }
100% { transform: translateX(0); }
`;

const FormRoot = styled(Form.Root)`
  //   border: 3px solid red;
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-family: "Rajdhani";
  font-weight: 600;
`;

const FormField = styled(Form.Field)`
  //   border: 3px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const LabelMessageWrapper = styled.div`
  //   border: 2px solid red;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FormLabel = styled(Form.Label)`
  //   border: 3px solid green;
`;

const FormMessage = styled(Form.Message)`
  //   border: 3px solid springgreen;
  font-size: 1rem;
  display: flex;
  align-items: center;
  font-weight: 600;
  transform: translateY(2px); /* Visual vertical alignment */
  color: red;
  animation: ${shakeAnimation} 200ms ease;
`;

const FormControl = styled(Form.Control)`
  //   border: 3px solid purple;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 1.2rem;
  line-height: 2;
  background-color: rgba(0, 0, 0, 0.1);
  padding-left: 5px;

  &::placeholder {
    font-size: 1.2rem;
    line-height: 1.5;
    transform: translateY(2px); /* Visual vertical centering */
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  animation: ${shakeAnimation} 200ms ease;
`;
