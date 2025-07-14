import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { type User } from "@supabase/supabase-js";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      console.log("user test", user);
      if (user) setUser(user as any);
      else console.log("No user or error:", error);
    });
  }, []);

  return user;
}
