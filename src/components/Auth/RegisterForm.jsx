import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import styled from "styled-components";

export default function RegisterForm({ setOpen }) {
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formDataObject = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(formDataObject);

    try {
      const url = "http://localhost:8080/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {},
        body: JSON.stringify(formDataObject),
      });

      const data = await response.json();

      if (!response.ok) {
        throw Error(`There was an error(${response.status}): ${data.error}`);
      }

      setOpen(false);
      console.log(data);
    } catch (error) {
      setError(true);
      event.target.reset();
      console.log(error);
    }
  }

  return (
    <FormRoot id="registerForm" onSubmit={handleSubmit}>
      <FormField name="firstName">
        <LabelMessageWrapper>
          <FormLabel>First Name</FormLabel>
          <FormMessage match="valueMissing">
            Yo gang your first name missing
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="text"
            autoComplete="given-name"
            required
            placeholder="Enter your first name"
          />
        </FormControl>
      </FormField>
      <FormField name="lastName">
        <LabelMessageWrapper>
          <FormLabel>Last Name</FormLabel>
          <FormMessage match="valueMissing">
            Yo gang your last name missing
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="text"
            autoComplete="family-name"
            required
            placeholder="Enter your last name"
          />
        </FormControl>
      </FormField>
      <FormField name="email">
        <LabelMessageWrapper>
          <FormLabel>Email</FormLabel>
          <FormMessage match="valueMissing">
            Yo gang your email missing
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="email"
            autoComplete="username"
            required
            placeholder="Enter your email"
          />
        </FormControl>
      </FormField>
      <FormField name="password">
        <LabelMessageWrapper>
          <FormLabel>Password</FormLabel>
          <FormMessage match="valueMissing">
            Yo gang your password missing
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="password"
            autoComplete="new-password"
            required
            placeholder="Enter your password"
          />
        </FormControl>
      </FormField>
      <FormField name="confirmPassword">
        <LabelMessageWrapper>
          <FormLabel>Confirm Password</FormLabel>
          <FormMessage match="valueMissing">
            Yo gang re-enter your passowrd
          </FormMessage>
          <FormMessage
            match={(value, formData) => {
              if (value !== formData.get("password")) {
                return true;
              } else {
                return false;
              }
            }}
          >
            Passwords don't match
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="password"
            autoComplete="new-password"
            required
            placeholder="Confirm Password"
          />
        </FormControl>
      </FormField>
      <Form.Submit>Register</Form.Submit>
    </FormRoot>
  );
}

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
  //   border: 3px solid yellow;
`;

const FormMessage = styled(Form.Message)`
  //   border: 3px solid springgreen;
  font-size: 1rem;
  display: flex;
  align-items: center;
  font-weight: 400;
  transform: translateY(2px); /* Visual vertical alignment */
`;

const FormControl = styled(Form.Control)`
  //   border: 3px solid yellow;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
