import RegisterForm from "./RegisterForm";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Register() {
  const { state } = useLocation();
  const destination = state?.destination ? state.destination : "/";

  return (
    <FormWrapper>
      <RegisterForm destination={destination} />
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  // border: 2px solid red;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;
