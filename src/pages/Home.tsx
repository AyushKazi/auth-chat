import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="container m-auto mt-20 flex flex-col items-center justify-center space-y-4">
      <h1>Welcome to the Home Page</h1>

      <Link to="/dashboard" className="flex ">
        <Button variant={"secondary"}>Go to dashboard</Button>
      </Link>

      <>
        <Link to="/signUp">
          <Button variant={"secondary"}>Sign Up</Button>
        </Link>
        <br />
        <br />
        <Link to="/login">
          <Button variant={"secondary"}>Login</Button>
        </Link>
      </>
    </div>
  );
}
