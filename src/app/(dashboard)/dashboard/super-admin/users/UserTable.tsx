import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";
import { UserActions } from "./UserActions";
import { UserListItem } from "@/types/user-list";

interface UserTableProps {
    users: UserListItem[];
    onEdit: (user: UserListItem) => void;
    onDelete: (user: UserListItem) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
    return (
        <div className="rounded-xl border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Dibuat</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.fullName}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <RoleBadge role={user.role} />
                            </TableCell>
                            <TableCell>
                                <StatusBadge isActive={user.isActive} />
                            </TableCell>
                            <TableCell>
                                {new Date(user.createdAt).toLocaleDateString("id-ID")}
                            </TableCell>

                            <TableCell className="text-right">
                                <UserActions
                                    user={user}
                                    onEdit={() => onEdit(user)}
                                    onDelete={() => onDelete(user)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
