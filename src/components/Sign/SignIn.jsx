import * as Form from "@radix-ui/react-form";
import styled from "styled-components";

export default function SignIn() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Extract the form values
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(data);
  }

  return (
    <FormRoot onSubmit={handleSubmit}>
      <FormField name="email" required>
        <LabelMessageWrapper>
          <FormLabel>Email</FormLabel>
          <FormMessage match="valueMissing">Yo email missing gang</FormMessage>
          <FormMessage match="typeMismatch">
            That's not an email gang
          </FormMessage>
        </LabelMessageWrapper>
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
        <LabelMessageWrapper>
          <Form.Label>Password</Form.Label>
          <FormMessage match="valueMissing">
            Yo password missing gang
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </FormControl>
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
  font-weight: 400;
  transform: translateY(2px); /* Visual vertical alignment */
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
  padding-left: 10px;

  &::placeholder {
    font-size: 1.2rem;
    line-height: 1.5;
    transform: translateY(2px); /* Visual vertical centering */
  }
`;
