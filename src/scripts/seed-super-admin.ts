import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import { hashPassword } from "@/lib/password";
import { ROLES } from "@/constants/roles";

async function seedSuperAdmin() {
    await connectDB();

    const existingUser = await User.findOne({
        role: ROLES.SUPER_ADMIN,
    });

    if (existingUser) {
        console.log("Super Admin sudah tersedia.");
        return;
    }

    const password = await hashPassword("admin123");

    await User.create({
        fullName: "Super Administrator",
        username: "superadmin",
        email: "admin@cintanagara.id",
        password,
        role: ROLES.SUPER_ADMIN,
    });

    console.log("Super Admin berhasil dibuat.");
}

seedSuperAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
