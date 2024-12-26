import { useEffect } from "react";
import RegisterForm from "./RegisterForm";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "./hooks/useAuth";

export default function Register() {
  const user = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const destination = state?.destination ? state.destination : "/";

  useEffect(() => {
    if (user?.isAuthenticated) {
      console.log("in heo");
      navigate("/account");
    }
  }, [user, navigate]);

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
