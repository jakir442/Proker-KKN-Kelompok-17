import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function ProfilePage() {
    return (
        <ComingSoon
            title="Profil Akun"
            description="Modul Profil Akun sedang dikembangkan. Nantinya petugas dapat memperbarui informasi akun, password, dan data pribadi."
            backHref="/dashboard/petugas"
        />
    );
}
