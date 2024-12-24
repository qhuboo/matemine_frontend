import * as Form from "@radix-ui/react-form";
import styled, { keyframes } from "styled-components";
import useAuth from "./hooks/useAuth";
import useRegister from "../../api/apiHooks/useRegister";
import { QUERIES } from "../../constants";

export default function RegisterForm({ destination }) {
  const user = useAuth();
  const registerUser = useRegister(destination);
  async function handleSubmit(event) {
    event.preventDefault();
    if (registerUser.isPending || user.isAuthenticated) {
      return;
    }
    const formData = new FormData(event.target);

    const formDataObject = {
      firstName: formData.get("firstName").trim(),
      lastName: formData.get("lastName").trim(),
      email: formData.get("email").trim(),
      password: formData.get("password"),
    };

    registerUser.mutate(formDataObject);
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
      {registerUser.isError && (
        <ErrorMessage>{registerUser.error.message}</ErrorMessage>
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
  // border: 3px dashed red;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-family: "Rajdhani";
  font-weight: 600;

  @media (${QUERIES.laptopAndSmaller}) {
    width: 75%;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    width: 90%;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    width: 100%;
  }
`;

const FormField = styled(Form.Field)`
  // border: 3px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const LabelMessageWrapper = styled.div`
  // border: 2px solid red;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormLabel = styled(Form.Label)`
  // border: 3px solid yellow;
  font-size: 1.25rem;

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 1.15rem;
  }
`;

const FormMessage = styled(Form.Message)`
  // border: 3px solid springgreen;
  font-size: 1rem;
  display: flex;
  align-items: center;
  transform: translateY(2px); /* Visual vertical alignment */
  color: red;
  animation: ${shakeAnimation} 200ms ease;

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 0.9rem;
    transform: translateY(-0px); /* Visual vertical alignment */
  }
`;

const FormControl = styled(Form.Control)`
  // border: 3px solid purple;
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
