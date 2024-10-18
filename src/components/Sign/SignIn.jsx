import * as Form from "@radix-ui/react-form";
import styled from "styled-components";

export default function SignIn() {
  return (
    <FormRoot>
      <FormField name="email" required>
        <Form.Label>Email</Form.Label>
        <FormMessage match="valueMissing">Yo email missing gang</FormMessage>
        <FormControl asChild>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </FormControl>
      </FormField>
      <FormField name="password" required>
        <Form.Label>Password</Form.Label>
        <FormControl asChild>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </FormControl>
        <FormMessage match="valueMissing">Yo email missing gang</FormMessage>
      </FormField>

      <Form.Submit>Sign In</Form.Submit>
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

const FormControl = styled(Form.Control)`
  //   border: 3px solid purple;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 15px;
  line-height: 2;

  &::placeholder {
    font-size: 1.1rem;
    line-height: 1.5;
    transform: translateY(2px); /* Visual vertical centering */
  }
`;

const FormMessage = styled(Form.Message)`
  //   border: 3px solid springgreen;
  align-self: end;
  position: absolute;
  transform: translateY(-13px);
`;
