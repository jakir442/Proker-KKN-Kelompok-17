import { findUserByUsername } from "@/repositories/user.repository";
import { verifyPassword } from "@/lib/password";

export async function authenticateUser(username: string, password: string) {
    const user = await findUserByUsername(username);

    if (!user) {
        return null;
    }

    if (!user.isActive) {
        return null;
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
        return null;
    }

    return user;
}
