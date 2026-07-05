import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@/constants/roles";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            username: string;
            role: UserRole;
        };
    }

    interface User {
        id: string;
        username: string;
        role: UserRole;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        username: string;
        role: UserRole;
    }
}
