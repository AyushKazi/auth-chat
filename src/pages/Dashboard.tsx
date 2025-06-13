import { Button } from "@/components/ui/button";
import { supabase } from "../helper/supabaseClient";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

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
      <h2>Hello you are logged in </h2>

      <Button className="mt-20" variant={"secondary"} onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
