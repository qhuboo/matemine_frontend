import styled from "styled-components";
import LoginForm from "./LoginForm";
import { Link, useLocation } from "react-router-dom";

export default function Login() {
  const { state } = useLocation();
  const destination = state?.path ? state.path : "/";
  console.log(destination);

  return (
    <FormWrapper>
      <LoginForm destination={destination} />
      <NavLink to={"/register"} state={{ destination }}>
        Register
      </NavLink>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  border: 2px solid red;
`;

const NavLink = styled(Link)``;
