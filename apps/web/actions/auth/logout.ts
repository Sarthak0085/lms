import { signOut } from "next-auth/react"
import { redirect } from "next/navigation";

export const logOut = async () => {
    await signOut();
    redirect("/auth/login");
}