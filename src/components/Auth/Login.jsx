import styled from "styled-components";
import LoginForm from "./LoginForm";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "react-feather";

export default function Login() {
  const { state } = useLocation();
  const destination = state?.path ? state.path : "/";

  return (
    <FormWrapper>
      <LoginForm destination={destination} />
      <NavLink to={"/register"} state={{ destination }}>
        <RegisterButton>
          Register <ArrowRight />
        </RegisterButton>
      </NavLink>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  // border: 2px solid green;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

const RegisterButton = styled.button`
  font-family: "Rajdhani";
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;
