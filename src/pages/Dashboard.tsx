import { Button } from "@/components/ui/button";
import { supabase } from "../helper/supabaseClient";
import { Link, useNavigate } from "react-router";
import { userAuth } from "@/context/AuthContext";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

export default function Dashboard() {
  const navigate = useNavigate();
  const { session } = userAuth();
  const email = session?.user.email;

  // Function to handle sign out
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }

    navigate("/login");
    return null;
  };

  return (
    <div className="mx-20 space-y-4 mt-20">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h2>
        Hello <span className="text-lg font-semibold">{email}</span> you are
        logged in{" "}
      </h2>

      <Button
        className="mt-20 mr-10"
        variant={"secondary"}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
      <Link to="/login">
        <Button className="mt-20" variant={"secondary"}>
          Login
        </Button>
      </Link>
      <Link to="/">
        <Button className="mt-20 ml-10" variant={"secondary"}>
          Home
        </Button>
      </Link>
      <MessageList />
      <ChatInput />
    </div>
  );
}
