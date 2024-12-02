import useAuth from "../Auth/hooks/useAuth";

export default function Account() {
  const { user } = useAuth();

  return <div>{user.firstName}</div>;
}
