"use client";

import { EmptyState } from "../common/EmptyState";
import type { UMKMColumn } from "./columns";
import { UMKMTable } from "./UMKMTable";
import { UMKMToolbar } from "./UMKMToolbar";

interface UMKMClientProps {
    umkms: UMKMColumn[];
    search: string;
    category: string;
    status: string;
}

export function UMKMClient({ umkms, search, category, status }: UMKMClientProps) {
    return (
        <div className="space-y-4">
            <UMKMToolbar search={search} category={category} status={status} />

            {umkms.length === 0 ? (
                <EmptyState
                    title="Belum ada UMKM"
                    description="Klik tombol 'Tambah UMKM' untuk menambahkan data pertama."
                />
            ) : (
                <UMKMTable data={umkms} />
            )}
        </div>
    );
}
