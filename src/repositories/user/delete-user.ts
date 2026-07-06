import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";

export async function deleteUser(id: string) {
    await connectDB();

    return User.findByIdAndDelete(id);
}
