import { signIn, useSession } from "next-auth/client";

export const useAuth = () => {
  const [session, loading] = useSession();
  if (!loading && !session) signIn("discord");
  return !!session;
};
