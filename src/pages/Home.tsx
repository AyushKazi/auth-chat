import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <Link to="/signUp">Sign Up</Link>
      <br />
      <br />
      <Link to="/login">Login</Link>
    </>
  );
}
