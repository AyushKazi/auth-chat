import { userAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     // Simulate an authentication check
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     console.log("Session:", session);
  //     console.log("Authenticated:", !!session);
  //     console.log("user", session?.user.email);

  //     setAuthenticated(!!session);
  //     setIsLoading(false);
  //   };

  //   checkAuth();
  // }, []);

  const { session, isLoading } = userAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!session) {
    // console.log(session);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
