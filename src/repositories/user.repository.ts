import { UserRole } from "@/constants/roles";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";

export async function findUserByUsername(username: string) {
    await connectDB();

    return User.findOne({ username });
}

export async function findUserById(id: string) {
    await connectDB();

    return User.findById(id);
}

export async function findUserByEmail(email: string) {
    await connectDB();

    return User.findOne({ email });
}

export async function findUserByEmailExceptId(email: string, id: string) {
    await connectDB();

    return User.findOne({
        email,
        _id: { $ne: id },
    });
}

export async function findUserByUsernameExceptId(username: string, id: string) {
    await connectDB();

    return User.findOne({
        username,
        _id: { $ne: id },
    });
}

export async function findUserForLogin(username: string) {
    await connectDB();

    return User.findOne({
        username,
        isActive: true,
    });
}

interface CreateUserRepositoryInput {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    avatar?: string;
    role: UserRole;
    isActive: boolean;
}

export async function createUser(data: CreateUserRepositoryInput) {
    await connectDB();

    return User.create(data);
}

interface UpdateUserRepositoryInput {
    fullName: string;
    username: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    address?: string;
    avatar?: string;
    role: UserRole;
    isActive: boolean;
}

export async function updateUser(id: string, data: UpdateUserRepositoryInput) {
    await connectDB();

    return User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

interface GetUsersParams {
    search?: string;
    role?: UserRole | "all";
    status?: "all" | "active" | "inactive";
    page?: number;
    limit?: number;
    allowedRoles?: UserRole[];
}

export async function getUsers({
    search = "",
    role = "all",
    status = "all",
    page = 1,
    limit = 10,
    allowedRoles,
}: GetUsersParams) {
    await connectDB();

    const filter: Record<string, unknown> = {};

    if (search.trim()) {
        filter.$or = [
            {
                fullName: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                username: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    // Permission filter
    if (allowedRoles?.length) {
        filter.role = {
            $in: allowedRoles,
        };
    }

    // Filter role dari UI
    if (allowedRoles?.length) {
        if (role === "all") {
            filter.role = {
                $in: allowedRoles,
            };
        } else if (allowedRoles.includes(role as UserRole)) {
            filter.role = role;
        } else {
            filter.role = {
                $in: [],
            };
        }
    }

    const skip = (page - 1) * limit;

    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    return {
        users: users.map((user) => ({
            id: user._id.toString(),
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            avatar: user.avatar,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

export async function countUsers() {
    await connectDB();

    return User.countDocuments();
}

export async function updateUserStatus(id: string, isActive: boolean) {
    await connectDB();

    return User.findByIdAndUpdate(
        id,
        { isActive },
        {
            new: true,
        },
    );
}

export async function resetUserPassword(id: string, password: string) {
    await connectDB();

    return User.findByIdAndUpdate(
        id,
        { password },
        {
            new: true,
        },
    );
}
