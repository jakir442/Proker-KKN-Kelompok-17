import { User } from "@/models/user";
import { connectDB } from "@/lib/mongodb";

export async function findUserByUsername(username: string) {
    await connectDB();
    return User.findOne({
        username,
    });
}

export async function findUserById(id: string) {
    await connectDB();
    return User.findById(id);
}

export async function createUser(data: object) {
    await connectDB();
    return User.create(data);
}

export async function updateUser(id: string, data: object) {
    await connectDB();
    return User.findByIdAndUpdate(id, data, {
        new: true,
    });
}

export async function findUserForLogin(username: string) {
    await connectDB();
    return User.findOne({
        username,
        isActive: true,
    });
}
