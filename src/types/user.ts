import { Types } from "mongoose";
import { UserRole } from "@/constants/roles";

export interface IUser {
    _id: Types.ObjectId;
    fullName: string;
    username: string;
    email?: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    phoneNumber?: string;
    address?: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
