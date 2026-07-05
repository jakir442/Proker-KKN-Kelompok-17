import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "@/validations/login.schema";
import { authenticateUser } from "@/services/auth.service";

export const authConfig = {
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },

            async authorize(credentials) {
                const validated = loginSchema.safeParse(credentials);

                if (!validated.success) {
                    return null;
                }

                const user = await authenticateUser(
                    validated.data.username,
                    validated.data.password,
                );

                if (!user) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.fullName,
                    username: user.username,
                    role: user.role,
                };
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.role = token.role;

            return session;
        },
    },
} satisfies NextAuthConfig;
