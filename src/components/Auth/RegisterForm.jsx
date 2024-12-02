import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import styled from "styled-components";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ destination }) {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formDataObject = {
      firstName: formData.get("firstName").trim(),
      lastName: formData.get("lastName").trim(),
      email: formData.get("email").trim(),
      password: formData.get("password"),
    };

    try {
      const url = "http://localhost:8080/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObject),
      });

      const data = await response.json();

      if (!response.ok) {
        throw Error(`${data.message}`);
      }

      if (data.isAuthenticated) {
        login(
          {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            admin: data.admin,
          },
          data.token
        );
        navigate(destination);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <FormRoot id="registerForm" onSubmit={handleSubmit}>
      <FormField name="firstName">
        <LabelMessageWrapper>
          <FormLabel>First Name</FormLabel>
          <FormMessage match="valueMissing">
            Please enter your first name
          </FormMessage>
          <FormMessage match="patternMismatch">
            First name can only include alphabetical characters
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="text"
            autoComplete="given-name"
            required
            pattern="^[A-Za-z]+$"
            placeholder="Enter your first name"
          />
        </FormControl>
      </FormField>
      <FormField name="lastName">
        <LabelMessageWrapper>
          <FormLabel>Last Name</FormLabel>
          <FormMessage match="valueMissing">
            Please enter your last name
          </FormMessage>
          <FormMessage match="patternMismatch">
            Last name can only include alphabetical characters
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="text"
            autoComplete="family-name"
            required
            pattern="^[A-Za-z]+$"
            placeholder="Enter your last name"
          />
        </FormControl>
      </FormField>
      <FormField name="email">
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
            Please enter a password
          </FormMessage>
          <FormMessage match="patternMismatch">
            The password must be at least 8 characters long, contain at least
            one lowercase letter, one uppercase letter, one digit, and one
            special character
          </FormMessage>
        </LabelMessageWrapper>
        <FormControl asChild>
          <input
            type="password"
            autoComplete="new-password"
            required
            placeholder="Enter your password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
          />
        </FormControl>
      </FormField>
      <FormField name="confirmPassword">
        <LabelMessageWrapper>
          <FormLabel>Confirm Password</FormLabel>
          <FormMessage match="valueMissing">
            Please re-enter your password
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
