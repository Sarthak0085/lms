import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();

    if (!session) {
        return null
    }

    return session?.data?.user;
}