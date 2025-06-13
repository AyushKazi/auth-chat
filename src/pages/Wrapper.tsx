import { supabase } from "@/helper/supabaseClient";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Simulate an authentication check
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
  } else {
    if (authenticated) {
      return <div>{children}</div>;
    }
    return <Navigate to="/login" />;
  }
}
