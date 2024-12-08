import * as Form from "@radix-ui/react-form";
import styled, { keyframes } from "styled-components";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const url = "http://localhost:8080/auth/login";

export default function LoginForm({ destination }) {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const loginUser = useMutation({
    mutationFn: async (formDataObject) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        const data = await response.json();
        const error = new Error(data.message);
        error.message = data.message;
        throw error;
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.isAuthenticated) {
        login(data);
        navigate(destination);
      }
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (loginUser.isPending || isAuthenticated) {
      return;
    }
    const formData = new FormData(event.target);

    // Extract the form values
    const formDataObject = {
      email: formData.get("email").trim(),
      password: formData.get("password"),
    };

    loginUser.mutate(formDataObject);
    if (loginUser.isSuccess) {
      if (loginUser?.data?.isAuthenticated) {
        navigate(destination);
      }
    }
  }

  console.log(loginUser.status);

  return (
    <FormRoot id="formLogin" onSubmit={handleSubmit}>
      <FormField name="email" required>
        <LabelMessageWrapper>
          <FormLabel>Email</FormLabel>
          <FormMessage match="valueMissing">
            Please enter your email address
          </FormMessage>
          <FormMessage match="typeMismatch">
            Please enter a valid email address
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
      <FormField name="password" required>
        <LabelMessageWrapper>
          <FormLabel>Password</FormLabel>
          <FormMessage match="valueMissing">
            Please enter a password
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

      <Form.Submit>Log In</Form.Submit>
      {loginUser.isError && (
        <ErrorMessage>{loginUser.error.message}</ErrorMessage>
      )}
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
