import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { getUserById } from "@/utils/helpers/user";
import { getTwoFactorConfirmationByUserId } from "@/utils/helpers/two-factor-confirmation";
import { getAccountByUserId } from "@/utils/helpers/account";
import { db } from "@repo/db";
import { UserRole, UserStatus } from "@repo/db/types";

export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            //Allow OAuth without emailnverification
            if (account?.provider !== "credentials") return true;

            if (!user?.id) {
                return false;
            }

            const existingUser = await getUserById(user?.id as string);

            // Prevent signin without email verified
            if (!existingUser || !existingUser.emailVerified || existingUser.status === UserStatus.BLOCK) {
                return false;
            }

            // check if two factor authentication is Enabled
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) {
                    return false;
                }

                // Delete two factor confirmation for next sign In
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id,
                    }
                })
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (token.isTwoFactorEnabled && session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.OAuth = token.OAuth as boolean;
                session.user.image = token.image as string;
                session.user.isBlocked = token.isBlocked as UserStatus;
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.OAuth = !!existingAccount;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.image = existingUser.image;
            token.status = existingUser.status;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});