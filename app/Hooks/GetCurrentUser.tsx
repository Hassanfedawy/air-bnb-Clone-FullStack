// hooks/useCurrentUser.ts
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const { data: session } = useSession();

  if (!session) {
    return null; // or handle unauthenticated state
  }

  return session.user; // Return the user object
};
